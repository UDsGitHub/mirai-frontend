import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

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

  return (
    <footer className="relative mt-auto flex h-23 items-center justify-between bg-linear-to-t from-background from-40% to-transparent">
      <div className="absolute top-1/2 left-4 -translate-y-1/2">
        <Button
          variant="outline"
          className="p-5"
          type="button"
          onClick={handlePrevious}
        >
          <ArrowLeft className="size-4" />
          <span>Back</span>
        </Button>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
