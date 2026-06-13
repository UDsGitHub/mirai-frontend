import { Radar } from "lucide-react"
import { motion, MotionValue, useSpring } from "motion/react"

type Props = {
  mousePosition: { x: MotionValue<number>; y: MotionValue<number> }
}

const RINGS = [
  {
    inset: "inset-0",
    border: "border-cyan-500/15",
    dot: "bg-cyan-400/55 shadow-[0_0_6px_2px_rgba(34,211,238,0.3)]",
    damping: 50,
    duration: 14,
    direction: 1,
    startAngle: 0,
  },
  {
    inset: "inset-[12%]",
    border: "border-purple-500/20",
    dot: "bg-purple-400/60 shadow-[0_0_6px_2px_rgba(192,132,252,0.3)]",
    damping: 40,
    duration: 11,
    direction: -1,
    startAngle: 72,
  },
  {
    inset: "inset-[21%]",
    border: "border-cyan-500/20",
    dot: "bg-cyan-400/65 shadow-[0_0_5px_2px_rgba(34,211,238,0.35)]",
    damping: 30,
    duration: 8,
    direction: 1,
    startAngle: 144,
  },
  {
    inset: "inset-[36%]",
    border: "border-purple-500/20",
    dot: "bg-purple-400/55 shadow-[0_0_5px_1px_rgba(192,132,252,0.25)]",
    damping: 20,
    duration: 6,
    direction: -1,
    startAngle: 216,
  },
] as const

type RadarRingProps = {
  inset: string
  border: string
  dot: string
  damping: number
  duration: number
  direction: 1 | -1
  startAngle: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

function RadarRing({
  inset,
  border,
  dot,
  damping,
  duration,
  direction,
  startAngle,
  mouseX,
  mouseY,
}: RadarRingProps) {
  const x = useSpring(mouseX, { damping })
  const y = useSpring(mouseY, { damping })
  const endAngle = startAngle + direction * 360

  return (
    <motion.div style={{ x, y }} className={`absolute ${inset}`}>
      <div
        className={`absolute inset-0 rounded-full border ${border}`}
        aria-hidden
      />
      <motion.div
        className="absolute inset-0"
        aria-hidden
        initial={{ rotate: startAngle }}
        animate={{ rotate: endAngle }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div
          className={`absolute top-0 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${dot}`}
        />
      </motion.div>
    </motion.div>
  )
}

export default function RadarPlaceholder({ mousePosition }: Props) {
  const hexX = useSpring(mousePosition.x, { damping: 10 })
  const hexY = useSpring(mousePosition.y, { damping: 10 })
  const iconX = useSpring(mousePosition.x, { damping: 5 })
  const iconY = useSpring(mousePosition.y, { damping: 5 })

  return (
    <motion.div
      className="relative mx-auto size-36"
      style={{ x: mousePosition.x, y: mousePosition.y }}
    >
      {RINGS.map((ring) => (
        <RadarRing
          key={ring.inset}
          {...ring}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
        />
      ))}
      <motion.svg
        style={{ x: hexX, y: hexY }}
        viewBox="0 0 120 120"
        className="absolute inset-0 text-cyan-500/25"
        aria-hidden
      >
        <polygon
          points="60,32 84,46 84,74 60,88 36,74 36,46"
          fill="currentColor"
          fillOpacity={0.08}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />
      </motion.svg>
      <motion.div
        style={{ x: iconX, y: iconY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="size-4 rounded-full border border-cyan-500/40 animate-radar-ping" />
      </motion.div>
    </motion.div>
  )
}
