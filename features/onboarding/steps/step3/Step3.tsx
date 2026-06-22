import { Badge } from "@/components/ui/badge"
import { Search, WandSparkles } from "lucide-react"
import { motion } from "motion/react"
import GenreSelect from "./GenreSelect"
import TagSelect from "./TagSelect"
import StepBackground from "../../layout/StepBackground"
import { useState } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useIsMobile } from "@/hooks"
import RecommendationsPanelMobile from "./recommendations/RecommendationsPanelMobile"
import RecommendationsPanelDesktop from "./recommendations/RecommendationsPanelDesktop"
import { RecommendationsPanelTrigger } from "./recommendations/types"
import { Drawer } from "@/components/ui/drawer"
import { useFormContext } from "react-hook-form"
import { CombinedSchemaInput } from "@/components/multistep-form"
import { hasMinimumSelections, toPreferenceIds } from "./recommendations/utils"
import RecommendationsPanelTriggers from "./recommendations/RecommendationsPanelTriggers"

const scrollUnderFooterClass = "pb-[92px]"

export default function Step3() {
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [panelTrigger, setPanelTrigger] =
    useState<RecommendationsPanelTrigger>(undefined)
  const { watch } = useFormContext<CombinedSchemaInput>()
  const genreIds = toPreferenceIds(watch("genrePreferences"))
  const tagIds = toPreferenceIds(watch("tagPreferences"))
  const canTriggerPanel = hasMinimumSelections(genreIds, tagIds)

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value)
  }

  const handlePanelTriggerChange = (trigger: RecommendationsPanelTrigger) => {
    setPanelTrigger(trigger)
  }

  const handleDrawerOpenChange = (open: boolean) => {
    if (!open) {
      setPanelTrigger(undefined)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full min-h-0"
    >
      <StepBackground
        imageSrc="/assets/images/hxh_bg.png"
        className="flex min-h-0"
      >
        <Drawer open={!!panelTrigger} onOpenChange={handleDrawerOpenChange}>
          <div className="relative flex min-h-0 min-w-0 flex-1">
            <div className="flex min-h-0 min-w-0 flex-[60%] flex-col overflow-y-auto border-r border-border">
              {isMobile && (
                <RecommendationsPanelTriggers
                  canTrigger={canTriggerPanel}
                  onTriggerChange={handlePanelTriggerChange}
                />
              )}
              <div
                className={`px-[6%] ${isMobile ? "py-0" : "py-12"} ${scrollUnderFooterClass} flex flex-col gap-12`}
              >
                <div>
                  <h1 className="pt-3 text-4xl font-bold">
                    Initialize your{" "}
                    <span className="bg-linear-to-r from-cyan-500 to-purple-500 bg-clip-text font-extrabold text-transparent">
                      Neural Core
                    </span>
                  </h1>
                  <p className="pt-3 text-base text-muted-foreground">
                    Select your favorite genres and tags to help Mirai map your
                    cinematic taste profile.
                  </p>
                </div>
                <InputGroup>
                  <InputGroupInput
                    id="input-group-search"
                    placeholder="Search genres and tags"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                  />
                  <InputGroupAddon>
                    <Search className="size-4" />
                  </InputGroupAddon>
                </InputGroup>
                <GenreSelect searchTerm={debouncedSearchTerm} />
                <TagSelect searchTerm={debouncedSearchTerm} />
              </div>
            </div>
            {!isMobile && (
              <div
                className={`min-h-0 min-w-0 flex-[40%] overflow-y-auto p-8 ${scrollUnderFooterClass}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <WandSparkles className="size-4" />{" "}
                    <span className="text-sm font-semibold uppercase">
                      AI Taste Preview
                    </span>
                  </div>
                  <Badge variant={"secondary"}>
                    <div className="h-1 w-1 animate-pulse rounded-full bg-cyan-300" />
                    <span>Adapting to your picks</span>
                  </Badge>
                </div>
                <RecommendationsPanelDesktop />
              </div>
            )}
            <RecommendationsPanelMobile trigger={panelTrigger} />
          </div>
        </Drawer>
      </StepBackground>
    </motion.div>
  )
}
