import { useEffect } from 'react'

// Pixel-art X: 7×7 grid, each cell = 3px, drawn as filled squares
function PixelX() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" aria-hidden="true">
      {/* Row 0 */}
      <rect x="0"  y="0"  width="3" height="3" fill="currentColor" />
      <rect x="18" y="0"  width="3" height="3" fill="currentColor" />
      {/* Row 1 */}
      <rect x="3"  y="3"  width="3" height="3" fill="currentColor" />
      <rect x="15" y="3"  width="3" height="3" fill="currentColor" />
      {/* Row 2 */}
      <rect x="6"  y="6"  width="3" height="3" fill="currentColor" />
      <rect x="12" y="6"  width="3" height="3" fill="currentColor" />
      {/* Row 3 — centre */}
      <rect x="9"  y="9"  width="3" height="3" fill="currentColor" />
      {/* Row 4 */}
      <rect x="6"  y="12" width="3" height="3" fill="currentColor" />
      <rect x="12" y="12" width="3" height="3" fill="currentColor" />
      {/* Row 5 */}
      <rect x="3"  y="15" width="3" height="3" fill="currentColor" />
      <rect x="15" y="15" width="3" height="3" fill="currentColor" />
      {/* Row 6 */}
      <rect x="0"  y="18" width="3" height="3" fill="currentColor" />
      <rect x="18" y="18" width="3" height="3" fill="currentColor" />
    </svg>
  )
}

export default function Lightbox({ src, caption, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      {/* Close button — fixed top-right of viewport, always visible */}
      <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
        <PixelX />
      </button>

      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <img src={src} alt={caption || 'Clinical image'} className="lightbox-image" />
        {caption && <div className="lightbox-caption">{caption}</div>}
      </div>
    </div>
  )
}
