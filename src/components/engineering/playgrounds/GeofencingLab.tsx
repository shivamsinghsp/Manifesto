"use client"

import React, { useState, useRef } from "react"
import NextLink from "next/link"
import { haversineDistance } from "@/lib/haversine"
import { cn } from "@/lib/utils"

export function GeofencingLab() {
  // Center is roughly Kanpur coordinates, scaled to an internal coordinate system
  const COMPANY_X = 50
  const COMPANY_Y = 50

  const [radiusMeters, setRadiusMeters] = useState(100)
  const [userX, setUserX] = useState(65)
  const [userY, setUserY] = useState(65)
  const [isDragging, setIsDragging] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  // Mapping SVG 0-100 coordinates to rough geographic coordinates for the formula
  // We'll treat 1 unit in SVG roughly as 10 meters for calculation purposes
  const getSimulatedCoordinates = (x: number, y: number) => {
    const latBase = 26.4499 // Kanpur lat
    const lonBase = 80.3319 // Kanpur lon
    
    // Roughly 111,111 meters per degree latitude
    // So 1 meter is approx 0.000009 degrees
    const metersPerUnit = 10
    const latOffset = ((y - COMPANY_Y) * metersPerUnit) * 0.000009
    const lonOffset = ((x - COMPANY_X) * metersPerUnit) * 0.000009
    
    return { lat: latBase + latOffset, lon: lonBase + lonOffset }
  }

  const companyCoords = getSimulatedCoordinates(COMPANY_X, COMPANY_Y)
  const userCoords = getSimulatedCoordinates(userX, userY)
  
  const distance = haversineDistance(companyCoords.lat, companyCoords.lon, userCoords.lat, userCoords.lon)
  const isWithin = distance <= radiusMeters

  // Convert radius in meters to SVG radius (since 1 unit = 10 meters)
  const svgRadius = radiusMeters / 10

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !svgRef.current) return
    
    const svg = svgRef.current
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse())
    
    // Constrain to SVG bounds
    const newX = Math.max(5, Math.min(95, svgP.x))
    const newY = Math.max(5, Math.min(95, svgP.y))
    
    setUserX(newX)
    setUserY(newY)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false)
    ;(e.target as Element).releasePointerCapture(e.pointerId)
  }

  // Keyboard accessibility for user position
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 2
    if (e.key === "ArrowUp") setUserY(prev => Math.max(5, prev - step))
    if (e.key === "ArrowDown") setUserY(prev => Math.min(95, prev + step))
    if (e.key === "ArrowLeft") setUserX(prev => Math.max(5, prev - step))
    if (e.key === "ArrowRight") setUserX(prev => Math.min(95, prev + step))
  }

  return (
    <div className="w-full border border-border bg-surface relative corner-marks">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-alt">
        <div>
          <h3 className="text-display-secondary text-text mb-2">Geofencing Lab</h3>
          <p className="text-body-small text-text-secondary">
            Interactive model based on Shynr&apos;s attendance validation system.
          </p>
        </div>
        <NextLink 
          href="/work/shynr"
          className="inline-flex items-center gap-2 text-[10px] font-mono text-accent hover:text-white uppercase tracking-widest border border-accent/20 px-4 py-2 hover:bg-accent/10 transition-colors"
        >
          VIEW SHYNR CASE STUDY ↗
        </NextLink>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Interactive Visualization */}
        <div className="lg:col-span-8 p-6 md:p-12 relative flex items-center justify-center min-h-[400px] border-b lg:border-b-0 lg:border-r border-border bg-bg overflow-hidden">
          <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />
          
          <svg 
            ref={svgRef}
            viewBox="0 0 100 100" 
            className="w-full max-w-[500px] aspect-square relative z-10 overflow-visible"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            role="application"
            aria-label="Interactive geofencing map. Use arrow keys to move the user marker."
          >
            {/* Radius Circle */}
            <circle 
              cx={COMPANY_X} 
              cy={COMPANY_Y} 
              r={svgRadius} 
              fill={isWithin ? "rgba(0, 184, 212, 0.05)" : "transparent"} 
              stroke={isWithin ? "var(--color-accent)" : "var(--color-border)"} 
              strokeWidth="0.5"
              strokeDasharray={isWithin ? "none" : "2 2"}
              className="transition-all duration-300"
            />
            
            {/* Connecting Line */}
            <line 
              x1={COMPANY_X} 
              y1={COMPANY_Y} 
              x2={userX} 
              y2={userY} 
              stroke="var(--color-text-tertiary)" 
              strokeWidth="0.2" 
              strokeDasharray="1 1"
            />

            {/* Company Marker */}
            <g transform={`translate(${COMPANY_X}, ${COMPANY_Y})`}>
              <circle r="1.5" fill="var(--color-text)" />
              <circle r="3" fill="none" stroke="var(--color-text)" strokeWidth="0.2" opacity="0.5" />
              <text y="5" fontSize="3" fill="var(--color-text-secondary)" textAnchor="middle" fontFamily="var(--font-mono)">OFFICE</text>
            </g>

            {/* User Marker (Draggable) */}
            <g 
              transform={`translate(${userX}, ${userY})`}
              className={cn("cursor-grab active:cursor-grabbing", isDragging ? "scale-110" : "scale-100")}
              onPointerDown={handlePointerDown}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              style={{ transition: isDragging ? 'none' : 'transform 0.1s' }}
            >
              <circle r="2" fill="var(--color-bg)" stroke={isWithin ? "var(--color-accent)" : "var(--color-text)"} strokeWidth="0.8" />
              <circle r="0.8" fill={isWithin ? "var(--color-accent)" : "var(--color-text)"} />
              <text y="-4" fontSize="3" fill={isWithin ? "var(--color-accent)" : "var(--color-text)"} textAnchor="middle" fontFamily="var(--font-mono)">YOU</text>
            </g>
          </svg>
        </div>

        {/* Controls and Output */}
        <div className="lg:col-span-4 flex flex-col">
          {/* Output Dashboard */}
          <div className="p-6 md:p-8 border-b border-border bg-surface-alt">
            <div className="mb-6">
              <span className="text-[10px] font-mono text-text-tertiary block mb-1">STATUS</span>
              <div className={cn(
                "text-lg font-mono px-3 py-2 border inline-block tracking-wider",
                isWithin 
                  ? "border-accent text-accent bg-accent/10" 
                  : "border-border text-text-secondary"
              )}>
                {isWithin ? "WITHIN GEOFENCE" : "OUTSIDE GEOFENCE"}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-mono text-text-tertiary block mb-1">DISTANCE</span>
                <span className="text-display-secondary text-text text-3xl">{distance}<span className="text-lg text-text-secondary">m</span></span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-text-tertiary block mb-1">RADIUS LIMIT</span>
                <span className="text-display-secondary text-text text-3xl">{radiusMeters}<span className="text-lg text-text-secondary">m</span></span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 md:p-8 flex-grow">
            <label className="flex flex-col mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Configured Radius</span>
                <span className="text-[10px] font-mono text-accent border border-accent/20 px-2 py-1 bg-accent/5">{radiusMeters}m</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="500" 
                step="10"
                value={radiusMeters} 
                onChange={(e) => setRadiusMeters(Number(e.target.value))}
                className="w-full h-1 bg-border rounded-none appearance-none cursor-pointer accent-accent"
                aria-label="Adjust geofence radius"
              />
              <div className="flex justify-between mt-2 text-[9px] font-mono text-text-tertiary">
                <span>50m</span>
                <span>500m</span>
              </div>
            </label>

            <div className="bg-surface-alt border border-border p-4">
              <h4 className="text-[10px] font-mono text-text-tertiary uppercase tracking-widest mb-2 border-b border-border pb-2">Technical Implementation</h4>
              <p className="text-body-small text-text-secondary leading-relaxed">
                This model calculates the great-circle distance between two points on a sphere using the Haversine formula (Earth radius R = 6371e3m). In production, Shynr uses <code className="text-accent text-[11px] bg-bg px-1 border border-border">navigator.geolocation</code> and validates the coordinates on the backend before creating an attendance record.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
