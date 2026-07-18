import { Badge } from "@/components/ui/badge"
import { RANDOM_COLORS } from "@/constants/style"
import { Star, TrendingUp } from "lucide-react"

type Props = {
  ranking: number
  rating: number
}

export default function RankingHeader({ ranking, rating }: Props) {
  const rankingBackgroundColor = ranking
    ? RANDOM_COLORS.background.default[
        (ranking - 1) % RANDOM_COLORS.background.default.length
      ]
    : ""

  return (
    <div className="absolute top-2 flex w-full items-center justify-between px-2">
      <Badge className="bg-black/50">
        <Star className="size-4 fill-yellow-300 stroke-none" />
        <span className="text-xs font-bold text-primary-foreground dark:text-accent-foreground">
          {rating}
        </span>
      </Badge>
      <Badge className={rankingBackgroundColor}>
        <TrendingUp className="text-accent-foreground dark:text-primary-foreground" />
        <span className={"text-xs font-bold text-accent-foreground dark:text-primary-foreground"}>#{ranking}</span>
      </Badge>
    </div>
  )
}
