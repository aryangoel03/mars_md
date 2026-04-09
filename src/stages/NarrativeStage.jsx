import PixelButton from '../components/PixelButton.jsx'
import { parseContent } from '../utils/parseContent.jsx'

export default function NarrativeStage({ stage, onNext, isLast, isCompleted }) {
  return (
    <div className="narrative-stage pixel-card">
      <div className="narrative-content">
        {parseContent(stage.content)}
      </div>
      {stage.image && (
        <img src={stage.image} alt="Clinical image" className="stage-image" />
      )}
      {!isCompleted && onNext && (
        <div className="stage-actions">
          <PixelButton onClick={onNext} variant="primary">
            {isLast ? 'COMPLETE CASE' : 'NEXT ▶'}
          </PixelButton>
        </div>
      )}
    </div>
  )
}
