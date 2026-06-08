"use client"

import { Skeleton } from "../ui/skeleton"

type Props = {
  count?: number
}

export default function ChipLoader({ count = 16 }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="h-8 w-32 rounded-full" />
      ))}
    </div>
  )
}
