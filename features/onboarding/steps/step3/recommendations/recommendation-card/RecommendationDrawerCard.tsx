import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer"
import { X } from "lucide-react"
import { NormalizedPreview } from "../taste-matrix"
import RecommendationDetailContent from "./RecommendationDetailContent"

type Props = {
  preview?: NormalizedPreview
}

export default function RecommendationDrawerCard({ preview }: Props) {
  if (!preview) {
    return null
  }

  return (
    <DrawerContent className="flex max-h-[85vh] flex-col overflow-hidden px-4 pb-6">
      <RecommendationDetailContent
        variant="drawer"
        preview={preview}
        closeButton={
          <DrawerClose asChild>
            <button
              type="button"
              className="absolute top-4 right-4 z-10 rounded-sm p-1 text-white/90 transition-colors hover:bg-black/40 hover:text-white"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </DrawerClose>
        }
        title={
          <DrawerTitle>
            {preview.titleEnglish ?? preview.titleRomaji}
          </DrawerTitle>
        }
        description={
          <DrawerDescription>
            {preview.genreNames.join(" \u2022 ")}
          </DrawerDescription>
        }
      />
    </DrawerContent>
  )
}
