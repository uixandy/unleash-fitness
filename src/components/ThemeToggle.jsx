const OPTIONS = [
  ['dark', 'Dark'],
  ['light', 'Light'],
  ['device', 'Device'],
]

export default function ThemeToggle({ theme, onSetTheme, className = '' }) {
  return (
    <div
      className={`segmented-control theme-toggle ${className}`.trim()}
      role="group"
      aria-label="Color theme"
    >
      {OPTIONS.map(([val, label]) => (
        <button
          key={val}
          type="button"
          className={`segmented-btn ${theme === val ? 'active' : ''}`}
          onClick={() => onSetTheme(val)}
          aria-pressed={theme === val}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
