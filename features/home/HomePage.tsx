"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"
import AskMiraiInput from "./components/ask-mirai-input/AskMiraiInput"
import FeaturedPickCard from "./components/feature-pick-card/FeaturedPickCard"
import WatchlistSuggestionSection from "./components/watchlist-preview/WatchlistSuggestionSection"

export default function HomePage() {
  const { signOut } = useAuth()

  return (
    <div className="min-h-svh p-4 sm:p-8">
      <div className="flex flex-col gap-12">
        <AskMiraiInput />
        <FeaturedPickCard />
        <WatchlistSuggestionSection />
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
