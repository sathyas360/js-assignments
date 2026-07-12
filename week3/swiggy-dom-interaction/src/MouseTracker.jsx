import { useRef } from 'react'

const CIRCLE_SIZE = 24 // px — kept in one place so JS math and CSS agree

/**
 * MouseTracker
 * ------------
 * Tracks the cursor ONLY while it is inside the bounded container and moves a
 * small circle to follow it.
 *
 * Performance goal: NO React re-render on mouse move.
 *   - Coordinates live in `coordsRef` (a mutable box, not state) so writing to
 *     them never schedules a render.
 *   - The circle is moved by mutating the DOM node directly via `circleRef`
 *     (`style.transform`), so React's render/reconcile cycle never runs during
 *     movement. This component renders exactly once.
 */
export default function MouseTracker() {
  const containerRef = useRef(null) // the bounded box
  const circleRef = useRef(null)    // the DOM node we move imperatively
  const coordsRef = useRef({ x: 0, y: 0 }) // last known position, container-relative
  const trackingRef = useRef(false) // whether the cursor is currently inside

  // Fired continuously while the cursor is inside the container.
  // This runs hundreds of times per second — and triggers ZERO re-renders.
  const handleMouseMove = (e) => {
    const container = containerRef.current
    const circle = circleRef.current
    if (!container || !circle) return

    // Position relative to the container, not the viewport.
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Store in a ref (no render) so the value is available elsewhere if needed.
    coordsRef.current = { x, y }

    // Move the circle by mutating the DOM directly. `transform` is
    // GPU-composited and skips layout, so this stays smooth.
    // We offset by half the size so the circle is centered on the cursor.
    circle.style.transform =
      `translate(${x - CIRCLE_SIZE / 2}px, ${y - CIRCLE_SIZE / 2}px)`
  }

  // Cursor entered the box: show the circle and resume tracking.
  const handleMouseEnter = () => {
    trackingRef.current = true
    if (circleRef.current) circleRef.current.style.opacity = '1'
  }

  // Cursor left the box: stop tracking. Because we never re-render, the circle
  // simply keeps its last transform and freezes. We also fade it out.
  const handleMouseLeave = () => {
    trackingRef.current = false
    if (circleRef.current) circleRef.current.style.opacity = '0'
  }

  return (
    <div className="page">
      <h1>Mouse Tracker</h1>
      <p className="hint">
        Move your cursor inside the box. The circle follows it — with{' '}
        <strong>zero React re-renders</strong> per move. Leave the box and it
        freezes.
      </p>

      <div
        ref={containerRef}
        className="container"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={circleRef} className="circle" aria-hidden="true" />
        <span className="container-label">bounded container</span>
      </div>
    </div>
  )
}
