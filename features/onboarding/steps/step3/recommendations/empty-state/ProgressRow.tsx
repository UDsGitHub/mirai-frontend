import { cn } from "@/lib/utils"
import { motion } from "motion/react"

type Props = {
  icon: React.ReactNode
  label: string
  count: number
  min: number
}

export default function ProgressRow({ icon, label, count, min }: Props) {
  const isComplete = count >= min

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          {icon}
          <span>{label}</span>
        </div>
        <span
          className={cn(
            "font-medium tabular-nums",
            isComplete ? "text-cyan-400" : "text-foreground"
          )}
        >
          {count}/{min}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-border">
        <motion.div
          className={cn(
            "h-full rounded-full",
            isComplete
              ? "bg-linear-to-r from-cyan-500 to-purple-500"
              : "bg-cyan-500/70"
          )}
          initial={false}
          animate={{ width: `${Math.min((count / min) * 100, 100)}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
