import { motion } from "motion/react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { CHART_CONFIG } from "./constants"
import { TasteChartPoint } from "./taste-matrix"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  loading: boolean
  chartData: TasteChartPoint[]
}

export default function RecommendationsPanelChart({
  loading,
  chartData,
}: Props) {
  if (loading || chartData.length === 0) {
    return <Skeleton className="h-[250px] w-full rounded-md" />
  }

  const chartKey = chartData.map((point) => point.label).join("|")

  return (
    <motion.div
      key={chartKey}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="min-w-0"
    >
      <ChartContainer
        config={CHART_CONFIG}
        className="mx-auto aspect-square max-h-[250px] w-full min-w-0"
      >
        <RadarChart data={chartData}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarAngleAxis dataKey="label" />
          <PolarGrid />
          <Radar
            dataKey="value"
            fill="var(--color-value)"
            fillOpacity={0.6}
            isAnimationActive
            animationDuration={900}
            animationEasing="ease-out"
            dot={{
              r: 4,
              fillOpacity: 1,
            }}
          />
        </RadarChart>
      </ChartContainer>
    </motion.div>
  )
}
