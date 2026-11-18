import Image from "next/image"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"

/**
 * Portrait slot. Until `site.photo` is set (TODO for the owner), renders a monogram
 * blueprint frame so the layout is complete and nothing looks broken.
 */
export function ProfilePhoto({
  className,
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <figure
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface",
        className
      )}
    >
      {site.photo ? (
        <Image
          src={site.photo}
          alt={`Portrait of ${site.name}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 90vw, 400px"
          className="object-cover"
        />
      ) : (
        <div
          className="bg-blueprint absolute inset-0 flex items-center justify-center"
          role="img"
          aria-label={`${site.name} monogram`}
        >
          <div className="absolute inset-6 rounded-xl border border-dashed border-border" />
          <span className="font-display text-[clamp(4rem,12vw,7rem)] italic text-text-secondary/80">
            SS
          </span>
          <span className="absolute bottom-4 left-4 font-mono text-[11px] tracking-widest text-text-tertiary">
            FIG. 01 — ENGINEER
          </span>
        </div>
      )}
    </figure>
  )
}
