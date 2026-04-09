import { useState, useRef, useEffect } from 'react'
import NarrativeStage from '../stages/NarrativeStage.jsx'
import MCQStage from '../stages/MCQStage.jsx'
import ChecklistStage from '../stages/ChecklistStage.jsx'

export default function ScenarioScreen({ scenario, scenarioNumber, totalScenarios, onComplete }) {
  const [visibleCount, setVisibleCount] = useState(1)
  const newStageRef = useRef(null)

  useEffect(() => {
    if (visibleCount > 1 && newStageRef.current) {
      setTimeout(() => {
        newStageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
  }, [visibleCount])

  function handleStageNext() {
    if (visibleCount >= scenario.stages.length) {
      onComplete()
    } else {
      setVisibleCount(v => v + 1)
    }
  }

  return (
    <div className="scenario-screen">
      <div className="scenario-header">
        <span className="scenario-badge">CASE {scenarioNumber}/{totalScenarios}</span>
        <span className="scenario-title">{scenario.title}</span>
        {scenario.subtitle && (
          <span className="scenario-subtitle">{scenario.subtitle}</span>
        )}
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
