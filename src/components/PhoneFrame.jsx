import { useState, useEffect } from 'react'

/**
 * Drop screenshots into public/screenshots/:
 *   workout.png | progress.png | nutrition.png
 * Optional GIFs/videos: workout.gif, progress.gif, nutrition.gif (or .mp4)
 */
const SHOTS = [
  {
    key: 'workout',
    label: 'Workout',
    src: '/screenshots/workout.png',
    video: '/screenshots/workout.gif',
    hint: 'Drop workout.png here',
  },
  {
    key: 'progress',
    label: 'Progress',
    src: '/screenshots/progress.png',
    video: '/screenshots/progress.gif',
    hint: 'Drop progress.png here',
  },
  {
    key: 'nutrition',
    label: 'Nutrition',
    src: '/screenshots/nutrition.png',
    video: '/screenshots/nutrition.gif',
    hint: 'Drop nutrition.png here',
  },
]

function useImageExists(src) {
  const [exists, setExists] = useState(false)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => { if (!cancelled) setExists(true) }
    img.onerror = () => { if (!cancelled) setExists(false) }
    img.src = src
    return () => { cancelled = true }
  }, [src])

  return exists
}

function PhoneScreen({ shot }) {
  const hasImg = useImageExists(shot.src)
  const hasGif = useImageExists(shot.video)

  if (hasGif) {
    return <img src={shot.video} alt={`${shot.label} demo`} />
  }
  if (hasImg) {
    return <img src={shot.src} alt={`UNLEASH ${shot.label} screen`} />
  }

  return (
    <div className="phone-placeholder">
      <span>{shot.label}</span>
      <small>{shot.hint}</small>
    </div>
  )
}

export default function PhoneFrame({ shot, className = '' }) {
  return (
    <div className={`phone-frame ${className}`}>
      <div className="phone-screen">
        <PhoneScreen shot={shot} />
      </div>
    </div>
  )
}

export { SHOTS }
