import React from "react"
import NextLink from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ProjectCardProps {
  title: string
  description: string
  category: string
  href: string
  imageSrc?: string
  imageAlt?: string
  featured?: boolean
  className?: string
}

export function ProjectCard({
  title,
  description,
  category,
  href,
  imageSrc,
  imageAlt,
  featured = false,
  className,
}: ProjectCardProps) {
  if (featured) {
    return (
      <NextLink 
        href={href} 
        className={cn(
          "group block rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-xl hover:border-cyan-500/40 hover:shadow-[0_16px_40px_-8px_rgba(0,184,212,0.18)] transition-all duration-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-cyan-400",
          className
        )}
      >
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="col-span-full lg:col-span-7 order-2 lg:order-1">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-lg bg-surface-alt">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  fill
                  priority={featured}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 bg-surface-alt flex items-center justify-center">
                  <span className="font-mono text-xs tracking-widest text-slate-400 uppercase border border-white/10 px-4 py-2 rounded-lg bg-white/[0.03]">
                    [ LIVE ARCHITECTURE ]
                  </span>
                </div>
              )}
              {/* Subtle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17]/60 via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>
          </div>
          
          <div className="col-span-full lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-[2px] bg-cyan-400 rounded-full"></span>
                <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-medium">
                  {category}
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-display font-medium text-white mb-4 leading-tight group-hover:text-cyan-300 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed mb-8">
                {description}
              </p>
            </div>
            
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-cyan-400 uppercase tracking-widest group-hover:text-cyan-300 transition-colors">
              <span>EXPLORE CASE STUDY</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </article>
      </NextLink>
    )
  }

  return (
    <NextLink 
      href={href} 
      className={cn(
        "group flex flex-col h-full rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-xl p-5 sm:p-6 shadow-lg hover:border-cyan-500/40 hover:shadow-[0_12px_32px_-6px_rgba(0,184,212,0.15)] transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:outline-2 focus-visible:outline-cyan-400", 
        className
      )}
    >
      <article className="flex flex-col h-full">
        <div className="relative mb-5 w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-surface-alt">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-surface-alt flex items-center justify-center">
              <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase border border-white/10 px-3 py-1.5 rounded bg-white/[0.03]">
                [ SYSTEM SCHEMA ]
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17]/60 via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>
        
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-2 mb-2.5">
            <h3 className="text-xl font-display font-medium text-white group-hover:text-cyan-300 transition-colors duration-200">
              {title}
            </h3>
            <span className="text-[11px] font-mono tracking-wider text-slate-400 shrink-0 pt-0.5">
              {category.split(':')[0]}
            </span>
          </div>
          
          <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-grow leading-relaxed">
            {description}
          </p>
          
          <div className="pt-4 border-t border-white/[0.08] flex justify-between items-center mt-auto">
            <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
              View Architecture
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400" />
          </div>
        </div>
      </article>
    </NextLink>
  )
}
