import PixelButton from '../components/PixelButton.jsx'

export default function PracticeSelectScreen({ scenarios, onSelect, onBack }) {
  return (
    <div className="practice-select-screen">
      <div className="practice-select-header">
        <div className="practice-select-title">PRACTICE SCENARIOS</div>
        <div className="practice-select-subtitle">Select a case to begin</div>
      </div>

      <div className="scenario-card-list">
        {scenarios.map(scenario => (
          <div key={scenario.id} className="scenario-card pixel-card">
            <div className="scenario-card-info">
              <div className="scenario-card-title">{scenario.title}</div>
              {scenario.subtitle && (
                <div className="scenario-card-subtitle">{scenario.subtitle}</div>
              )}
            </div>
            <PixelButton onClick={() => onSelect(scenario)} variant="primary">
              SELECT
            </PixelButton>
          </div>
        ))}
      </div>

      <div className="practice-select-back">
        <PixelButton onClick={onBack} variant="secondary">
          ← MAIN MENU
        </PixelButton>
      </div>
    </div>
  )
}
