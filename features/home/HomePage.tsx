"use client"

import AskMiraiInput from "./components/ask-mirai-input/AskMiraiInput"
import FeaturedPickCard from "./components/feature-pick-card/FeaturedPickCard"
import { PreviewAnimeSection } from "./components/preview-anime-section"
import { Flame, Play, VenetianMask, WandSparkles } from "lucide-react"
import { AnimePreviewCardType } from "./components/preview-anime-section/types"
import { Badge } from "@/components/ui/badge"
import { motion } from "motion/react"
import RankingHeader from "./components/preview-anime-section/headers/RankingHeader"
import MatchPercentageHeader from "./components/preview-anime-section/headers/MatchPercentageHeader"
import FriendsActivitySection from "./components/friends-activity-section/FriendsActivitySection"

const today = new Date()

const exampleWatchlistItems: AnimePreviewCardType[] = [
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_7ee6e5dd7a_e13122c931f7db50.png",
    titleEnglish: "Vinland Saga",
    tagNames: ["Action", "Historical"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_206c92433a_f70a2f47a30fc977.png",
    titleEnglish: "Made in Abyss",
    tagNames: ["Adventure", "Dark Fantasy"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_a5eaa8a9b6_2f36d59eb0cc5d6d.png",
    titleEnglish: "Mushishi",
    tagNames: ["Supernatural", "Slice of Life"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_6ec94ca90f_668195b49b789185.png",
    titleEnglish: "Kaguya-sama",
    tagNames: ["Romance", "Comedy"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_39e58ad651_f55b3d81cf227a2e.png",
    titleEnglish: "Berserk (1997)",
    tagNames: ["Action", "Historical"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c948ae9b1b_1015c9e7023ab7e2.png",
    titleEnglish: "Planetes",
    tagNames: ["Sci-Fi", "Drama"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_efa06df37d_dc3b8c3f43ad2dcf.png",
    titleEnglish: "Odd Taxi",
    tagNames: ["Mystery", "Drama"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_37872c02f9_adc2efa47f104896.png",
    titleEnglish: "Monster",
    tagNames: ["Thriller", "Mystery"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_60fcab8211_1641b04ef69d334b.png",
    titleEnglish: "Ping Pong the Animation",
    tagNames: ["Sports", "Drama"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_9bb8078702_2ecf7b3473abb85c.png",
    titleEnglish: "Keep Your Hands Off Eizouken!",
    tagNames: ["Comedy", "Slice of Life"],
    rating: Number((Math.random() * (10 - 6) + 6).toFixed(1)),
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
]

const exampleTrendingItems: AnimePreviewCardType[] = [
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_efa06df37d_dc3b8c3f43ad2dcf.png",
    titleEnglish: "Delicious in Dungeon",
    tagNames: ["Adventure", "Fantasy", "Comedy"],
    rating: 9.1,
    ranking: 1,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_37872c02f9_adc2efa47f104896.png",
    titleEnglish: "Solo Leveling",
    tagNames: ["Action", "Fantasy"],
    rating: 8.5,
    ranking: 2,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_60fcab8211_1641b04ef69d334b.png",
    titleEnglish: "Frieren Season 2",
    tagNames: ["Fantasy", "Adventure"],
    rating: 9.4,
    ranking: 3,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_9bb8078702_2ecf7b3473abb85c.png",
    titleEnglish: "Kaiju No. 8",
    tagNames: ["Action", "Sci-Fi", "Monster"],
    rating: 8.2,
    ranking: 4,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_a5eaa8a9b6_2f36d59eb0cc5d6d.png",
    titleEnglish: "Mushishi",
    tagNames: ["Supernatural", "Slice of Life"],
    rating: 9.1,
    ranking: 5,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_6ec94ca90f_668195b49b789185.png",
    titleEnglish: "Kaguya-sama",
    tagNames: ["Romance", "Comedy"],
    rating: 8.2,
    ranking: 6,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_7ee6e5dd7a_e13122c931f7db50.png",
    titleEnglish: "Vinland Saga Season 2",
    tagNames: ["Action", "Drama"],
    rating: 9.0,
    ranking: 7,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_206c92433a_f70a2f47a30fc977.png",
    titleEnglish: "Dungeon Meshi",
    tagNames: ["Adventure", "Comedy"],
    rating: 8.7,
    ranking: 8,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c948ae9b1b_1015c9e7023ab7e2.png",
    titleEnglish: "Orb: On the Movements of the Earth",
    tagNames: ["Historical", "Drama"],
    rating: 8.9,
    ranking: 9,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_39e58ad651_f55b3d81cf227a2e.png",
    titleEnglish: "The Apothecary Diaries",
    tagNames: ["Mystery", "Historical"],
    rating: 8.8,
    ranking: 10,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
]

const exampleBecauseYouLovedItems: AnimePreviewCardType[] = [
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_f5bf6f3c0e_a897d2bf234dec29.png",
    titleEnglish: "Kingdom",
    tagNames: ["Historical", "Action"],
    rating: 9.1,
    matchPercentage: 91,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_a2250eca05_c44eb1124c649d7d.png",
    titleEnglish: "Dororo",
    tagNames: ["Historical", "Dark Fantasy"],
    rating: 8.5,
    matchPercentage: 85,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_e590a3016a_7071493aa7ef281d.png",
    titleEnglish: "Vagabond",
    tagNames: ["Samurai", "Drama"],
    rating: 9.4,
    matchPercentage: 94,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_b5de9cb26c_74be8410c2c6d951.png",
    titleEnglish: "Golden Kamuy",
    tagNames: ["Historical", "Adventure"],
    rating: 8.2,
    matchPercentage: 82,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_57f15ebb44_ab3974e668f51198.png",
    titleEnglish: "Shigurui",
    tagNames: ["Samurai", "Psychological"],
    rating: 9.1,
    matchPercentage: 91,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_39e58ad651_f55b3d81cf227a2e.png",
    titleEnglish: "Berserk (1997)",
    tagNames: ["Action", "Historical"],
    rating: 9.1,
    matchPercentage: 91,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_c948ae9b1b_1015c9e7023ab7e2.png",
    titleEnglish: "Planetes",
    tagNames: ["Sci-Fi", "Drama"],
    rating: 7.2,
    matchPercentage: 82,
    ratingCount: Math.round(Math.random() * (10 - 6) + 6),
    synopsis: "",
    releaseDate: today,
  },
]

const exampleHiddenGemItems: AnimePreviewCardType[] = [
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_ac8e6c3d7c_120e8496d9ec42a5.png",
    titleEnglish: "Haibane Renmei",
    tagNames: ["Slice of Life", "Mystery", "Philosophical"],
    rating: 8.1,
    matchPercentage: 91,
    ratingCount: Math.round(Math.random() * (10000 - 600) + 6),
    synopsis:
      "A quietly haunting gem about winged beings living on the edge of a walled town. Profound and beautifully understated.",
    releaseDate: new Date("01/01/2002"),
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_41dabf40ec_c394a56c3f6c94e6.png",
    titleEnglish: "Dororo",
    tagNames: ["Sci-Fi", "Philosophical", "Dystopia"],
    rating: 8.0,
    matchPercentage: 85,
    ratingCount: Math.round(Math.random() * (10000 - 600) + 6),
    synopsis:
      "One of the most boldly nihilistic anime ever made. A brutal, artful descent into a dying underground city.",
    releaseDate: new Date("01/01/2003"),
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_7b371cbaa3_f0cb71528a5826e9.png",
    titleEnglish: "Showa Genroku Rakugo",
    tagNames: ["Drama", "Historical", "Art"],
    rating: 8.7,
    matchPercentage: 94,
    ratingCount: Math.round(Math.random() * (10000 - 600) + 6),
    synopsis:
      "A masterwork about rivalry, legacy, and traditional storytelling. Criminally underrated character study.",
    releaseDate: new Date("01/01/2016"),
  },
  {
    coverUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_d7f7617b81_29ef736968bc298e.png",
    titleEnglish: "Kino's Journey",
    tagNames: ["Adventure", "Philosophical", "Drama"],
    rating: 8.3,
    matchPercentage: 82,
    ratingCount: Math.round(Math.random() * (10000 - 600) + 6),
    synopsis:
      "An episodic philosophical odyssey through strange lands. Every episode is a moral thought experiment.",
    releaseDate: new Date("01/01/2003"),
  },
]

export default function HomePage() {
  return (
    <div className="mx-auto min-h-svh w-full max-w-[1920px] p-4 sm:p-8 3xl:px-12">
      <div className="flex flex-col gap-12 3xl:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.36, ease: [0.25, 0.1, 0.4, 1.2] }}
          className="relative"
        >
          <AskMiraiInput />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.36,
            ease: [0.25, 0.1, 0.4, 1.2],
            delay: 0.1,
          }}
        >
          <FeaturedPickCard />
        </motion.div>
        <PreviewAnimeSection
          previewList={exampleWatchlistItems}
          sectionTitle={
            <div className="flex items-center gap-2">
              <Play strokeWidth={3} className="stroke-blue-500" />
              <span className="font-zalando text-base font-bold 3xl:text-xl">
                Continue Building Your Watchlist
              </span>
            </div>
          }
          animationDelay={0.2}
        />
        <PreviewAnimeSection
          previewList={exampleTrendingItems}
          sectionTitle={
            <div className="flex items-center gap-2">
              <Flame strokeWidth={3} className="stroke-rose-500" />
              <span className="font-zalando text-base font-bold 3xl:text-xl">
                Trending This Season
              </span>
            </div>
          }
          renderCardHeader={(item) => (
            <RankingHeader ranking={item.ranking!} rating={item.rating} />
          )}
        />
        <PreviewAnimeSection
          previewList={exampleBecauseYouLovedItems}
          sectionTitle={
            <div className="flex items-center gap-2">
              <WandSparkles strokeWidth={3} className="stroke-teal-500" />
              <span className="font-zalando text-base font-bold 3xl:text-xl">
                Because You Loved
              </span>
              <Badge
                variant={"outline"}
                className="border-teal-500 dark:border-teal-200 bg-teal-500/25 dark:bg-teal-200/25 px-3 py-3 font-semibold text-teal-500 dark:text-teal-200"
              >
                Vinland Saga
              </Badge>
            </div>
          }
          renderCardHeader={(item) => (
            <MatchPercentageHeader
              matchPercentage={item.matchPercentage!}
              rating={item.rating}
            />
          )}
        />
        <PreviewAnimeSection
          previewList={exampleHiddenGemItems}
          sectionTitle={
            <div className="flex items-center gap-2">
              <VenetianMask strokeWidth={3} className="stroke-violet-500" />
              <span className="font-zalando text-base font-bold 3xl:text-xl">
                Hidden Gems
              </span>
            </div>
          }
          useGrid
        />
        <FriendsActivitySection />
      </div>
    </div>
  )
}
