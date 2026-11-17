import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/** tailwind-merge that knows our custom type scale (otherwise `text-body-small` is mistaken for a colour). */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "display-secondary",
            "headline",
            "subheading",
            "body-large",
            "body",
            "body-small",
            "label",
            "mono-label",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
