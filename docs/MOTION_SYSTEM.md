# MOTION SYSTEM SPECIFICATION

This document outlines the motion language and animation principles for the portfolio, ensuring a sophisticated, editorial, and technical feel.

## 1. Core Principles
- **Restraint**: Only 10-20% of visual elements participate in motion at a given time. The rest provide a stable, editorial anchor.
- **Subtlety**: Movements are small (e.g., 4px to 12px translations). No bouncing, no heavy spring physics, no rapid scaling.
- **Technical Atmosphere**: Animations should feel like precision instruments adjusting, not bouncy UI elements.

## 2. Motion Tokens (CSS)

### Durations
- `--duration-fast`: `150ms` (Snappy interactions, color changes)
- `--duration-standard`: `300ms` (Hover states, arrows, underline transitions)
- `--duration-slow`: `600ms` (Scroll reveals, layout shifts)
- `--duration-ambient`: `3000ms` (Idle states for hero diagram nodes)

### Easing Curves
- `--ease-standard`: `cubic-bezier(0.2, 0, 0.38, 0.9)` (Default transition)
- `--ease-out-expo`: `cubic-bezier(0.16, 1, 0.3, 1)` (Snappy entry, smooth finish)
- `--ease-linear`: `linear` (For continuous ambient motion)

## 3. Specific Behaviors

### Introductory Sequence
- **Sequence**: Background -> Grid Lines -> Nav -> Hero Typo (Line by Line) -> Paragraph -> Architecture Diagram.
- **Implementation**: Handled via CSS keyframes (`@keyframes fade-in-up`) with staggered `animation-delay` in `IntroSequence.tsx`.

### Scroll Reveals
- Handled via `IntersectionObserver`.
- Opacity shifts from `0` to `1`.
- Translation shifts by `12px` maximum (upwards).

### Hover Interactions
- **Links**: `ArrowUpRight` moves `translate-x-1` and `-translate-y-1`.
- **Project Images**: Grayscale transitions to full color. Subtly scales (`1.02` max). Depth shift via CSS perspective (if configured).

### Architecture Visualization (Hero)
- **Nodes**: Floating vertically `±2px` over a `3s` period.
- **Paths**: Occasional dash-offset animations representing data flow.

## 4. Accessibility
- All motion respects the `prefers-reduced-motion` media query.
- When `reduce` is active, all `animation-duration` and `transition-duration` values are clamped to `0.01ms`.
