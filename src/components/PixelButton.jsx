export default function PixelButton({ children, onClick, variant = 'primary', size = 'normal', disabled = false }) {
  return (
    <button
      className={`pixel-btn pixel-btn--${variant} pixel-btn--${size}${disabled ? ' pixel-btn--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
