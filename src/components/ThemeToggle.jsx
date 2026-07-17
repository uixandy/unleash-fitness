const OPTIONS = [
  ['dark', 'Dark'],
  ['light', 'Light'],
]

export default function ThemeToggle({ theme, resolvedTheme, onSetTheme, className = '' }) {
  return (
    <div
      className={`segmented-control theme-toggle ${className}`.trim()}
      role="group"
      aria-label="Color theme"
    >
      {OPTIONS.map(([val, label]) => {
        const active = theme === val || (theme === 'device' && resolvedTheme === val)
        return (
          <button
            key={val}
            type="button"
            className={`segmented-btn ${active ? 'active' : ''}`}
            onClick={() => onSetTheme(val)}
            aria-pressed={active}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
