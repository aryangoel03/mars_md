import { useState, useRef, useEffect } from 'react'
import PixelButton from '../components/PixelButton.jsx'

export default function ChecklistStage({ stage, onNext, isLast, isCompleted }) {
  const [selected, setSelected] = useState(new Set())
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [missedCritical, setMissedCritical] = useState([])
  const [shake, setShake] = useState(false)
  const dropdownRef = useRef(null)
  const searchRef = useRef(null)

  // Sort items alphabetically by label (preserving original indices)
  const sortedItems = stage.items
    .map((item, i) => ({ item, i }))
    .sort((a, b) => a.item.label.localeCompare(b.item.label))

  // Filter by search query
  const filteredItems = sortedItems.filter(({ item }) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  // Close dropdown on outside click (use 'click' not 'mousedown' so button clicks fire first)
  useEffect(() => {
    if (!open) return
    function handleOutsideClick(e) {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [open])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50)
    }
  }, [open])

  function toggleDropdown() {
    if (isCompleted) return
    if (open) {
      setOpen(false)
      setQuery('')
    } else {
      setOpen(true)
    }
  }

  function toggleItem(index) {
    if (isCompleted) return
    const next = new Set(selected)
    if (next.has(index)) {
      next.delete(index)
    } else {
      next.add(index)
    }
    setSelected(next)
    if (missedCritical.includes(index)) {
      setMissedCritical(prev => prev.filter(i => i !== index))
    }
    // keep focus in search bar so user can keep typing after selecting an option
    searchRef.current?.focus()
  }

  function handleProceed() {
    // close dropdown first so layout is stable before any scroll/state changes
    setOpen(false)
    setQuery('')

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
    .sort((a, b) => a.item.label.localeCompare(b.item.label))

  const revealedItems = selectedItems.filter(({ item }) => item.reveal)

  return (
    <div className={`checklist-stage pixel-card${shake ? ' shake' : ''}`}>
      <p className="checklist-instruction">{stage.instruction}</p>

      <div className="dropdown-wrapper" ref={dropdownRef}>
        {/* Selected chips */}
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

        {/* Trigger */}
        {!isCompleted && (
          <button
            className={`dropdown-trigger${open ? ' dropdown-trigger--open' : ''}`}
            onClick={toggleDropdown}
          >
            <span className="dropdown-placeholder">
              {selectedItems.length === 0
                ? 'Select items...'
                : `${selectedItems.length} selected`}
            </span>
            <span className="dropdown-arrow">{open ? '▲' : '▼'}</span>
          </button>
        )}

        {/* Dropdown panel */}
        {open && (
          <div className="dropdown-list">
            {/* Search bar */}
            <div className="dropdown-search-wrapper">
              <span className="dropdown-search-icon">⌕</span>
              <input
                ref={searchRef}
                type="text"
                className="dropdown-search"
                placeholder="Search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onClick={e => e.stopPropagation()}
              />
              {query && (
                <button
                  className="dropdown-search-clear"
                  onClick={() => setQuery('')}
                  tabIndex={-1}
                >
                  ×
                </button>
              )}
            </div>

            {/* Options */}
            <div className="dropdown-options">
              {filteredItems.length === 0 ? (
                <div className="dropdown-no-results">No matches</div>
              ) : (
                filteredItems.map(({ item, i }) => {
                  const isSelected = selected.has(i)
                  const isMissed = missedCritical.includes(i)
                  return (
                    <button
                      key={i}
                      className={`dropdown-list-item${isSelected ? ' dropdown-list-item--selected' : ''}${isMissed ? ' dropdown-list-item--missed' : ''}`}
                      onClick={() => toggleItem(i)}
                    >
                      <span className="dropdown-list-checkbox">
                        {isSelected ? '▣' : '□'}
                      </span>
                      <span className="dropdown-list-label">{item.label}</span>
                    </button>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Revealed content */}
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

      {/* Critical warning */}
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
