export default function FeedbackPanel({ message, image, isCorrect }) {
  if (!message) return null

  return (
    <div className={`feedback-panel ${isCorrect ? 'feedback-panel--correct' : 'feedback-panel--incorrect'}`}>
      <div className="feedback-icon">{isCorrect ? '▶ ' : '✕ '}</div>
      <div className="feedback-body">
        <p className="feedback-message">{message}</p>
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
