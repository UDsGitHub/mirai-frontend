"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"
import AskMiraiInput from "./components/ask-mirai-input/AskMiraiInput"
import FeaturedPickCard from "./components/feature-pick-card/FeaturedPickCard"
import { PreviewAnimeSection } from "./components/preview-anime-section"
import { Flame, Play, WandSparkles } from "lucide-react"
import { AnimePreviewCardType } from "./components/preview-anime-section/types"
import { Badge } from "@/components/ui/badge"
import { motion } from "motion/react"

const exampleWatchlistItems: AnimePreviewCardType[] = [
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_7ee6e5dd7a_e13122c931f7db50.png",
    title: "Vinland Saga",
    tags: ["Action", "Historical"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_206c92433a_f70a2f47a30fc977.png",
    title: "Made in Abyss",
    tags: ["Adventure", "Dark Fantasy"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_a5eaa8a9b6_2f36d59eb0cc5d6d.png",
    title: "Mushishi",
    tags: ["Supernatural", "Slice of Life"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_6ec94ca90f_668195b49b789185.png",
    title: "Kaguya-sama",
    tags: ["Romance", "Comedy"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_39e58ad651_f55b3d81cf227a2e.png",
    title: "Berserk (1997)",
    tags: ["Action", "Historical"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c948ae9b1b_1015c9e7023ab7e2.png",
    title: "Planetes",
    tags: ["Sci-Fi", "Drama"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
  },
]

const exampleTrendingItems: AnimePreviewCardType[] = [
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_efa06df37d_dc3b8c3f43ad2dcf.png",
    title: "Delicious in Dungeon",
    tags: ["Adventure", "Fantasy", "Comedy"],
    rating: 9.1,
    ranking: 1,
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_37872c02f9_adc2efa47f104896.png",
    title: "Solo Leveling",
    tags: ["Action", "Fantasy"],
    rating: 8.5,
    ranking: 2,
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_60fcab8211_1641b04ef69d334b.png",
    title: "Frieren Season 2",
    tags: ["Fantasy", "Adventure"],
    rating: 9.4,
    ranking: 3,
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_9bb8078702_2ecf7b3473abb85c.png",
    title: "Kaiju No. 8",
    tags: ["Action", "Sci-Fi", "Monster"],
    rating: 8.2,
    ranking: 4,
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_a5eaa8a9b6_2f36d59eb0cc5d6d.png",
    title: "Mushishi",
    tags: ["Supernatural", "Slice of Life"],
    rating: 9.1,
    ranking: 5,
  },
  {
    coverImage:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_6ec94ca90f_668195b49b789185.png",
    title: "Kaguya-sama",
    tags: ["Romance", "Comedy"],
    rating: 8.2,
    ranking: 6,
  },
]

export default function HomePage() {
  const { signOut } = useAuth()

  return (
    <div className="min-h-svh p-4 sm:p-8">
      <div className="flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0.95 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 300, ease: "easeInOut" }}
          className="relative"
        >
          <AskMiraiInput />
        </motion.div>
        <div>
          <FeaturedPickCard />
        </div>
        <PreviewAnimeSection
          previewList={exampleWatchlistItems}
          sectionTitle={
            <div className="flex items-center gap-2">
              <Play strokeWidth={3} className="stroke-blue-500" />
              <span className="text-base font-bold sm:text-lg">
                Continue Building Your Watchlist
              </span>
            </div>
          }
        />
        <PreviewAnimeSection
          previewList={exampleTrendingItems}
          sectionTitle={
            <div className="flex items-center gap-2">
              <Flame strokeWidth={3} className="stroke-rose-500" />
              <span className="text-base font-bold sm:text-lg">
                Trending This Season
              </span>
            </div>
          }
        />
        <PreviewAnimeSection
          previewList={exampleTrendingItems}
          sectionTitle={
            <div className="flex items-center gap-2">
              <WandSparkles strokeWidth={3} className="stroke-teal-500" />
              <span className="text-base font-bold sm:text-lg">
                Because You Loved
              </span>
              <Badge
                variant={"outline"}
                className="border-teal-200 bg-teal-200/25 px-3 py-3 font-semibold text-teal-200"
              >
                Vinland Saga
              </Badge>
            </div>
          }
        />
      </div>
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
