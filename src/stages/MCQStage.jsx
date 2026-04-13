import { useState, useRef } from 'react'
import PixelButton from '../components/PixelButton.jsx'
import FeedbackPanel from '../components/FeedbackPanel.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { parseContent } from '../utils/parseContent.jsx'

// Three feedback modes, determined by data shape:
//
//   Lock mode      (feedback: array, explanation: null)
//     Any selection immediately locks + shows per-option message + shows NEXT
//
//   Accumulating   (feedback: array, explanation: string)
//     Wrong → shake, add a labeled panel for that option (accumulates), option disabled
//     Correct → show explanation panel + NEXT
//     User retries until correct
//
//   Generic        (feedback: null)
//     Wrong → shake, show "Incorrect — try again", option disabled
//     Correct → show explanation + NEXT

export default function MCQStage({ stage, onNext, isLast, isCompleted }) {
  const hasTailored = Array.isArray(stage.feedback)
  const isAccumulating = hasTailored && !!stage.explanation

  // Generic / accumulating state
  const [wrongAttempts, setWrongAttempts] = useState(new Set())
  const [correctSelected, setCorrectSelected] = useState(false)
  const [wrongFeedbackList, setWrongFeedbackList] = useState([]) // accumulating mode only

  // Lock mode state
  const [lockedIndex, setLockedIndex] = useState(null)

  const [shake, setShake] = useState(false)
  const [lightbox, setLightbox] = useState(null) // { src, caption }
  const bottomRef = useRef(null)

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 600)
  }

  function scrollToBottom() {
    setTimeout(() => {
      if (!bottomRef.current) return
      const rect = bottomRef.current.getBoundingClientRect()
      if (rect.bottom > window.innerHeight) {
        window.scrollBy({ top: rect.bottom - window.innerHeight + 40, behavior: 'smooth' })
      }
    }, 80)
  }

  function handleSelect(index) {
    if (isCompleted) return

    if (isAccumulating) {
      if (correctSelected || wrongAttempts.has(index)) return
      if (index === stage.correct) {
        setCorrectSelected(true)
        scrollToBottom()
      } else {
        setWrongAttempts(prev => new Set([...prev, index]))
        const text = stage.feedback[index]
        if (text) {
          setWrongFeedbackList(prev => [...prev, {
            index,
            letter: String.fromCharCode(65 + index),
            text,
          }])
        }
        triggerShake()
        scrollToBottom()
      }
      return
    }

    if (hasTailored) {
      // Lock mode
      if (lockedIndex !== null) return
      setLockedIndex(index)
      if (index !== stage.correct) triggerShake()
      scrollToBottom()
    } else {
      // Generic mode
      if (correctSelected || wrongAttempts.has(index)) return
      if (index === stage.correct) {
        setCorrectSelected(true)
        scrollToBottom()
      } else {
        setWrongAttempts(prev => new Set([...prev, index]))
        triggerShake()
        scrollToBottom()
      }
    }
  }

  function getOptionState(index) {
    if (isAccumulating) {
      if (index === stage.correct && correctSelected) return 'correct'
      if (wrongAttempts.has(index)) return 'wrong'
      return 'idle'
    }
    if (hasTailored) {
      if (lockedIndex === null) return 'idle'
      if (index === stage.correct) return 'correct'
      if (index === lockedIndex) return 'wrong'
      return 'idle'
    }
    if (index === stage.correct && correctSelected) return 'correct'
    if (wrongAttempts.has(index)) return 'wrong'
    return 'idle'
  }

  function isOptionDisabled(index) {
    if (isCompleted) return true
    if (isAccumulating) return correctSelected || wrongAttempts.has(index)
    if (hasTailored) return lockedIndex !== null
    return correctSelected || wrongAttempts.has(index)
  }

  // --- Non-accumulating feedback helpers ---
  const showFeedback = !isAccumulating && (hasTailored
    ? lockedIndex !== null
    : correctSelected || wrongAttempts.size > 0)

  function getFeedbackText() {
    if (hasTailored && lockedIndex !== null) return stage.feedback[lockedIndex]
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

  const showNext = isAccumulating
    ? correctSelected
    : (hasTailored ? lockedIndex !== null : correctSelected)

  return (
    <div className={`mcq-stage pixel-card${shake ? ' shake' : ''}`}>
      <div className="mcq-question">
        {parseContent(stage.question)}
      </div>

      {stage.images && stage.images.length > 0 ? (
        <div className="mcq-image-container mcq-image-container--multi">
          {stage.images.map(({ src, caption }, i) => (
            <figure key={i} className="mcq-image-figure">
              <img
                src={src}
                alt={caption || 'Clinical image'}
                className="stage-image stage-image--zoomable"
                onClick={() => setLightbox({ src, caption })}
              />
              {caption && <figcaption className="mcq-image-caption">{caption}</figcaption>}
            </figure>
          ))}
        </div>
      ) : stage.image ? (
        <div className="mcq-image-container">
          <img
            src={stage.image}
            alt="Clinical image"
            className="stage-image stage-image--zoomable"
            onClick={() => setLightbox({ src: stage.image, caption: null })}
          />
        </div>
      ) : null}

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
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

      {/* Accumulating mode: one panel per wrong attempt, labeled with option letter */}
      {isAccumulating && wrongFeedbackList.map(({ index, letter, text }) => (
        <FeedbackPanel
          key={index}
          message={`**${letter})** ${text}`}
          isCorrect={false}
        />
      ))}

      {/* Accumulating mode: explanation shown on correct */}
      {isAccumulating && correctSelected && (
        <FeedbackPanel
          message={stage.explanation}
          image={stage.explanationImage}
          isCorrect={true}
        />
      )}

      {/* Lock / generic mode: single feedback panel */}
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
      <div ref={bottomRef} />
    </div>
  )
}
