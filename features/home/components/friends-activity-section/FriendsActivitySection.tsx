import { useScrollContainer } from "react-indiana-drag-scroll"
import { FriendsActivityType } from "./types"
import { ActivityVerb } from "@/constants/enums"
import FriendsActivityCard from "./card/FriendsActivityCard"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const exampleFriendsActivity: FriendsActivityType[] = [
  {
    id: "1",
    userInfo: {
      id: "1",
      avatarUrl:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      displayName: "Yuki Tanaka",
    },
    activityVerb: ActivityVerb.ADDED_TO_LIST,
    metadata: {
      animePreview: {
        titleEnglish: "Land of the Lustrous",
        coverUrl:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_fbab7b0d53_5da5d6e4f0d3bea6.png",
        tagNames: ["Sci-Fi", "Fantasy"],
      },
    },
    createdAt: new Date(),
  },
  {
    id: "2",
    userInfo: {
      id: "2",
      avatarUrl:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      displayName: "Marcus Lee",
    },
    activityVerb: ActivityVerb.RATED,
    metadata: {
      animePreview: {
        titleEnglish: "Steins;Gate",
        coverUrl:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_f5ae6f192c_bd3bba556219e827.png",
        tagNames: ["Sci-Fi", "Thriller"],
      },
      rating: 9.4,
      content:
        "One of the greatest slow burns ever. The payoff is unforgettable.",
    },
    createdAt: new Date("07/15/2026"),
  },
  {
    id: "3",
    userInfo: {
      id: "3",
      avatarUrl:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      displayName: "Reyes Sofia",
    },
    activityVerb: ActivityVerb.COMPLETED,
    metadata: {
      animePreview: {
        titleEnglish: "Neon Genesis Evangelion",
        coverUrl:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_05c89345d6_f2feafee34a6616d.png",
        tagNames: ["Mecha", "Psychological"],
      },
    },
    createdAt: new Date("07/13/2026"),
  },
  {
    id: "4",
    userInfo: {
      id: "4",
      avatarUrl:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      displayName: "Lee Marcus",
    },
    activityVerb: ActivityVerb.SHARED_REC,
    metadata: {
      animePreview: {
        titleEnglish: "Neon Genesis Evangelion",
        coverUrl:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_05c89345d6_f2feafee34a6616d.png",
        tagNames: ["Mecha", "Psychological"],
        content:
          "One of the greatest slow burns ever. The payoff is unforgettable.",
      },
    },
    createdAt: new Date("07/13/2026"),
  },
  {
    id: "5",
    userInfo: {
      id: "5",
      avatarUrl:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      displayName: "Lee Stronnin",
    },
    activityVerb: ActivityVerb.STARTED_DISCUSSION,
    metadata: {
      title: "Is Loli Ok in Anime? Or am I trippin",
    },
    createdAt: new Date("07/13/2026"),
  },
  {
    id: "6",
    userInfo: {
      id: "6",
      avatarUrl:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      displayName: "Bee Crusma",
    },
    activityVerb: ActivityVerb.REPLIED_TO_DISCUSSION,
    metadata: {
      title: "Are there too many Harem animes in circulation?",
    },
    createdAt: new Date("07/13/2026"),
  },
]

export default function FriendsActivitySection() {
  const { ref: scrollRef } = useScrollContainer()
  return (
    <div className="flex flex-col sm:gap-2">
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <svg
            className="h-6 w-6 text-teal-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="text-base font-bold sm:text-lg">
            Friends Activity
          </span>
        </div>
        <Button variant={"link"} className="px-0 text-teal-200 sm:px-2">
          <span>View All</span>
          <ArrowRight />
        </Button>
      </div>
      <div
        className={
          "no-scrollbar flex w-full items-center gap-4 overflow-x-auto pt-2"
        }
        ref={scrollRef}
      >
        {exampleFriendsActivity.map((activity) => (
          <FriendsActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  )
}
