export default function Logo({ size = 'md', className = '' }) {
  return (
    <div className={`logo logo--${size} ${className}`.trim()}>
      <span className="logo__text">VEGUR</span>
      <svg className="logo__line" viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="3" x2="93" y2="3" stroke="#B8FF6E" strokeWidth="1.5" />
        <circle cx="96" cy="3" r="3.5" fill="#B8FF6E" />
      </svg>
    </div>
  )
}
