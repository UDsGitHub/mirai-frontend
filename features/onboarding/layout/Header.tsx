import { FormStep } from "@/components/multistep-form"
import { Button } from "@/components/ui/button"
import StepProgress from "./StepProgress"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks"

export const HEADER_HEIGHT_CLASS = "h-[88px]"

type Props = {
  currentStepIndex: number
  currentStep: FormStep
  totalSteps: number
}

export default function Header({
  currentStepIndex,
  currentStep,
  totalSteps,
}: Props) {
  const isMobile = useIsMobile()

  return (
    <nav
      className={cn(
        HEADER_HEIGHT_CLASS,
        "fixed top-0 right-0 left-0 z-20 flex items-center justify-between bg-background",
      )}
    >
      <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-2">
        {!isMobile && <span className="text-2xl font-medium font-kihim tracking-wider">MIRAI</span>}
      </div>
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-default flex-col items-center justify-center gap-2">
        <span className="font-semibold text-purple-500 uppercase">
          Step {currentStepIndex + 1} of {totalSteps}
        </span>
        <StepProgress
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
        />
      </div>
      {currentStep.canSkip && (
        <div className="absolute top-1/2 right-4 -translate-y-1/2">
          <Button variant="link" className="p-0">
            Skip
          </Button>
        </div>
      )}
    </nav>
  )
}
