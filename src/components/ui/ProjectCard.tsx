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
      <NextLink href={href} className={cn("group block focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-text", className)}>
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="col-span-full lg:col-span-8 order-2 lg:order-1 relative" style={{ perspective: "var(--perspective-standard)" }}>
            {/* Layered artifact depth */}
            <div className="absolute inset-0 bg-surface border border-border transition-all duration-300 ease-out-expo group-hover:translate-x-3 group-hover:translate-y-3 opacity-0 group-hover:opacity-100 z-0" />
            
            <div className="relative z-10 overflow-hidden bg-surface border border-border transition-all duration-300 ease-out-expo group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:border-text-secondary corner-marks">
              <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] animate-scan">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={imageAlt || title}
                    fill
                    className="object-cover filter grayscale opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface flex items-center justify-center border border-border-muted overflow-hidden">
                    <div className="w-full flex items-center justify-center p-6">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary/70 uppercase border border-border-muted px-4 py-2 bg-surface-alt group-hover:text-text-secondary transition-colors duration-300">
                        [ ASSET RESERVED ]
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-4 order-1 lg:order-2 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-text-tertiary hidden lg:block transition-colors duration-300 group-hover:bg-text-secondary"></span>
                <span className="text-mono-label text-text-secondary group-hover:text-text transition-colors duration-300">{category}</span>
              </div>
              <h3 className="text-headline mb-4 transition-colors duration-300 font-display italic group-hover:text-text-secondary">{title}</h3>
              <p className="text-body-large text-text-secondary mb-8 leading-relaxed">{description}</p>
            </div>
            <div className="inline-flex items-center gap-2 text-mono-label text-text transition-all duration-300 group-hover:text-text-secondary w-fit">
              VIEW CASE STUDY 
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </article>
      </NextLink>
    )
  }

  return (
    <NextLink href={href} className={cn("group block h-full focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-text", className)}>
      <article className="flex flex-col h-full">
        <div className="relative mb-6" style={{ perspective: "var(--perspective-standard)" }}>
          {/* Layered artifact depth */}
          <div className="absolute inset-0 bg-surface border border-border transition-all duration-300 ease-out-expo group-hover:translate-x-2 group-hover:translate-y-2 opacity-0 group-hover:opacity-100 z-0" />
          
          <div className="relative z-10 overflow-hidden bg-surface border border-border transition-all duration-300 ease-out-expo group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:border-text-secondary corner-marks">
            <div className="relative w-full aspect-[4/3] animate-scan">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  fill
                  className="object-cover filter grayscale opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                />
              ) : (
                <div className="absolute inset-0 bg-surface flex items-center justify-center border border-border-muted overflow-hidden">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary/70 uppercase group-hover:text-text-secondary transition-colors duration-300">
                    [ SCHEMA ]
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-subheading font-display group-hover:text-text-secondary transition-colors duration-300">{title}</h3>
            <span className="text-mono-label text-text-tertiary pt-1 group-hover:text-text transition-colors duration-300">{category.split(':')[0]}</span>
          </div>
          <p className="text-body-small text-text-secondary line-clamp-2 mb-6 flex-grow leading-relaxed">
            {description}
          </p>
          
          <div className="pt-4 border-t border-border-muted flex justify-between items-center mt-auto">
            <span className="text-mono-label text-text-tertiary transition-colors group-hover:text-text-secondary">Details</span>
            <ArrowRight className="w-4 h-4 text-text-tertiary transition-all duration-300 group-hover:translate-x-1 group-hover:text-text-secondary" />
          </div>
        </div>
      </article>
    </NextLink>
  )
}
