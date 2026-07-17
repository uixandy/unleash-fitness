/**
 * Product proof screenshots in public/screenshots/:
 *   workout.png | nutrition.png | plans.png
 * Extra assets: library.png, nutrition-planner.png, nutrition-recipes.png
 */
const SHOTS = [
  {
    key: 'workout',
    label: 'Workout',
    src: '/screenshots/workout.png',
  },
  {
    key: 'nutrition',
    label: 'Nutrition',
    src: '/screenshots/nutrition.png',
  },
  {
    key: 'plans',
    label: 'Plans',
    src: '/screenshots/plans.png',
  },
]

function PhoneScreen({ shot }) {
  return <img src={shot.src} alt={`UNLEASH ${shot.label} screen`} />
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
