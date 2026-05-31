"use client"

import { SignIn } from "@clerk/nextjs"
import { Badge } from "@/components/ui/badge"
import { AudioWaveform, BrainCircuit, Eye, Users } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const moodAnalysisData = [
  { episode: "Ep 1", pacing: 122, mood: 186 },
  { episode: "Ep 2", pacing: 248, mood: 305 },
  { episode: "Ep 3", pacing: 177, mood: 237 },
  { episode: "Ep 4", pacing: 25, mood: 73 },
  { episode: "Ep 5", pacing: 127, mood: 209 },
  { episode: "Ep 6", pacing: 140, mood: 214 },
]

const chartConfig = {
  pacing: {
    label: "Pacing",
    color: "var(--color-pacing)",
  },
  mood: {
    label: "Mood",
    color: "var(--color-mood)",
  },
} satisfies ChartConfig

export default function SignInPage() {
  return (
    <div className="mx-auto flex h-full max-w-6xl items-center justify-center border-2 border-red-500 px-12">
      <div className="flex max-h-[734px] gap-12">
        <div className="">
          <Badge variant="outline" className="px-4 py-4">
            <Eye className="size-4" />
            <span className="uppercase">Mirai Intelligence</span>
          </Badge>
          <h1 className="pt-3 text-6xl font-bold">
            Discover Anime
            <span className="block text-primary">Engineered by AI</span>
          </h1>
          <p className="w-3/4 pt-3 text-base text-muted-foreground">
            Track, analyze, and connect. Mirai uses advanced cinematic profiling
            to match your unique taste with deep insights into mood, pacing, and
            thematic elements.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Card className="h-full">
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#00e5ff26] p-2">
                    <BrainCircuit size={24} color="#00E5FF" />
                  </div>
                  <div>
                    <h3 className="font-bold">Deep Insights</h3>
                    <p className="text-sm text-muted-foreground pt-1">
                      Analyze mood curves and pacing metrics for every series.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#b026ff26] p-2">
                    <svg
                      className="h-6 w-6 text-[#B026FF]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-width="2"
                        d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-bold">Social Sync</h3>
                    <p className="text-sm text-muted-foreground pt-1">
                      Connect with friends and compare cinematic compatibility.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="col-span-2 row-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <AudioWaveform size={16} />
                      <h3 className="text-sm font-bold">
                        Pacing & Mood Analysis
                      </h3>
                    </div>
                  </CardTitle>
                  <CardAction>
                    <Badge variant="outline">Live Demo</Badge>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <AreaChart
                      accessibilityLayer
                      data={moodAnalysisData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="episode"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Area
                        dataKey="pacing"
                        type="natural"
                        fill="var(--color-pacing)"
                        fillOpacity={0.4}
                        stroke="var(--color-pacing)"
                      />
                      <Area
                        dataKey="mood"
                        type="natural"
                        fill="var(--color-mood)"
                        fillOpacity={0.4}
                        stroke="var(--color-mood)"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="">
          <SignIn />
          <p className="text-center text-xs text-muted-foreground">
            Join thousands of curators optimizing their watch lists.
          </p>
        </div>
      </div>
    </div>
  )
}
