import { useState } from 'react'
import PixelButton from '../components/PixelButton.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { parseContent } from '../utils/parseContent.jsx'

export default function NarrativeStage({ stage, onNext, isLast, isCompleted }) {
  const [lightbox, setLightbox] = useState(false)

  return (
    <div className="narrative-stage pixel-card">
      <div className="narrative-content">
        {parseContent(stage.content)}
      </div>
      {stage.image && (
        <img
          src={stage.image}
          alt="Clinical image"
          className="stage-image stage-image--zoomable"
          onClick={() => setLightbox(true)}
        />
      )}
      {lightbox && (
        <Lightbox
          src={stage.image}
          onClose={() => setLightbox(false)}
        />
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
