import { useState, useRef, useEffect } from 'react'
import PixelButton from '../components/PixelButton.jsx'
import NarrativeStage from '../stages/NarrativeStage.jsx'
import MCQStage from '../stages/MCQStage.jsx'
import ChecklistStage from '../stages/ChecklistStage.jsx'

export default function ScenarioScreen({ scenario, scenarioNumber, totalScenarios, onComplete, onAbandon }) {
  const [visibleCount, setVisibleCount] = useState(1)
  const [scenarioScore, setScenarioScore] = useState(0)
  const [scenarioMaxScore, setScenarioMaxScore] = useState(0)
  const [showConfirm, setShowConfirm] = useState(false)
  const newStageRef = useRef(null)

  useEffect(() => {
    if (visibleCount > 1 && newStageRef.current) {
      setTimeout(() => {
        newStageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
  }, [visibleCount])

  function handleScore(points, maxPoints) {
    setScenarioScore(s => s + points)
    setScenarioMaxScore(m => m + maxPoints)
  }

  function handleStageNext() {
    if (visibleCount >= scenario.stages.length) {
      onComplete(scenarioScore, scenarioMaxScore)
    } else {
      setVisibleCount(v => v + 1)
    }
  }

  return (
    <div className="scenario-screen">
      {showConfirm && (
        <div className="abandon-overlay">
          <div className="abandon-dialog pixel-card">
            <p className="abandon-message">ABANDON SHIFT?</p>
            <p className="abandon-subtext">Your progress will be lost.</p>
            <div className="abandon-buttons">
              <PixelButton variant="danger" onClick={onAbandon}>
                YES, ABANDON
              </PixelButton>
              <PixelButton variant="secondary" onClick={() => setShowConfirm(false)}>
                CANCEL
              </PixelButton>
            </div>
          </div>
        </div>
      )}
      <div className="scenario-header">
        <span className="scenario-badge">CASE {scenarioNumber}/{totalScenarios}</span>
        <span className="scenario-title">{scenario.title}</span>
        {scenario.subtitle && (
          <span className="scenario-subtitle">{scenario.subtitle}</span>
        )}
        <div className="scenario-abandon-btn">
          <PixelButton variant="danger" onClick={() => setShowConfirm(true)} aria-label="Abandon shift">
            <svg width="18" height="18" viewBox="0 0 9 9" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
              <rect x="0" y="0" width="9" height="1" /> {/* top beam */}
              <rect x="0" y="0" width="1" height="9" /> {/* left post */}
              <rect x="8" y="0" width="1" height="9" /> {/* right post */}
              <rect x="1" y="1" width="3" height="8" /> {/* door panel, ajar left */}
              <rect x="3" y="5" width="1" height="1" /> {/* knob */}
            </svg>
          </PixelButton>
        </div>
      </div>

      <div className="stages-feed">
        {scenario.stages.slice(0, visibleCount).map((stage, index) => {
          const isLast = index === scenario.stages.length - 1
          const isActive = index === visibleCount - 1
          const isCompleted = index < visibleCount - 1
          const stageProps = {
            stage,
            onNext: isActive ? handleStageNext : null,
            isLast,
            isCompleted,
            onScore: handleScore,
          }

          return (
            <div
              key={index}
              className={`stage-wrapper${isCompleted ? ' stage-wrapper--completed' : ''}`}
              ref={isActive && index > 0 ? newStageRef : null}
            >
              {stage.type === 'narrative' && <NarrativeStage {...stageProps} />}
              {stage.type === 'mcq' && <MCQStage {...stageProps} />}
              {stage.type === 'checklist' && <ChecklistStage {...stageProps} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
