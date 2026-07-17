/**
 * Screenshots in public/screenshots/
 * Proof: workout, nutrition, plans, library
 * Features extras: nutrition-planner, nutrition-recipes
 */
/** Three frames for the product proof rail */
const SHOTS = [
  {
    key: 'workout',
    label: 'Workout',
    caption: 'Sets, supersets, rest timer — log between sets without fighting the UI.',
    src: '/screenshots/workout.png',
  },
  {
    key: 'nutrition',
    label: 'Nutrition',
    caption: 'Recipes, meal planner, and macro goals — kitchen tracking next to the rack.',
    src: '/screenshots/nutrition.png',
  },
  {
    key: 'plans',
    label: 'Plans',
    caption: 'Save programs, run them on the floor, keep history that sticks.',
    src: '/screenshots/plans.png',
  },
]

function PhoneScreen({ shot }) {
  return (
    <img
      src={shot.src}
      alt={`UNLEASH ${shot.label} screen`}
      loading="lazy"
      decoding="async"
    />
  )
}

export default function PhoneFrame({ shot, className = '', size = 'md' }) {
  const sizeClass = size === 'lg' ? 'phone-frame--lg' : size === 'sm' ? 'phone-frame--sm' : ''

  return (
    <div className={`phone-frame ${sizeClass} ${className}`.trim()}>
      <div className="phone-notch" aria-hidden="true" />
      <div className="phone-screen">
        <PhoneScreen shot={shot} />
      </div>
    </div>
  )
}

export { SHOTS }
