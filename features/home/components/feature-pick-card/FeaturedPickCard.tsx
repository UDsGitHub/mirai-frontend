import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks"
import { cn } from "@/lib/utils"
import { Bookmark, Bot, Info, Star } from "lucide-react"
import FeaturePickExplanationDrawer from "./FeaturePickExplanationDrawer"
import { useState } from "react"
import TruncatedText from "@/components/ui/truncated-text"
import { RANDOM_COLORS } from "@/constants/style"

const exampleTags: string[] = ["Adventure", "Fantasy"]

export default function FeaturedPickCard() {
  const isMobile = useIsMobile()
  const [explanationDrawerOpen, setExplanationDrawerOpen] = useState(false)

  const openExplanationDrawer = () => setExplanationDrawerOpen(true)
  const closeExplanationDrawer = () => setExplanationDrawerOpen(false)

  return (
    <div
      className={cn(
        "relative flex justify-between rounded-xl bg-cover bg-center p-3 duration-300 sm:h-[464px] lg:p-6 3xl:h-[484px]",
        isMobile
          ? "bg-[radial-gradient(circle_at_bottom_right,transparent_0%,black_70%),url('https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_d02a861b8b_60d5ad0ee5f847c1.png')]"
          : "bg-[radial-gradient(circle_at_top_right,transparent_0%,black_80%),url('https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_d02a861b8b_60d5ad0ee5f847c1.png')]"
      )}
    >
      <div className="flex flex-col items-start gap-4 3xl:gap-6">
        <div className="flex flex-col gap-2 3xl:gap-3">
          <Badge
            variant={"outline"}
            className="border border-teal-200/50 p-3 font-semibold text-teal-200"
          >
            <Star className="size-4 fill-teal-200" />
            <span className="ml-0.5">Featured Pick for You Today</span>
          </Badge>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex flex-row items-center gap-2">
              {exampleTags.slice(0, 3).map((tag, index) => {
                const customColors = cn(
                  RANDOM_COLORS.background.perc_25[
                    index % RANDOM_COLORS.background.perc_25.length
                  ],
                  RANDOM_COLORS.text[index % RANDOM_COLORS.text.length],
                  RANDOM_COLORS.border[index % RANDOM_COLORS.border.length],
                  "text-xs"
                )

                return (
                  <Badge key={tag} variant={"outline"} className={customColors}>
                    {tag}
                  </Badge>
                )
              })}
            </div>
            <Badge variant={"outline"}>2023 ⋅ 23 ep</Badge>
          </div>
        </div>
        <h1 className="line-clamp-2 max-w-3/4 shrink-0 font-zalando text-[1.25rem] leading-[1.45] font-bold sm:max-w-lg sm:text-[2.25rem] sm:leading-[1.45]">
          Frieren: Beyond Journey&apos;s End
        </h1>
        {isMobile ? (
          <Button
            variant={"link"}
            onClick={openExplanationDrawer}
            className="px-0"
          >
            <Info className="size-4" />
            <span className="text-xs font-semibold underline">
              Why Mirai picked this for you today?
            </span>
          </Button>
        ) : (
          <div className="flex max-w-[520px] gap-3 rounded-xl border border-teal-200/25 bg-background/50 p-4">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-teal-200">
              <Bot className="size-4 text-accent" />
            </div>
            <span className="line-clamp text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                Why Mirai picked this for you today:
              </span>{" "}
              <TruncatedText onShowMore={openExplanationDrawer}>
                Based on your love of complex character introspection and
                world-building, Frieren&apos;s quiet meditation on time, loss,
                and meaning aligns perfectly with your taste profile. Its
                painterly animation and emotionally resonant pacing mirror the
                storytelling depth you consistently rate highest.
              </TruncatedText>
            </span>
          </div>
        )}
        <div className="flex items-center gap-4">
          <Button
            variant={"primary"}
            size={isMobile ? "icon" : "default"}
            className="rounded-sm p-4 lg:rounded-xl lg:p-6"
          >
            <Bookmark />
            {!isMobile && <span>Add to Watchlist</span>}
          </Button>
          <Button
            variant={"outline"}
            size={isMobile ? "icon" : "default"}
            className="rounded-sm p-4 lg:rounded-xl lg:p-6"
          >
            <Info />
            {!isMobile && <span>View Details</span>}
          </Button>
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-yellow-300 stroke-none" />
            <span className="flex items-center text-sm font-bold">9.4</span>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "absolute top-2 right-2 flex flex-col items-center gap-1 rounded-xl border border-teal-200/25 p-2 duration-300 sm:border-none sm:p-2 md:p-3 lg:top-6 lg:right-6",
          isMobile ? "bg-background/70" : "bg-background/85"
        )}
      >
        <span className="bg-clip-text text-lg font-bold text-accent-foreground sm:text-2xl">
          99%
        </span>
        <span className="text-[10px] tracking-wide text-muted-foreground sm:text-xs">
          Match Score
        </span>
      </div>
      <FeaturePickExplanationDrawer
        isOpen={explanationDrawerOpen}
        onClose={closeExplanationDrawer}
      />
    </div>
  )
}
