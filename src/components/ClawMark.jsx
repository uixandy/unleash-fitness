/**
 * UNLEASH brand claw — three scratches echoing the logo mark.
 * Variants: hero (large atmosphere), inline (accent), corner (section grit).
 */
export default function ClawMark({
  className = '',
  variant = 'inline',
  title = '',
}) {
  return (
    <svg
      className={`claw-mark claw-mark--${variant} ${className}`.trim()}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M72 4 L28 112 C26 116 22 118 18 116 C14 114 13 110 15 106 L62 2 C64 -1 69 0 72 4Z"
      />
      <path
        fill="currentColor"
        d="M86 14 L48 108 C46 112 43 114 39 112 C35 110 34 106 36 102 L77 10 C79 7 84 10 86 14Z"
      />
      <path
        fill="currentColor"
        d="M98 28 L68 106 C66 110 63 112 59 110 C55 108 54 104 56 100 L89 24 C91 21 96 24 98 28Z"
      />
    </svg>
  )
}

/** Three diagonal slash scratches — rule / divider energy */
export function ScratchSlashes({ className = '' }) {
  return (
    <svg
      className={`scratch-slashes ${className}`.trim()}
      viewBox="0 0 72 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 14 L18 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 14 L38 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 15 L62 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
