import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { WatchlistSuggestionType } from "./types"
import WatchlistSuggestionCard from "./WatchlistSuggestionCard"
import { useScrollContainer } from "react-indiana-drag-scroll"

const exampleWatchlistItems: WatchlistSuggestionType[] = [
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_7ee6e5dd7a_e13122c931f7db50.png",
    title: "Vinland Saga",
    tags: ["Action", "Historical"],
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_206c92433a_f70a2f47a30fc977.png",
    title: "Made in Abyss",
    tags: ["Adventure", "Dark Fantasy"],
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_a5eaa8a9b6_2f36d59eb0cc5d6d.png",
    title: "Mushishi",
    tags: ["Supernatural", "Slice of Life"],
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_6ec94ca90f_668195b49b789185.png",
    title: "Kaguya-sama",
    tags: ["Romance", "Comedy"],
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_39e58ad651_f55b3d81cf227a2e.png",
    title: "Berserk (1997)",
    tags: ["Action", "Historical"],
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c948ae9b1b_1015c9e7023ab7e2.png",
    title: "Planetes",
    tags: ["Sci-Fi", "Drama"],
  },
]

export default function WatchlistSuggestionSection() {
  const { ref: scrollRef } = useScrollContainer()

  return (
    <div className="flex flex-col sm:gap-2">
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="text-basesm:text-lg font-bold">
            Continue Building Your Watchlist
          </span>
        </div>
        <Button variant={"link"} className="px-0 text-teal-200 sm:px-2">
          <span>View All</span>
          <ArrowRight />
        </Button>
      </div>
      <div
        className="no-scrollbar flex w-full items-center gap-4 overflow-x-auto py-4"
        ref={scrollRef}
      >
        {exampleWatchlistItems.map((item) => (
          <WatchlistSuggestionCard key={item.title} previewInfo={item} />
        ))}
      </div>
    </div>
  )
}
