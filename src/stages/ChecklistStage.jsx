import { useState, useRef, useEffect } from 'react'
import PixelButton from '../components/PixelButton.jsx'

export default function ChecklistStage({ stage, onNext, isLast, isCompleted }) {
  const [selected, setSelected] = useState(new Set())
  const [open, setOpen] = useState(false)
  const [missedCritical, setMissedCritical] = useState([])
  const [shake, setShake] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    function handleOutsideClick(e) {
      if (!dropdownRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [open])

  function toggleItem(index) {
    if (isCompleted) return
    const next = new Set(selected)
    if (next.has(index)) {
      next.delete(index)
    } else {
      next.add(index)
    }
    setSelected(next)
    // Clear missed-critical flags when user re-selects
    if (missedCritical.includes(index)) {
      setMissedCritical(prev => prev.filter(i => i !== index))
    }
  }

  function handleProceed() {
    const missed = stage.items
      .map((item, i) => ({ item, i }))
      .filter(({ item, i }) => item.critical && !selected.has(i))
      .map(({ i }) => i)

    if (missed.length > 0) {
      setMissedCritical(missed)
      setShake(true)
      setTimeout(() => setShake(false), 600)
      return
    }

    setMissedCritical([])
    onNext()
  }

  const selectedItems = stage.items
    .map((item, i) => ({ item, i }))
    .filter(({ i }) => selected.has(i))

  const revealedItems = selectedItems.filter(({ item }) => item.reveal)

  return (
    <div className={`checklist-stage pixel-card${shake ? ' shake' : ''}`}>
      <p className="checklist-instruction">{stage.instruction}</p>

      {/* Dropdown multi-select */}
      <div className="dropdown-wrapper" ref={dropdownRef}>
        {/* Selected chips display */}
        {selectedItems.length > 0 && (
          <div className="dropdown-chips">
            {selectedItems.map(({ item, i }) => (
              <span
                key={i}
                className={`dropdown-chip${missedCritical.includes(i) ? ' dropdown-chip--missed' : ''}`}
              >
                {item.label}
                {!isCompleted && (
                  <button
                    className="dropdown-chip-remove"
                    onClick={() => toggleItem(i)}
                    aria-label={`Remove ${item.label}`}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
        )}

        {/* Dropdown trigger */}
        {!isCompleted && (
          <button
            className={`dropdown-trigger${open ? ' dropdown-trigger--open' : ''}`}
            onClick={() => setOpen(o => !o)}
          >
            <span className="dropdown-placeholder">
              {selectedItems.length === 0
                ? 'Select items...'
                : `${selectedItems.length} selected`}
            </span>
            <span className="dropdown-arrow">{open ? '▲' : '▼'}</span>
          </button>
        )}

        {/* Dropdown list */}
        {open && (
          <div className="dropdown-list">
            {stage.items.map((item, index) => {
              const isSelected = selected.has(index)
              const isMissed = missedCritical.includes(index)
              return (
                <button
                  key={index}
                  className={`dropdown-list-item${isSelected ? ' dropdown-list-item--selected' : ''}${isMissed ? ' dropdown-list-item--missed' : ''}`}
                  onClick={() => toggleItem(index)}
                >
                  <span className="dropdown-list-checkbox">
                    {isSelected ? '▣' : '□'}
                  </span>
                  <span className="dropdown-list-label">{item.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Revealed content for items with a reveal string */}
      {revealedItems.length > 0 && (
        <div className="checklist-reveals">
          {revealedItems.map(({ item, i }) => (
            <div key={i} className="checklist-reveal-card">
              <span className="checklist-reveal-label">{item.label}</span>
              <span className="checklist-reveal-text">{item.reveal}</span>
            </div>
          ))}
        </div>
      )}

      {/* Critical item warning */}
      {missedCritical.length > 0 && (
        <div className="checklist-warning">
          ✕ {missedCritical.length} critical item{missedCritical.length > 1 ? 's' : ''} not selected — highlighted above.
        </div>
      )}

      {!isCompleted && onNext && (
        <div className="stage-actions">
          <PixelButton onClick={handleProceed} variant="primary">
            {isLast ? 'COMPLETE CASE' : 'PROCEED ▶'}
          </PixelButton>
        </div>
      )}
    </div>
  )
}
