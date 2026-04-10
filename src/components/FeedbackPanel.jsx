import { parseContent } from '../utils/parseContent.jsx'

export default function FeedbackPanel({ message, image, isCorrect }) {
  if (!message) return null

  return (
    <div className={`feedback-panel ${isCorrect ? 'feedback-panel--correct' : 'feedback-panel--incorrect'}`}>
      <div className="feedback-icon">{isCorrect ? '▶ ' : '✕ '}</div>
      <div className="feedback-body">
        <div className="feedback-message">{parseContent(message)}</div>
        {image && (
          <img
            src={image}
            alt="Explanation diagram"
            className="feedback-image"
          />
        )}
      </div>
    </div>
  )
}
