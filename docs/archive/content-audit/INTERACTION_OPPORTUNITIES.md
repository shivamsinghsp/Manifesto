# INTERACTION & 3D OPPORTUNITIES

The current portfolio design heavily utilizes static layouts with CSS `perspective` hover effects (layering borders and background surfaces). While effective, introducing subtle, highly-intentional interaction could elevate the "premium technical" feel without resorting to generic SaaS animations or heavy Three.js libraries.

## 1. Hero Architecture Visualization
- **Location**: `src/components/ui/HeroSystem.tsx`
- **Current Implementation**: A 2D CSS grid with a scanning laser line and floating code blocks.
- **Proposed Interaction**: Convert the grid to an isometric 2.5D Canvas/WebGL representation using lightweight points (nodes). As the user moves their mouse, the perspective shifts slightly (parallax) and lines connect between the nodes dynamically.
- **Why it improves UX**: It immediately signals "systems engineering" and "complexity" to the visitor in a highly memorable, tactile way.
- **Complexity**: Moderate (Requires standard HTML5 Canvas, no heavy 3D engine needed).
- **Performance/Mobile**: Excellent. Can be disabled or simplified to the current static CSS version on mobile or when `prefers-reduced-motion` is active.

## 2. Case Study "Architecture Node"
- **Location**: `src/app/work/[slug]/page.tsx` (Diagram sections)
- **Current Implementation**: A static radial dot-matrix CSS background with a pulsing square.
- **Proposed Interaction**: A lightweight, interactive node graph using Canvas where nodes represent frontend/backend/database entities for that specific project. Hovering a node highlights its connections.
- **Why it improves UX**: It turns a static diagram into an exploratory technical feature, reinforcing the engineering narrative.
- **Complexity**: High (Requires a custom Canvas node-graph renderer).
- **Performance/Mobile**: Requires careful unmounting on mobile.

## 3. Project Card Reveal
- **Location**: `src/components/ui/ProjectCard.tsx`
- **Current Implementation**: X/Y translation of borders on hover using CSS `transform`.
- **Proposed Interaction**: Add a very subtle 3D rotational tilt (mouse-tracking `rotateX` and `rotateY`) using a custom React hook.
- **Why it improves UX**: Creates a physical, tactile "card" feel that makes the interface feel highly premium.
- **Complexity**: Low (Pure CSS transforms powered by React state).
- **Performance/Mobile**: Native CSS transforms are GPU accelerated. Completely disabled on mobile (touch devices don't have hover).

*Note: None of these have been implemented yet in order to keep the current build lean and focused on content structure. They are candidates for the final polish phase.*
