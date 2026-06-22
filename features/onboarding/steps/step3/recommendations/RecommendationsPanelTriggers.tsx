import { Button } from "@/components/ui/button"
import { DrawerTrigger } from "@/components/ui/drawer"
import { ChartSpline, TvMinimalPlay } from "lucide-react"
import { RecommendationsPanelTrigger } from "./types"

type Props = {
  canTrigger: boolean
  onTriggerChange: (trigger: RecommendationsPanelTrigger) => void
}

export default function RecommendationsPanelTriggers({
  canTrigger,
  onTriggerChange,
}: Props) {
  return (
    <div className="sticky top-0 z-10 flex justify-end gap-2 bg-linear-to-b from-background to-transparent px-[6%] py-6">
      <DrawerTrigger
        asChild
        onClick={() => onTriggerChange("chart")}
        disabled={!canTrigger}
      >
        <Button
          size={"icon"}
          className={`rounded-lg active:bg-cyan-500/20 ${canTrigger ? "bg-cyan-500/10" : "bg-neutral-500/50 opacity-25"}`}
        >
          <ChartSpline
            size={20}
            className={`text-cyan-300 ${canTrigger ? "text-cyan-300" : "text-secondary-foreground/50"}`}
          />
        </Button>
      </DrawerTrigger>
      <DrawerTrigger
        asChild
        onClick={() => onTriggerChange("list")}
        disabled={!canTrigger}
      >
        <Button
          size={"icon"}
          className={`rounded-lg active:bg-cyan-500/20 ${canTrigger ? "bg-cyan-500/10" : "bg-neutral-500/50 opacity-25"}`}
        >
          <TvMinimalPlay
            size={20}
            className={`text-cyan-300 ${canTrigger ? "text-cyan-300" : "text-secondary-foreground/50"}`}
          />
        </Button>
      </DrawerTrigger>
    </div>
  )
}
