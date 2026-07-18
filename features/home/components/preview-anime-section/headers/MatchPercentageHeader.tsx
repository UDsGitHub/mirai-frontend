import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

type Props = {
  matchPercentage: number
  rating: number
}

export default function MatchPecentageHeader({ matchPercentage, rating }: Props) {
  return (
    <div className="absolute top-2 flex w-full items-center justify-between px-2">
      <Badge
        variant={"outline"}
        className={"border-teal-200 bg-black text-teal-200"}
      >
        {matchPercentage}% match
      </Badge>
      <Badge className="bg-black/50">
        <Star className="size-4 fill-yellow-300 stroke-none" />
        <span className="text-xs font-bold text-primary-foreground dark:text-accent-foreground">
          {rating}
        </span>
      </Badge>
    </div>
  )
}
