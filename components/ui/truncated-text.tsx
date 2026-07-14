import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { Button } from "./button"

type Props = {
  children: string
  characterLimit?: number
  onShowMore?: () => void
  className?: string
}

export default function TruncatedText({
  children,
  onShowMore,
  className,
  characterLimit = 200,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    if (isExpanded) {
      setIsExpanded(false)
      return
    }
    if (onShowMore) {
      onShowMore()
    } else {
      setIsExpanded(true)
    }
  }

  return (
    <div className="inline">
      <span className={cn(className)}>{isExpanded ? children : children.slice(0, characterLimit)}{children.length > characterLimit && !isExpanded && '...'}</span>
      <Button variant={"link"} onClick={toggleExpanded} className="text-xs px-0">
        {isExpanded ? "Show Less" : "Show More"}
      </Button>
    </div>
  )
}
