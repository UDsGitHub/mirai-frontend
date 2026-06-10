import { Badge } from "@/components/ui/badge"
import { WandSparkles } from "lucide-react"
import { motion } from "motion/react"
import GenreSelect from "./GenreSelect"
import TagSelect from "./TagSelect"
import Recommendations from "./Recommendations"

const scrollUnderFooterClass = "pb-[92px]"

export default function Step3() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex h-full min-h-0"
    >
      <div
        className={`flex min-h-0 flex-[60%] flex-col gap-12 overflow-y-auto border-r border-border px-[6%] py-12 ${scrollUnderFooterClass}`}
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
        <GenreSelect />
        <TagSelect />
      </div>
      <div
        className={`min-h-0 flex-[40%] overflow-y-auto p-8 ${scrollUnderFooterClass}`}
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
        <Recommendations />
      </div>
    </motion.div>
  )
}
