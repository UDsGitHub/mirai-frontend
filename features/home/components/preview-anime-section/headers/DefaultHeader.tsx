import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'

type Props = {
    rating: number
}

export default function DefaultHeader({rating}: Props) {
  return (
    <div className="absolute top-2 flex w-full items-center justify-between px-2">
      <Badge className="bg-black/50">
        <Star className="size-4 fill-yellow-300 stroke-none" />
        <span className="text-xs font-bold text-accent-foreground">
          {rating}
        </span>
      </Badge>
    </div>
  )
}