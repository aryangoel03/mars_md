import { useState } from 'react'
import PixelButton from '../components/PixelButton.jsx'
import FeedbackPanel from '../components/FeedbackPanel.jsx'
import { parseContent } from '../utils/parseContent.jsx'

// Behaviour:
//   Tailored feedback (stage.feedback is an array):
//     - Any selection immediately locks the question + shows tailored message + shows NEXT
//   Generic feedback (stage.feedback is null):
//     - Wrong answer: shake, show "Incorrect — try again", wrong option turns red + disabled
//     - Correct answer: show explanation, show NEXT
//     - User can keep retrying until correct

export default function MCQStage({ stage, onNext, isLast, isCompleted }) {
  const hasTailored = Array.isArray(stage.feedback)

  // Generic feedback state
  const [wrongAttempts, setWrongAttempts] = useState(new Set())
  const [correctSelected, setCorrectSelected] = useState(false)

  // Tailored feedback state
  const [lockedIndex, setLockedIndex] = useState(null)

  const [shake, setShake] = useState(false)

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 600)
  }

  function handleSelect(index) {
    if (isCompleted) return

    if (hasTailored) {
      if (lockedIndex !== null) return
      setLockedIndex(index)
      if (index !== stage.correct) triggerShake()
    } else {
      if (correctSelected || wrongAttempts.has(index)) return
      if (index === stage.correct) {
        setCorrectSelected(true)
      } else {
        setWrongAttempts(prev => new Set([...prev, index]))
        triggerShake()
      }
    }
  }

  // Determine display state for each option
  function getOptionState(index) {
    if (hasTailored) {
      if (lockedIndex === null) return 'idle'
      if (index === stage.correct) return 'correct'
      if (index === lockedIndex) return 'wrong'
      return 'idle'
    } else {
      if (index === stage.correct && correctSelected) return 'correct'
      if (wrongAttempts.has(index)) return 'wrong'
      return 'idle'
    }
  }

  function isOptionDisabled(index) {
    if (isCompleted) return true
    if (hasTailored) return lockedIndex !== null
    return correctSelected || wrongAttempts.has(index)
  }

  // Feedback panel content
  const showFeedback = hasTailored
    ? lockedIndex !== null
    : correctSelected || wrongAttempts.size > 0

  function getFeedbackText() {
    if (hasTailored && lockedIndex !== null) {
      return stage.feedback[lockedIndex]
    }
    if (!hasTailored) {
      if (correctSelected) return stage.explanation || 'Correct!'
      if (wrongAttempts.size > 0) return 'Incorrect — try again.'
    }
    return null
  }

  function getFeedbackCorrect() {
    if (hasTailored) return lockedIndex === stage.correct
    return correctSelected
  }

  const showNext = hasTailored ? lockedIndex !== null : correctSelected

  return (
    <div className={`mcq-stage pixel-card${shake ? ' shake' : ''}`}>
      <div className="mcq-question">
        {parseContent(stage.question)}
      </div>

      {stage.image && (
        <div className="mcq-image-container">
          <img src={stage.image} alt="Clinical image" className="stage-image" />
        </div>
      )}

      <div className="mcq-options">
        {stage.options.map((option, index) => {
          const state = getOptionState(index)
          const disabled = isOptionDisabled(index)

          return (
            <button
              key={index}
              className={`mcq-option mcq-option--${state}${disabled && state === 'idle' ? ' mcq-option--dimmed' : ''}`}
              onClick={() => handleSelect(index)}
              disabled={disabled}
            >
              <span className="mcq-option-letter">{String.fromCharCode(65 + index)})</span>
              <span className="mcq-option-text">{option}</span>
            </button>
          )
        })}
      </div>

      {showFeedback && (
        <FeedbackPanel
          message={getFeedbackText()}
          image={getFeedbackCorrect() && stage.explanationImage ? stage.explanationImage : null}
          isCorrect={getFeedbackCorrect()}
        />
      )}

      {!isCompleted && showNext && onNext && (
        <div className="stage-actions">
          <PixelButton onClick={onNext} variant="primary">
            {isLast ? 'COMPLETE CASE' : 'NEXT ▶'}
          </PixelButton>
        </div>
      )}
    </div>
  )
}
