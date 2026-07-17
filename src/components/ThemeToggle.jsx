/** Icon toggle — flips between light and dark without competing with CTAs. */
export default function ThemeToggle({ resolvedTheme = 'dark', onSetTheme, className = '' }) {
  const next = resolvedTheme === 'dark' ? 'light' : 'dark'
  const label = next === 'light' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      className={`theme-icon-btn ${className}`.trim()}
      onClick={() => onSetTheme(next)}
      aria-label={label}
      title={label}
    >
      {resolvedTheme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.05 5.05l1.56 1.56M17.39 17.39l1.56 1.56M18.95 5.05l-1.56 1.56M6.61 17.39l-1.56 1.56"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20.5 13.3A8.2 8.2 0 0 1 10.7 3.5 8.5 8.5 0 1 0 20.5 13.3Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}
