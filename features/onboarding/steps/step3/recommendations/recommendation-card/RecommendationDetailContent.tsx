import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DrawerHeader } from "@/components/ui/drawer"
import DOMPurify from "dompurify"
import Image from "next/image"
import type { ReactNode } from "react"
import { NormalizedPreview } from "../taste-matrix"
import { useIsMobile } from "@/hooks"
import { cn } from "@/lib/utils"

type Props = {
  preview: NormalizedPreview
  closeButton: ReactNode
  title: ReactNode
  description: ReactNode
  variant?: "dialog" | "drawer"
}

export default function RecommendationDetailContent({
  preview,
  closeButton,
  title,
  description,
  variant = "dialog",
}: Props) {
  const isMobile = useIsMobile()

  const banner = (
    <div
      className={cn(
        "relative h-[250px] shrink-0 overflow-hidden bg-muted",
        isMobile ? "rounded-md" : "rounded-none"
      )}
    >
      {preview.bannerUrl ? (
        <Image
          src={preview.bannerUrl}
          alt=""
          fill
          className={"object-cover object-center"}
          sizes={
            variant === "drawer" ? "100vw" : "(max-width: 640px) 100vw, 576px"
          }
        />
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/80 via-black/30 to-transparent"
        aria-hidden
      />
      <Badge
        variant="outline"
        className="absolute top-4 left-4 z-10 rounded-sm border border-cyan-500 bg-cyan-950/90 text-cyan-500"
      >
        {Math.round(preview.matchPercentage)}% Match
      </Badge>
      {!isMobile && closeButton}
    </div>
  )

  const synopsis = (
    <p
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(preview.synopsis ?? "", {
          ALLOWED_TAGS: ["a"],
        }),
      }}
    />
  )

  if (variant === "drawer") {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-4">
        {banner}
        <DrawerHeader className="shrink-0 px-2">{title}{description}</DrawerHeader>
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-2"
          data-vaul-no-drag
        >
          {synopsis}
        </div>
      </div>
    )
  }

  return (
    <Card className="gap-0 py-0">
      {banner}
      <CardHeader>
        {title}
        {description}
      </CardHeader>
      <CardContent className="no-scrollbar max-h-[50vh] overflow-y-auto">
        {synopsis}
      </CardContent>
    </Card>
  )
}
