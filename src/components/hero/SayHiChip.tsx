"use client"

/** Makes the hidden intro poster discoverable from the hero. */
export function SayHiChip({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-intro-poster"))}
      className={className}
    >
      <span aria-hidden="true">👋</span> say hi
    </button>
  )
}
