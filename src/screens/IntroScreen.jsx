import PixelButton from '../components/PixelButton.jsx'

export default function IntroScreen({ onStart, onPractice }) {
  return (
    <div className="intro-screen">
      <div className="intro-content">
        <div className="spaceship-art" aria-hidden="true">
          <svg width="90" height="60" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Simple pixel-art spaceship */}
            <rect x="50" y="0" width="20" height="10" fill="#00ff41"/>
            <rect x="40" y="10" width="40" height="20" fill="#00ff41"/>
            <rect x="30" y="30" width="60" height="20" fill="#00ff41"/>
            <rect x="20" y="50" width="80" height="10" fill="#00ff41"/>
            <rect x="10" y="60" width="20" height="10" fill="#00c8ff"/>
            <rect x="90" y="60" width="20" height="10" fill="#00c8ff"/>
            <rect x="50" y="60" width="20" height="10" fill="#ff4444"/>
            {/* Engine glow */}
            <rect x="35" y="70" width="10" height="6" fill="#ff8800" opacity="0.8"/>
            <rect x="55" y="70" width="10" height="6" fill="#ff8800" opacity="0.8"/>
            <rect x="75" y="70" width="10" height="6" fill="#ff8800" opacity="0.8"/>
          </svg>
        </div>

        <div className="intro-year">[ YEAR 2085 ]</div>
        <h1 className="intro-title">MARS MD</h1>
        <div className="intro-subtitle">MARS EMERGENCY DEPARTMENT</div>

        <div className="intro-lore pixel-card">
          <p className="intro-lore-context">
            World War III drove humanity to Mars. The conflict ended decades
            ago — but much of Earth remains fractured and uninhabitable.
          </p>
          <div className="intro-lore-divider" aria-hidden="true" />
          <p className="intro-lore-role">
            You are the attending physician of the{' '}
            <span className="highlight">Mars Emergency Department</span>{' '}
            at Kessler Station.
          </p>
          <p className="intro-lore-stat">
            <span className="intro-lore-stat-label">COLONISTS UNDER CARE</span>
            <span className="intro-lore-stat-value">62,176</span>
          </p>
          <p className="intro-lore-warning">
            Resources are finite. Every decision matters.
          </p>
        </div>

        <div className="intro-buttons">
          <PixelButton onClick={onStart} variant="primary" size="large">
            BEGIN SHIFT
          </PixelButton>
          <PixelButton onClick={onPractice} variant="secondary" size="large">
            PRACTICE
          </PixelButton>
        </div>
      </div>
    </div>
  )
}
