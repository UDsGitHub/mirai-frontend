import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { NormalizedPreview } from "./taste-matrix"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import DOMPurify from "dompurify"
import Image from "next/image"

type Props = {
  preview?: NormalizedPreview
}

export default function RecommendationDialogCard({ preview }: Props) {
  if (!preview) {
    return null
  }

  return (
    <DialogContent showCloseButton={false} className="w-full p-0 sm:max-w-xl h-[60vh]">
      <Card className="py-0">
        <div className="relative h-[250px] shrink-0">
          <Image
            src={preview.bannerUrl ?? ""}
            alt="Banner Image"
            className="h-full w-full object-cover object-center"
          />
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
          <DialogClose asChild>
            <button
              type="button"
              className="absolute top-4 right-4 z-10 rounded-sm p-1 text-white/90 transition-colors hover:bg-black/40 hover:text-white"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </DialogClose>
        </div>
        <CardHeader>
          <DialogTitle>
            {preview.titleEnglish ?? preview.titleRomaji}
          </DialogTitle>
          <DialogDescription>
            {preview.genreNames.join(" \u2022 ")}
          </DialogDescription>
        </CardHeader>
        <CardContent className="no-scrollbar max-h-[50vh] overflow-y-auto">
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(preview.synopsis ?? "", { ALLOWED_TAGS: ["a"] }),
            }}
          />
        </CardContent>
      </Card>
    </DialogContent>
  )
}
