import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const FOOTER_HEIGHT_CLASS = "h-[92px]"

type Props = {
  currentStepIndex: number
  totalSteps: number
  handlePrevious: () => void
  handleNext: () => void
}

export default function Footer({
  currentStepIndex,
  totalSteps,
  handlePrevious,
  handleNext,
}: Props) {
  const isLastStep = currentStepIndex === totalSteps - 1
  const isMobile = useIsMobile();

  return (
    <footer className="pointer-events-none fixed right-0 bottom-0 left-0 z-20 flex h-[92px] bg-linear-to-t from-background from-40% to-transparent">
      <div className="pointer-events-auto absolute top-1/2 left-4 -translate-y-1/2">
        <Button
          variant="outline"
          className="p-5"
          type="button"
          size={isMobile ? "icon" : "default"}
          onClick={handlePrevious}
        >
          <ArrowLeft className="size-4" />
          {!isMobile && <span>Back</span>}
        </Button>
      </div>
      <div className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Button
          variant="primary"
          className="p-5"
          type="button"
          onClick={handleNext}
        >
          <span>{isLastStep ? "Complete" : "Next Step"}</span>
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </footer>
  )
}
