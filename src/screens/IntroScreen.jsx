import PixelButton from '../components/PixelButton.jsx'

export default function IntroScreen({ onStart }) {
  return (
    <div className="intro-screen">
      <div className="intro-content">
        <div className="spaceship-art" aria-hidden="true">
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        <div className="intro-year">[ YEAR 2030 ]</div>
        <h1 className="intro-title">MARS MD</h1>
        <div className="intro-subtitle">SPACE EMERGENCY DEPARTMENT</div>

        <div className="intro-lore pixel-card">
          <p>
            A nuclear war has devastated Earth. Humanity's survivors have fled
            to a colony on Mars.
          </p>
          <p>
            You are the attending physician of the <span className="highlight">Space Emergency Department</span> aboard
            the LAPD Medical Station — the last line of care for 847 colonists.
          </p>
          <p>
            Resources are scarce. Every decision matters.
          </p>
          <p className="intro-mission">
            Five patients await your assessment.
          </p>
        </div>

        <PixelButton onClick={onStart} variant="primary" size="large">
          BEGIN SHIFT
        </PixelButton>
      </div>
    </div>
  )
}
