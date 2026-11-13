"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import NextLink from "next/link"
import { haversineDistance } from "@/lib/haversine"
import { cn } from "@/lib/utils"
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle,
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
  const [userX, setUserX] = useState(62)
  const [userY, setUserY] = useState(58)
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
  
  // 3-tier Geofence Validation Model:
  // 1. in_range: Safely within boundary
  // 2. near_edge: Within ~18% or 20m of boundary (caution zone for GPS jitter)
  // 3. outside: Completely past configured radius
  const isOutside = distance > radiusMeters
  const isNearEdge = !isOutside && (distance >= radiusMeters * 0.82 || (radiusMeters - distance) <= 20)
  const status: "in_range" | "near_edge" | "outside" = isOutside 
    ? "outside" 
    : isNearEdge 
      ? "near_edge" 
      : "in_range"

  const delta = distance - radiusMeters
  const marginInside = radiusMeters - distance

  // Dynamic Theme Colors
  const statusColor = status === "in_range" 
    ? "#00E5FF" 
    : status === "near_edge" 
      ? "#F59E0B" 
      : "#F43F5E"

  // SVG radius in units: 1 unit = 10 meters => svgRadius = radiusMeters / 10
  const svgRadius = radiusMeters / METERS_PER_UNIT

  // Convert pointer event directly to SVG coordinates (0 - 100)
  const updatePositionFromPointer = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return
    const svg = svgRef.current
    const rect = svg.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    
    // Calculate 0-100 coordinate based on SVG bounding box
    const xPct = ((clientX - rect.left) / rect.width) * 100
    const yPct = ((clientY - rect.top) / rect.height) * 100
    
    // Constrain smoothly to 6 - 94 to keep marker within viewbox
    const clampedX = Math.max(6, Math.min(94, Number(xPct.toFixed(1))))
    const clampedY = Math.max(6, Math.min(94, Number(yPct.toFixed(1))))
    
    setUserX(clampedX)
    setUserY(clampedY)
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsSimulatingWalk(false)
    setIsDragging(true)
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId)
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
      if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
        containerRef.current.releasePointerCapture(e.pointerId)
      }
    }
  }

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    setIsSimulatingWalk(false)
    const step = 2
    if (e.key === "ArrowUp") setUserY(prev => Math.max(6, prev - step))
    if (e.key === "ArrowDown") setUserY(prev => Math.min(94, prev + step))
    if (e.key === "ArrowLeft") setUserX(prev => Math.max(6, prev - step))
    if (e.key === "ArrowRight") setUserX(prev => Math.min(94, prev + step))
  }

  // Adaptive presets dynamically sized according to current radiusMeters
  const handlePresetByType = (type: "center" | "in_range" | "near_edge" | "outside") => {
    setIsSimulatingWalk(false)
    const baseRadiusUnits = radiusMeters / METERS_PER_UNIT
    
    if (type === "center") {
      setUserX(50)
      setUserY(50)
    } else if (type === "in_range") {
      // 50% of perimeter at 45 degree angle
      const r = baseRadiusUnits * 0.5
      const angle = Math.PI / 4 // 45°
      const x = Math.max(7, Math.min(93, 50 + r * Math.cos(angle)))
      const y = Math.max(7, Math.min(93, 50 + r * Math.sin(angle)))
      setUserX(Number(x.toFixed(1)))
      setUserY(Number(y.toFixed(1)))
    } else if (type === "near_edge") {
      // 92% of perimeter directly in the caution zone
      const r = baseRadiusUnits * 0.92
      const angle = 0.15
      const x = Math.max(7, Math.min(93, 50 + r * Math.cos(angle)))
      const y = Math.max(7, Math.min(93, 50 + r * Math.sin(angle)))
      setUserX(Number(x.toFixed(1)))
      setUserY(Number(y.toFixed(1)))
    } else if (type === "outside") {
      // 135% of perimeter (clearly outside, but within SVG radar bounds)
      const r = Math.min(42, Math.max(baseRadiusUnits + 5, baseRadiusUnits * 1.35))
      const angle = (3 * Math.PI) / 4 // 135°
      const x = Math.max(7, Math.min(93, 50 + r * Math.cos(angle)))
      const y = Math.max(7, Math.min(93, 50 + r * Math.sin(angle)))
      setUserX(Number(x.toFixed(1)))
      setUserY(Number(y.toFixed(1)))
    }
  }

  // Smooth 60fps auto-walk simulation loop adapting to configured radius
  useEffect(() => {
    if (!isSimulatingWalk) return
    
    let animationFrameId: number
    let lastTime = performance.now()
    
    const animate = (time: number) => {
      const deltaSec = (time - lastTime) / 1000
      lastTime = time
      
      // Advance angle smoothly
      walkAngleRef.current = (walkAngleRef.current + deltaSec * 0.5) % (2 * Math.PI)
      
      // Oscillate radius between 45% and 125% of current geofence radius
      const baseR = radiusMeters / METERS_PER_UNIT
      const multiplier = 0.85 + 0.45 * Math.sin(walkAngleRef.current * 1.5)
      const currentR = Math.max(7, Math.min(43, baseR * multiplier))
      
      const newX = 50 + currentR * Math.cos(walkAngleRef.current)
      const newY = 50 + currentR * Math.sin(walkAngleRef.current)
      
      setUserX(Number(newX.toFixed(1)))
      setUserY(Number(newY.toFixed(1)))
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isSimulatingWalk, radiusMeters])

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0E131F]/90 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300">
      {/* Header Bar */}
      <div className="p-5 md:p-7 border-b border-white/[0.08] bg-white/[0.02] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                status === "in_range" && "bg-cyan-400",
                status === "near_edge" && "bg-amber-400",
                status === "outside" && "bg-rose-400"
              )} />
              <span className={cn(
                "relative inline-flex rounded-full h-2.5 w-2.5",
                status === "in_range" && "bg-cyan-400",
                status === "near_edge" && "bg-amber-400",
                status === "outside" && "bg-rose-400"
              )} />
            </span>
            <span className={cn(
              "text-[11px] font-mono tracking-widest uppercase font-medium",
              status === "in_range" && "text-cyan-400",
              status === "near_edge" && "text-amber-400",
              status === "outside" && "text-rose-400"
            )}>
              {status === "in_range" && "PERIMETER SECURE"}
              {status === "near_edge" && "PERIMETER CAUTION (NEAR EDGE)"}
              {status === "outside" && "OUTSIDE PERIMETER"}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-medium text-white tracking-tight">
            Geofencing Validation Lab
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-0.5">
            Real-time Haversine perimeter engine modeled on the Shynr HRMS attendance perimeter algorithm.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSimulatingWalk(prev => !prev)}
            className={cn(
              "inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg border transition-all duration-200",
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
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white uppercase tracking-wider border border-cyan-500/30 px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 transition-all duration-200"
          >
            CASE STUDY ↗
          </NextLink>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Interactive Radar Box */}
        <div 
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="lg:col-span-7 p-4 sm:p-6 md:p-8 relative flex flex-col items-center justify-center min-h-[420px] border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#070A11] select-none overflow-hidden touch-none cursor-crosshair outline-none"
          style={{ outline: "none" }}
        >
          {/* Ambient Radar Glow */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-500 opacity-20"
            style={{
              background: status === "in_range"
                ? "radial-gradient(circle at 50% 50%, rgba(0, 184, 212, 0.25) 0%, transparent 65%)"
                : status === "near_edge"
                  ? "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.25) 0%, transparent 65%)"
                  : "radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.2) 0%, transparent 65%)"
            }}
          />

          {/* Radar Grid Texture */}
          <div className="absolute inset-0 bg-blueprint opacity-15 pointer-events-none" />

          {/* Instructions Banner */}
          <div className="absolute top-3 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md flex items-center gap-1.5">
              <Crosshair className="w-3 h-3 text-cyan-400" />
              <span>Click or drag to move marker</span>
            </span>
            <span className="text-[9px] font-mono text-slate-500 hidden sm:inline-block">
              Kanpur (26.4499°N, 80.3319°E)
            </span>
          </div>

          {/* SVG Map Canvas */}
          <svg 
            ref={svgRef}
            viewBox="0 0 100 100" 
            className="w-full max-w-[420px] aspect-square relative z-10 overflow-visible touch-none outline-none"
            style={{ outline: "none" }}
            role="application"
            aria-label="Interactive geofencing radar. Click and drag anywhere to move user marker."
          >
            <defs>
              {/* Geofence dynamic gradient */}
              <radialGradient id="geofenceGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={statusColor} stopOpacity={status === "in_range" ? "0.2" : status === "near_edge" ? "0.16" : "0.06"} />
                <stop offset="85%" stopColor={statusColor} stopOpacity={status === "in_range" ? "0.08" : status === "near_edge" ? "0.05" : "0.02"} />
                <stop offset="100%" stopColor={statusColor} stopOpacity="0" />
              </radialGradient>
              
              {/* Pulsing glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Radar Concentric Distance Rings (Static Reference) */}
            <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.25" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.25" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.25" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.25" strokeDasharray="1 2" />
            
            {/* Axis Crosshairs */}
            <line x1="50" y1="6" x2="50" y2="94" stroke="rgba(255,255,255,0.06)" strokeWidth="0.2" />
            <line x1="6" y1="50" x2="94" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="0.2" />

            {/* Range markers labels */}
            <text x="51" y="41" fontSize="1.6" fill="rgba(255,255,255,0.22)" fontFamily="var(--font-mono)">100m</text>
            <text x="51" y="31" fontSize="1.6" fill="rgba(255,255,255,0.22)" fontFamily="var(--font-mono)">200m</text>
            <text x="51" y="21" fontSize="1.6" fill="rgba(255,255,255,0.22)" fontFamily="var(--font-mono)">300m</text>
            <text x="51" y="11" fontSize="1.6" fill="rgba(255,255,255,0.22)" fontFamily="var(--font-mono)">400m</text>

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
              stroke={statusColor} 
              strokeWidth={status === "in_range" ? "0.5" : "0.6"}
              strokeDasharray={status === "in_range" ? "none" : status === "near_edge" ? "2.5 1.5" : "2 1.5"}
              filter="url(#glow)"
              className="transition-all duration-300 pointer-events-none"
            />

            {/* Connecting Vector Line */}
            <line 
              x1={COMPANY_X} 
              y1={COMPANY_Y} 
              x2={userX} 
              y2={userY} 
              stroke={statusColor} 
              strokeOpacity="0.4"
              strokeWidth="0.3" 
              strokeDasharray="1 1"
              className="pointer-events-none"
            />

            {/* Compact Distance Callout Tag on Vector Line */}
            <g transform={`translate(${(COMPANY_X + userX) / 2}, ${(COMPANY_Y + userY) / 2})`} className="pointer-events-none">
              <rect 
                x="-7" 
                y="-2.4" 
                width="14" 
                height="4.2" 
                rx="0.8" 
                fill="#070A11" 
                stroke={statusColor} 
                strokeOpacity="0.5"
                strokeWidth="0.25"
              />
              <text 
                y="0.5" 
                fontSize="1.9" 
                fill={statusColor} 
                textAnchor="middle" 
                fontFamily="var(--font-mono)"
                fontWeight="bold"
              >
                {distance}m
              </text>
            </g>

            {/* Company / HQ Marker */}
            <g transform={`translate(${COMPANY_X}, ${COMPANY_Y})`} className="pointer-events-none">
              <circle r="2.2" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.25" />
              <circle r="1.2" fill="#FFFFFF" />
              <circle r="0.4" fill="#070A11" />
              <text 
                y="5" 
                fontSize="1.8" 
                fill="#94A3B8" 
                textAnchor="middle" 
                fontFamily="var(--font-mono)"
                letterSpacing="0.04em"
              >
                OFFICE HQ
              </text>
            </g>

            {/* User Draggable Marker: Sleek, compact, with NO focus box */}
            <g 
              transform={`translate(${userX}, ${userY})`}
              className="cursor-grab active:cursor-grabbing select-none outline-none focus:outline-none focus-visible:outline-none"
              style={{ outline: "none", WebkitTapHighlightColor: "transparent" }}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="slider"
              aria-valuenow={distance}
              aria-valuemin={0}
              aria-valuemax={500}
              aria-label="User position marker"
            >
              {/* Invisible touch/grab area for effortless pointer interaction */}
              <circle r="6" fill="transparent" />

              {/* Subtle expanding sonar pulse */}
              <circle 
                r="1.2" 
                fill="none" 
                stroke={statusColor} 
                strokeWidth="0.25" 
                opacity="0.6"
              >
                <animate attributeName="r" values="1.2;3.6;1.2" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2.2s" repeatCount="indefinite" />
              </circle>

              {/* Compact accuracy ring */}
              <circle 
                r={isDragging ? 2.8 : 2.2} 
                fill={statusColor} 
                fillOpacity={isDragging ? 0.2 : 0.08} 
                stroke={statusColor} 
                strokeWidth="0.25" 
                strokeDasharray="1 1"
              />

              {/* Core beacon base */}
              <circle 
                r={isDragging ? 1.4 : 1.1} 
                fill="#070A11" 
                stroke={statusColor} 
                strokeWidth="0.6" 
                filter="url(#glow)"
              />
              
              {/* Center pip */}
              <circle 
                r={isDragging ? 0.7 : 0.55} 
                fill={statusColor} 
              />
              
              {/* Compact "YOU" Micro Badge */}
              <g transform="translate(0, -3.2)">
                <rect 
                  x="-4" 
                  y="-1.8" 
                  width="8" 
                  height="2.6" 
                  rx="0.6" 
                  fill={statusColor}
                />
                {/* Micro pointer tip */}
                <polygon 
                  points="-0.6,0.8 0.6,0.8 0,1.3" 
                  fill={statusColor} 
                />
                <text 
                  y="-0.1" 
                  fontSize="1.4" 
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
          <div 
            className="w-full mt-3 flex flex-wrap items-center justify-center gap-1.5 z-20"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mr-1">
              Presets:
            </span>
            <button
              type="button"
              onClick={() => handlePresetByType("center")}
              className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded border transition-all",
                distance < 10
                  ? "bg-white/20 border-white/40 text-white font-medium shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                  : "bg-white/[0.04] hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"
              )}
            >
              🏢 Center (0m)
            </button>
            <button
              type="button"
              onClick={() => handlePresetByType("in_range")}
              className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded border transition-all",
                status === "in_range" && distance >= 10
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-medium shadow-[0_0_8px_rgba(0,184,212,0.25)]"
                  : "bg-cyan-500/5 hover:bg-cyan-500/15 border-cyan-500/20 text-cyan-400/90"
              )}
            >
              🟢 In Range ({Math.round(radiusMeters * 0.5)}m)
            </button>
            <button
              type="button"
              onClick={() => handlePresetByType("near_edge")}
              className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded border transition-all",
                status === "near_edge"
                  ? "bg-amber-500/20 border-amber-400 text-amber-300 font-medium shadow-[0_0_8px_rgba(245,158,11,0.25)]"
                  : "bg-amber-500/5 hover:bg-amber-500/15 border-amber-500/20 text-amber-300/90"
              )}
            >
              🟡 Near Edge ({Math.round(radiusMeters * 0.92)}m)
            </button>
            <button
              type="button"
              onClick={() => handlePresetByType("outside")}
              className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded border transition-all",
                status === "outside"
                  ? "bg-rose-500/20 border-rose-400 text-rose-300 font-medium shadow-[0_0_8px_rgba(244,63,94,0.25)]"
                  : "bg-rose-500/5 hover:bg-rose-500/15 border-rose-500/20 text-rose-400/90"
              )}
            >
              🔴 Outside ({Math.min(420, Math.round(radiusMeters * 1.35))}m)
            </button>
          </div>
        </div>

        {/* Telemetry Dashboard & Controls */}
        <div className="lg:col-span-5 flex flex-col bg-[#0B0F19]">
          {/* Status Verdict Header */}
          <div className="p-5 md:p-6 border-b border-white/[0.08] bg-white/[0.02]">
            <span className="text-[10px] font-mono text-slate-400 block mb-2 tracking-widest uppercase">
              VALIDATION RESULT
            </span>

            <div className={cn(
              "p-3.5 rounded-xl border flex items-center gap-3 transition-all duration-300",
              status === "in_range" && "bg-cyan-500/10 border-cyan-500/30 text-cyan-300 shadow-[0_0_15px_rgba(0,184,212,0.12)]",
              status === "near_edge" && "bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
              status === "outside" && "bg-rose-500/10 border-rose-500/30 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.12)]"
            )}>
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                status === "in_range" && "bg-cyan-500/20 text-cyan-400",
                status === "near_edge" && "bg-amber-500/20 text-amber-400",
                status === "outside" && "bg-rose-500/20 text-rose-400"
              )}>
                {status === "in_range" && <ShieldCheck className="w-4 h-4" />}
                {status === "near_edge" && <AlertTriangle className="w-4 h-4" />}
                {status === "outside" && <ShieldAlert className="w-4 h-4" />}
              </div>
              
              <div>
                <div className="font-mono text-xs md:text-sm font-bold tracking-wide">
                  {status === "in_range" && "WITHIN GEOFENCE RANGE"}
                  {status === "near_edge" && "NEAR GEOFENCE EDGE (CAUTION)"}
                  {status === "outside" && "OUTSIDE GEOFENCE RANGE"}
                </div>
                <div className="text-[11px] opacity-80 mt-0.5">
                  {status === "in_range" && `Attendance authorized (Margin: ${marginInside}m inside)`}
                  {status === "near_edge" && `Near boundary (${marginInside}m inside). GPS drift risk.`}
                  {status === "outside" && `Check-in blocked (${delta}m past threshold)`}
                </div>
              </div>
            </div>
            
            {/* Telemetry Stats Grid */}
            <div className="grid grid-cols-2 gap-2.5 mt-3">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                <span className="text-[9px] font-mono text-slate-400 block mb-0.5">CALCULATED DISTANCE</span>
                <div className="font-display text-xl font-semibold text-white">
                  {distance}<span className="text-[11px] font-mono font-normal text-slate-400 ml-1">meters</span>
                </div>
              </div>
              
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                <span className="text-[9px] font-mono text-slate-400 block mb-0.5">THRESHOLD LIMIT</span>
                <div className="font-display text-xl font-semibold text-white">
                  {radiusMeters}<span className="text-[11px] font-mono font-normal text-slate-400 ml-1">meters</span>
                </div>
              </div>
            </div>

            {/* Perimeter Proximity Progress Bar */}
            <div className="mt-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5">
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>PERIMETER PROXIMITY</span>
                <span className={cn(
                  "font-semibold",
                  status === "in_range" && "text-cyan-400",
                  status === "near_edge" && "text-amber-400",
                  status === "outside" && "text-rose-400"
                )}>
                  {Math.round((distance / radiusMeters) * 100)}% of limit
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-150",
                    status === "in_range" && "bg-cyan-400",
                    status === "near_edge" && "bg-amber-400",
                    status === "outside" && "bg-rose-500"
                  )}
                  style={{ width: `${Math.min(100, (distance / radiusMeters) * 100)}%` }}
                />
              </div>
            </div>

            {/* Live GPS Readout */}
            <div className="mt-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 font-mono text-xs">
              <div className="flex justify-between text-slate-400 mb-1 text-[9px]">
                <span>SIMULATED GPS BEACON</span>
                <span className="text-cyan-400">±0.1m precision</span>
              </div>
              <div className="text-slate-200 text-[11px]">
                LAT: <span className="text-white font-semibold">{userCoords.lat.toFixed(5)}° N</span>
              </div>
              <div className="text-slate-200 text-[11px]">
                LON: <span className="text-white font-semibold">{userCoords.lon.toFixed(5)}° E</span>
              </div>
            </div>
          </div>

          {/* Controls & Configuration */}
          <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                  Configured Radius
                </span>
                <span className="text-xs font-mono text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded bg-cyan-500/10">
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
              
              <div className="flex justify-between mt-1.5 text-[9px] font-mono text-slate-500">
                <span>50m (Strict)</span>
                <span>200m</span>
                <span>400m (Campus)</span>
              </div>

              {/* Radius Quick Buttons */}
              <div className="grid grid-cols-4 gap-1.5 mt-2.5">
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
            <div className="mt-4 bg-white/[0.02] border border-white/[0.08] rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono font-medium mb-1.5 border-b border-white/[0.08] pb-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Production Security Context</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                In Shynr HRMS, coordinates are sent with client timestamp signatures to the backend API. The backend re-computes the great-circle Haversine distance against authorized corporate branch polygons, preventing fake GPS mock applications and device spoofing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
