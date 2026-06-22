import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { NormalizedPreview } from "../taste-matrix"
import RecommendationDetailContent from "./RecommendationDetailContent"

type Props = {
  preview?: NormalizedPreview
}

export default function RecommendationDialogCard({ preview }: Props) {
  if (!preview) {
    return null
  }

  return (
    <DialogContent
      showCloseButton={false}
      className="h-[60vh] w-full p-0 sm:max-w-xl"
    >
      <RecommendationDetailContent
        preview={preview}
        closeButton={
          <DialogClose asChild>
            <button
              type="button"
              className="absolute top-4 right-4 z-10 rounded-sm p-1 text-white/90 transition-colors hover:bg-black/40 hover:text-white"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </DialogClose>
        }
        title={
          <DialogTitle>
            {preview.titleEnglish ?? preview.titleRomaji}
          </DialogTitle>
        }
        description={
          <DialogDescription>
            {preview.genreNames.join(" \u2022 ")}
          </DialogDescription>
        }
      />
    </DialogContent>
  )
}
