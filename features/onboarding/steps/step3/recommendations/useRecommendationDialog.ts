import { useState } from "react"
import { NormalizedPreview } from "./taste-matrix"

export const useRecommendationDialog = () => {
    const [selectedPreview, setSelectedPreview] = useState<NormalizedPreview | undefined>(undefined)

    const handleOpen = (preview: NormalizedPreview) => {
        setSelectedPreview(preview)
    }

    const handleClose = () => {
        setSelectedPreview(undefined)
    }

    return {
        selectedPreview,
        handleOpen,
        handleClose,
    }
}