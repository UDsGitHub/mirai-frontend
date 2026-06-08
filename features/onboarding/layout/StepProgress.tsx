import { useId } from "react"

type Props = {
  currentStepIndex: number
  totalSteps: number
}

const VIEWBOX_WIDTH = 100
const TRACK_HEIGHT = 6
const GAP = 6
const RADIUS = TRACK_HEIGHT / 2

function getSegments(totalSteps: number, currentStepIndex: number) {
  const flexValues = Array.from({ length: totalSteps }, (_, index) =>
    index === currentStepIndex ? 2 : 1
  )
  const totalFlex = flexValues.reduce((sum, flex) => sum + flex, 0)
  const segmentArea = VIEWBOX_WIDTH - GAP * (totalSteps - 1)

  let x = 0
  return flexValues.map((flex, index) => {
    const width = (flex / totalFlex) * segmentArea
    const segment = { x, width, index }
    x += width + GAP
    return segment
  })
}

export default function StepProgress({ currentStepIndex, totalSteps }: Props) {
  const id = useId().replace(/:/g, "")
  const gradientId = `${id}-gradient`
  const maskId = `${id}-mask`
  const segments = getSegments(totalSteps, currentStepIndex)

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${TRACK_HEIGHT}`}
      className="h-1.5 w-full"
      preserveAspectRatio="none"
      role="progressbar"
      aria-valuenow={currentStepIndex + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-cyan-500)" />
          <stop offset="100%" stopColor="var(--color-purple-500)" />
        </linearGradient>
        <mask id={maskId}>
          {segments
            .filter((segment) => segment.index <= currentStepIndex)
            .map((segment) => (
              <rect
                key={segment.index}
                x={segment.x}
                y={0}
                width={segment.width}
                height={TRACK_HEIGHT}
                rx={RADIUS}
                fill="white"
              />
            ))}
        </mask>
      </defs>

      <rect
        width={VIEWBOX_WIDTH}
        height={TRACK_HEIGHT}
        fill={`url(#${gradientId})`}
        mask={`url(#${maskId})`}
      />

      {segments
        .filter((segment) => segment.index > currentStepIndex)
        .map((segment) => (
          <rect
            key={segment.index}
            x={segment.x}
            y={0}
            width={segment.width}
            height={TRACK_HEIGHT}
            rx={RADIUS}
            className="fill-muted-foreground/25"
          />
        ))}
    </svg>
  )
}
