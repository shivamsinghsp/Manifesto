"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import NextLink from "next/link"
import { haversineDistance } from "@/lib/haversine"
import { cn } from "@/lib/utils"
import { 
  ShieldCheck, 
  ShieldAlert, 
  Crosshair, 
  Play, 
  Pause, 
  Info
} from "lucide-react"

export function GeofencingLab() {
  // Center is Kanpur coordinates, scaled to internal SVG system (0-100)
  const COMPANY_X = 50
  const COMPANY_Y = 50
  const OFFICE_LAT = 26.4499
  const OFFICE_LON = 80.3319
  const METERS_PER_UNIT = 10 // 1 SVG unit = 10 meters

  // Geodesic constant calculation for Kanpur's exact latitude
  // 1 degree latitude = (6371e3 * Math.PI) / 180 ≈ 111195m
  // 1 degree longitude = 111195 * cos(lat) ≈ 99552m
  const METERS_PER_DEG_LAT = (6371e3 * Math.PI) / 180
  const METERS_PER_DEG_LON = METERS_PER_DEG_LAT * Math.cos((OFFICE_LAT * Math.PI) / 180)

  const [radiusMeters, setRadiusMeters] = useState(100)
  const [userX, setUserX] = useState(65)
  const [userY, setUserY] = useState(65)
  const [isDragging, setIsDragging] = useState(false)
  const [isSimulatingWalk, setIsSimulatingWalk] = useState(false)
  
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const walkAngleRef = useRef(0)

  // Converts SVG units (0-100) to precise Kanpur coordinates
  const getSimulatedCoordinates = useCallback((x: number, y: number) => {
    const dxMeters = (x - COMPANY_X) * METERS_PER_UNIT
    const dyMeters = (COMPANY_Y - y) * METERS_PER_UNIT // Y is inverted in SVG (down = South)
    
    const lat = OFFICE_LAT + (dyMeters / METERS_PER_DEG_LAT)
    const lon = OFFICE_LON + (dxMeters / METERS_PER_DEG_LON)
    
    return { lat, lon }
  }, [METERS_PER_DEG_LAT, METERS_PER_DEG_LON])

  const companyCoords = getSimulatedCoordinates(COMPANY_X, COMPANY_Y)
  const userCoords = getSimulatedCoordinates(userX, userY)
  
  const distance = haversineDistance(companyCoords.lat, companyCoords.lon, userCoords.lat, userCoords.lon)
  const isWithin = distance <= radiusMeters
  const delta = distance - radiusMeters

  // SVG radius in units: 1 unit = 10 meters => svgRadius = radiusMeters / 10
  const svgRadius = radiusMeters / METERS_PER_UNIT

  // Convert pointer event directly to SVG coordinates (0 - 100)
  const updatePositionFromPointer = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return
    const svg = svgRef.current
    const rect = svg.getBoundingClientRect()
    
    // Calculate 0-100 coordinate based on SVG bounding box
    const xPct = ((clientX - rect.left) / rect.width) * 100
    const yPct = ((clientY - rect.top) / rect.height) * 100
    
    // Constrain smoothly to 5 - 95
    const clampedX = Math.max(5, Math.min(95, Number(xPct.toFixed(1))))
    const clampedY = Math.max(5, Math.min(95, Number(yPct.toFixed(1))))
    
    setUserX(clampedX)
    setUserY(clampedY)
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsSimulatingWalk(false)
    setIsDragging(true)
    if (svgRef.current) {
      svgRef.current.setPointerCapture(e.pointerId)
    }
    updatePositionFromPointer(e.clientX, e.clientY)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    updatePositionFromPointer(e.clientX, e.clientY)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false)
      if (svgRef.current && svgRef.current.hasPointerCapture(e.pointerId)) {
        svgRef.current.releasePointerCapture(e.pointerId)
      }
    }
  }

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    setIsSimulatingWalk(false)
    const step = 2
    if (e.key === "ArrowUp") setUserY(prev => Math.max(5, prev - step))
    if (e.key === "ArrowDown") setUserY(prev => Math.min(95, prev + step))
    if (e.key === "ArrowLeft") setUserX(prev => Math.max(5, prev - step))
    if (e.key === "ArrowRight") setUserX(prev => Math.min(95, prev + step))
  }

  // Quick preset scenario jumps
  const handlePreset = (x: number, y: number) => {
    setIsSimulatingWalk(false)
    setUserX(x)
    setUserY(y)
  }

  // Walking simulation loop
  useEffect(() => {
    if (!isSimulatingWalk) return
    
    const interval = setInterval(() => {
      walkAngleRef.current = (walkAngleRef.current + 0.03) % (2 * Math.PI)
      // Oscillate radius between 40m (4 units) and 180m (18 units)
      const rUnits = 10 + 7 * Math.sin(walkAngleRef.current * 1.5)
      const newX = 50 + rUnits * Math.cos(walkAngleRef.current)
      const newY = 50 + rUnits * Math.sin(walkAngleRef.current)
      setUserX(Number(Math.max(6, Math.min(94, newX)).toFixed(1)))
      setUserY(Number(Math.max(6, Math.min(94, newY)).toFixed(1)))
    }, 40)

    return () => clearInterval(interval)
  }, [isSimulatingWalk])

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0E131F]/90 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300">
      {/* Header Bar */}
      <div className="p-6 md:p-8 border-b border-white/[0.08] bg-white/[0.02] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                isWithin ? "bg-emerald-400" : "bg-rose-400"
              )} />
              <span className={cn(
                "relative inline-flex rounded-full h-2.5 w-2.5",
                isWithin ? "bg-emerald-500" : "bg-rose-500"
              )} />
            </span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 font-medium">
              LIVE GEOSPATIAL TELEMETRY
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
            Geofencing Validation Lab
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Real-time Haversine distance engine modeled on the Shynr HRMS attendance perimeter algorithm.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSimulatingWalk(prev => !prev)}
            className={cn(
              "inline-flex items-center gap-2 text-xs font-mono px-3.5 py-2 rounded-lg border transition-all duration-200",
              isSimulatingWalk
                ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,184,212,0.3)]"
                : "bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08]"
            )}
          >
            {isSimulatingWalk ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isSimulatingWalk ? "PAUSE AUTO-WALK" : "AUTO-WALK DEMO"}
          </button>
          
          <NextLink 
            href="/work/shynr"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white uppercase tracking-wider border border-cyan-500/30 px-3.5 py-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-200"
          >
            CASE STUDY ↗
          </NextLink>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Interactive Radar Box */}
        <div 
          ref={containerRef}
          className="lg:col-span-8 p-6 sm:p-8 md:p-10 relative flex flex-col items-center justify-center min-h-[460px] border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#070A11] select-none overflow-hidden"
        >
          {/* Ambient Radar Glow */}
          <div 
            className={cn(
              "absolute inset-0 pointer-events-none transition-opacity duration-500",
              isWithin ? "opacity-30" : "opacity-15"
            )}
            style={{
              background: isWithin
                ? "radial-gradient(circle at 50% 50%, rgba(0, 184, 212, 0.22) 0%, transparent 65%)"
                : "radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.15) 0%, transparent 65%)"
            }}
          />

          {/* Radar Grid Texture */}
          <div className="absolute inset-0 bg-blueprint opacity-15 pointer-events-none" />

          {/* Instructions Banner */}
          <div className="absolute top-4 left-6 right-6 z-20 flex justify-between items-center pointer-events-none">
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md flex items-center gap-1.5">
              <Crosshair className="w-3 h-3 text-cyan-400" />
              <span>Click or drag <strong>ANYWHERE</strong> in this radar box to move</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline-block">
              HQ: Kanpur (26.4499°N, 80.3319°E)
            </span>
          </div>

          {/* SVG Map Canvas */}
          <svg 
            ref={svgRef}
            viewBox="0 0 100 100" 
            className="w-full max-w-[480px] aspect-square relative z-10 overflow-visible cursor-crosshair touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="application"
            aria-label="Interactive geofencing radar. Click and drag anywhere to move user marker."
          >
            <defs>
              {/* Geofence gradient */}
              <radialGradient id="geofenceGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00B8D4" stopOpacity={isWithin ? "0.22" : "0.06"} />
                <stop offset="85%" stopColor="#00B8D4" stopOpacity={isWithin ? "0.08" : "0.02"} />
                <stop offset="100%" stopColor="#00B8D4" stopOpacity="0" />
              </radialGradient>
              
              {/* User pulsing glow */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Radar Concentric Distance Rings (Static Reference) */}
            <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" strokeDasharray="1 2" />
            
            {/* Axis Crosshairs */}
            <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.07)" strokeWidth="0.2" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.07)" strokeWidth="0.2" />

            {/* Range markers labels */}
            <text x="51" y="41" fontSize="1.8" fill="rgba(255,255,255,0.25)" fontFamily="var(--font-mono)">100m</text>
            <text x="51" y="31" fontSize="1.8" fill="rgba(255,255,255,0.25)" fontFamily="var(--font-mono)">200m</text>
            <text x="51" y="21" fontSize="1.8" fill="rgba(255,255,255,0.25)" fontFamily="var(--font-mono)">300m</text>
            <text x="51" y="11" fontSize="1.8" fill="rgba(255,255,255,0.25)" fontFamily="var(--font-mono)">400m</text>

            {/* Geofence Perimeter Area */}
            <circle 
              cx={COMPANY_X} 
              cy={COMPANY_Y} 
              r={svgRadius} 
              fill="url(#geofenceGlow)"
              className="transition-all duration-300 pointer-events-none"
            />
            
            {/* Geofence Boundary Line */}
            <circle 
              cx={COMPANY_X} 
              cy={COMPANY_Y} 
              r={svgRadius} 
              fill="none" 
              stroke={isWithin ? "#00E5FF" : "rgba(244, 63, 94, 0.7)"} 
              strokeWidth={isWithin ? "0.6" : "0.5"}
              strokeDasharray={isWithin ? "none" : "2.5 1.5"}
              filter={isWithin ? "url(#glow)" : undefined}
              className="transition-all duration-300 pointer-events-none"
            />

            {/* Connecting Vector Line */}
            <line 
              x1={COMPANY_X} 
              y1={COMPANY_Y} 
              x2={userX} 
              y2={userY} 
              stroke={isWithin ? "rgba(0, 229, 255, 0.4)" : "rgba(244, 63, 94, 0.4)"} 
              strokeWidth="0.4" 
              strokeDasharray="1 1"
              className="pointer-events-none"
            />

            {/* Distance Callout Tag on Vector Line */}
            <g transform={`translate(${(COMPANY_X + userX) / 2}, ${(COMPANY_Y + userY) / 2})`} className="pointer-events-none">
              <rect 
                x="-8" 
                y="-3" 
                width="16" 
                height="5" 
                rx="1" 
                fill="#070A11" 
                stroke={isWithin ? "rgba(0,229,255,0.4)" : "rgba(244,63,94,0.4)"} 
                strokeWidth="0.25"
              />
              <text 
                y="0.6" 
                fontSize="2.4" 
                fill={isWithin ? "#00E5FF" : "#F43F5E"} 
                textAnchor="middle" 
                fontFamily="var(--font-mono)"
                fontWeight="bold"
              >
                {distance}m
              </text>
            </g>

            {/* Company / HQ Marker */}
            <g transform={`translate(${COMPANY_X}, ${COMPANY_Y})`} className="pointer-events-none">
              <circle r="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3" />
              <circle r="1.6" fill="#FFFFFF" />
              <circle r="0.6" fill="#070A11" />
              <text 
                y="6" 
                fontSize="2.4" 
                fill="#CBD5E1" 
                textAnchor="middle" 
                fontFamily="var(--font-mono)"
                letterSpacing="0.05em"
              >
                OFFICE HQ
              </text>
            </g>

            {/* User Draggable Marker */}
            <g 
              transform={`translate(${userX}, ${userY})`}
              className={cn(
                "cursor-grab active:cursor-grabbing transition-transform duration-75",
                isDragging ? "scale-125" : "scale-100"
              )}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="slider"
              aria-valuenow={distance}
              aria-valuemin={0}
              aria-valuemax={500}
              aria-label="User position marker"
            >
              {/* Invisible large touch target (12 units = 120m hit area) */}
              <circle r="6" fill="transparent" />

              {/* Pulsing ring */}
              <circle 
                r="3.5" 
                fill="none" 
                stroke={isWithin ? "#00E5FF" : "#F43F5E"} 
                strokeWidth="0.4"
                opacity={isDragging ? 0.9 : 0.6}
                className="animate-pulse"
              />
              
              {/* Outer core circle */}
              <circle 
                r="2" 
                fill="#070A11" 
                stroke={isWithin ? "#00E5FF" : "#F43F5E"} 
                strokeWidth="0.8" 
                filter="url(#glow)"
              />
              
              {/* Center pip */}
              <circle 
                r="0.9" 
                fill={isWithin ? "#00E5FF" : "#F43F5E"} 
              />
              
              {/* "YOU" Label & Status Tag */}
              <g transform="translate(0, -4.5)">
                <rect 
                  x="-7" 
                  y="-3" 
                  width="14" 
                  height="4" 
                  rx="1" 
                  fill={isWithin ? "#00E5FF" : "#F43F5E"}
                />
                <text 
                  y="-0.4" 
                  fontSize="2.3" 
                  fill="#070A11" 
                  textAnchor="middle" 
                  fontFamily="var(--font-mono)"
                  fontWeight="bold"
                >
                  YOU
                </text>
              </g>
            </g>
          </svg>

          {/* Quick Scenario Jump Presets */}
          <div className="w-full mt-6 flex flex-wrap items-center justify-center gap-2 z-20">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mr-1">
              Test Scenarios:
            </span>
            <button
              onClick={() => handlePreset(50, 50)}
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
            >
              🏢 Center (0m)
            </button>
            <button
              onClick={() => handlePreset(54, 53)}
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-colors"
            >
              🟢 In Range (50m)
            </button>
            <button
              onClick={() => handlePreset(59, 50)}
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition-colors"
            >
              🟡 Near Edge (90m)
            </button>
            <button
              onClick={() => handlePreset(68, 65)}
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 transition-colors"
            >
              🔴 Outside (230m)
            </button>
          </div>
        </div>

        {/* Telemetry Dashboard & Controls */}
        <div className="lg:col-span-4 flex flex-col bg-[#0B0F19]">
          {/* Status Verdict Header */}
          <div className="p-6 md:p-8 border-b border-white/[0.08] bg-white/[0.02]">
            <span className="text-[10px] font-mono text-slate-400 block mb-2 tracking-widest uppercase">
              VALIDATION RESULT
            </span>

            <div className={cn(
              "p-4 rounded-xl border flex items-center gap-3.5 transition-all duration-300",
              isWithin 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]" 
                : "bg-rose-500/10 border-rose-500/30 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
            )}>
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                isWithin ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
              )}>
                {isWithin ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
              </div>
              
              <div>
                <div className="font-mono text-sm font-bold tracking-wide">
                  {isWithin ? "WITHIN GEOFENCE RANGE" : "OUTSIDE GEOFENCE RANGE"}
                </div>
                <div className="text-xs opacity-80 mt-0.5">
                  {isWithin 
                    ? `Attendance authorized (Margin: ${Math.abs(delta)}m inside)` 
                    : `Check-in blocked (${delta}m past threshold)`}
                </div>
              </div>
            </div>
            
            {/* Telemetry Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">CALCULATED DISTANCE</span>
                <div className="font-display text-2xl font-semibold text-white">
                  {distance}<span className="text-xs font-mono font-normal text-slate-400 ml-1">meters</span>
                </div>
              </div>
              
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">THRESHOLD LIMIT</span>
                <div className="font-display text-2xl font-semibold text-white">
                  {radiusMeters}<span className="text-xs font-mono font-normal text-slate-400 ml-1">meters</span>
                </div>
              </div>
            </div>

            {/* Live GPS Readout */}
            <div className="mt-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 font-mono text-xs">
              <div className="flex justify-between text-slate-400 mb-1 text-[10px]">
                <span>SIMULATED GPS BEACON</span>
                <span className="text-cyan-400">±0.1m precision</span>
              </div>
              <div className="text-slate-200">
                LAT: <span className="text-white font-semibold">{userCoords.lat.toFixed(5)}° N</span>
              </div>
              <div className="text-slate-200">
                LON: <span className="text-white font-semibold">{userCoords.lon.toFixed(5)}° E</span>
              </div>
            </div>
          </div>

          {/* Controls & Configuration */}
          <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                  Configured Radius
                </span>
                <span className="text-xs font-mono text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded bg-cyan-500/10">
                  {radiusMeters} meters
                </span>
              </div>
              
              <input 
                type="range" 
                min="50" 
                max="400" 
                step="10"
                value={radiusMeters} 
                onChange={(e) => setRadiusMeters(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                aria-label="Adjust geofence radius"
              />
              
              <div className="flex justify-between mt-2 text-[10px] font-mono text-slate-500">
                <span>50m (Strict)</span>
                <span>200m</span>
                <span>400m (Campus)</span>
              </div>

              {/* Radius Quick Buttons */}
              <div className="grid grid-cols-4 gap-1.5 mt-3">
                {[75, 100, 150, 250].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setRadiusMeters(preset)}
                    className={cn(
                      "text-[10px] font-mono py-1 rounded border transition-colors",
                      radiusMeters === preset
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                        : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white"
                    )}
                  >
                    {preset}m
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Context Card */}
            <div className="mt-6 bg-white/[0.02] border border-white/[0.08] rounded-xl p-4">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-medium mb-2 border-b border-white/[0.08] pb-2">
                <Info className="w-3.5 h-3.5" />
                <span>Production Security Context</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                In Shynr HRMS, mobile coordinates are sent with client timestamp signatures to the backend API. The backend re-computes the great-circle Haversine distance against authorized corporate branch polygons, preventing fake GPS mock applications and device spoofing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
