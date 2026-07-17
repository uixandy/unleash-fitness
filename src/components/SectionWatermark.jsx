export default function SectionWatermark({ children, position = 'top', className = '' }) {
  return (
    <div
      className={`section-watermark section-watermark--${position} ${className}`.trim()}
      aria-hidden="true"
    >
      {children}
    </div>
  )
}
