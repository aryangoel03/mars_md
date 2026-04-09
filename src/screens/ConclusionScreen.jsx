import PixelButton from '../components/PixelButton.jsx'

export default function ConclusionScreen({ onRestart }) {
  return (
    <div className="conclusion-screen">
      <div className="conclusion-content">
        <div className="conclusion-art" aria-hidden="true">
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Mars planet */}
            <circle cx="60" cy="40" r="35" fill="#c1440e" opacity="0.9"/>
            <ellipse cx="50" cy="30" rx="12" ry="8" fill="#a03810" opacity="0.6"/>
            <ellipse cx="70" cy="50" rx="8" ry="5" fill="#a03810" opacity="0.6"/>
            <ellipse cx="45" cy="48" rx="6" ry="4" fill="#d4622a" opacity="0.4"/>
          </svg>
        </div>

        <div className="conclusion-badge">[ SHIFT COMPLETE ]</div>
        <h1 className="conclusion-title">YOU SURVIVED</h1>
        <div className="conclusion-subtitle">ONE DAY ON MARS</div>

        <div className="conclusion-message pixel-card">
          <p>
            Against the odds, you navigated the chaos of the Space Emergency
            Department and kept your patients alive.
          </p>
          <p>
            The colony endures — for now.
          </p>
          <p className="conclusion-flavour">
            Tomorrow, five more patients will arrive.
          </p>
        </div>

        <PixelButton onClick={onRestart} variant="secondary">
          PLAY AGAIN
        </PixelButton>
      </div>
    </div>
  )
}
