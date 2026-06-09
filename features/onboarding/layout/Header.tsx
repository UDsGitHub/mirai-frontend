import { FormStep } from "@/components/multistep-form"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import StepProgress from "./StepProgress"
import { cn } from "@/lib/utils"

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
  return (
    <nav className={cn(HEADER_HEIGHT_CLASS, "bg-background fixed top-0 right-0 left-0 z-20 flex items-center justify-between border-b border-border")}>
      <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-2">
        <div className="flex items-center justify-center rounded-lg bg-linear-to-br from-cyan-500/15 to-purple-500/15 p-2">
          <Eye className="size-5 text-cyan-200" />
        </div>
        <span className="text-lg font-semibold">Mirai</span>
      </div>
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-default flex-col justify-center items-center gap-2">
        <span className="font-inter text-sm text-purple-500 uppercase">
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
