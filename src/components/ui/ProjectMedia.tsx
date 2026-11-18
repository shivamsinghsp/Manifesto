import Image from "next/image"
import type { ProjectImage } from "@/content/projects"
import { readPublicSvg } from "@/lib/svg"
import { cn } from "@/lib/utils"

/**
 * Project hero media. Raster screenshots use next/image; first-party SVG
 * illustrations are inlined so they follow the active theme.
 */
export function ProjectMedia({
  image,
  sizes,
  priority = false,
  className,
  parallax = false,
}: {
  image: ProjectImage
  sizes: string
  priority?: boolean
  className?: string
  parallax?: boolean
}) {
  if (image.src.endsWith(".svg")) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={cn("absolute inset-0 [&>svg]:h-full [&>svg]:w-full", className)}
        dangerouslySetInnerHTML={{
          __html: readPublicSvg(image.src).replace(
            "<svg ",
            '<svg preserveAspectRatio="xMidYMid slice" '
          ),
        }}
      />
    )
  }
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover object-top", className)}
      {...(parallax ? { "data-parallax-img": true } : {})}
    />
  )
}
