"use client"

import { SignIn } from "@clerk/nextjs"
import { Badge } from "@/components/ui/badge"
import { AudioWaveform, BrainCircuit, Eye } from "lucide-react"
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
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

const moodAnalysisData = [
  { episode: "Ep 1", pacing: 52, mood: 18 },
  { episode: "Ep 2", pacing: 72, mood: 24 },
  { episode: "Ep 3", pacing: 60, mood: 21 },
  { episode: "Ep 4", pacing: 35, mood: 12 },
  { episode: "Ep 5", pacing: 55, mood: 19 },
  { episode: "Ep 6", pacing: 58, mood: 20 },
]

const chartConfig = {
  mood: {
    label: "Mood",
    color: "#06B6D4",
  },
  pacing: {
    label: "Pacing",
    color: "#B026FF",
  },
} satisfies ChartConfig

export default function SignInPage() {
  return (
    <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-12">
      <div className="fixed left-1/2 top-1/2 h-[20%] w-[20%] -translate-x-1/2 -translate-y-1/2 bg-radial from-purple-500 from-40% via-cyan-500 via-60% to-transparent to-100% opacity-15 blur-3xl" />
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
          <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-2">
            <Card className="h-full lg:row-span-1 bg-neutral-800/25 backdrop-blur-lg">
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#00e5ff26] p-2">
                    <BrainCircuit size={24} color="#00E5FF" />
                  </div>
                  <div>
                    <h3 className="font-bold">Deep Insights</h3>
                    <p className="pt-1 text-sm text-muted-foreground">
                      Analyze mood curves and pacing metrics for every series.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full lg:row-span-1 bg-neutral-800/25 backdrop-blur-lg">
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
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-bold">Social Sync</h3>
                    <p className="pt-1 text-sm text-muted-foreground">
                      Connect with friends and compare cinematic compatibility.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="col-span-1 lg:col-span-2 row-span-1">
              <Card className="bg-neutral-800/25 backdrop-blur-lg">
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
                  <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-36"
                  >
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
                        dataKey="mood"
                        type="natural"
                        fill="#B026FF"
                        fillOpacity={0.4}
                        stroke="#B026FF"
                      />
                      <Area
                        dataKey="pacing"
                        type="natural"
                        fill="#06B6D4"
                        fillOpacity={0.4}
                        stroke="#06B6D4"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <SignIn />
          <AvatarGroup>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+2k</AvatarGroupCount>
          </AvatarGroup>
          <p className="text-center text-xs text-muted-foreground">
            Join thousands of curators optimizing their watch lists.
          </p>
        </div>
      </div>
    </div>
  )
}
