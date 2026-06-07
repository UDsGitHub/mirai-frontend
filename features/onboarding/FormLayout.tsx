"use client"

import { LayoutComponentProps } from "@/components/multistep-form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, Eye } from "lucide-react"

export default function FormLayout({
  children,
  currentStepIndex,
  currentStep,
  totalSteps,
  handleNext,
  handlePrevious,
}: LayoutComponentProps) {
  return (
    <div className="flex h-full flex-col">
      <nav className="relative flex h-22 items-center justify-between">
        <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-2">
          <div className="flex items-center justify-center rounded-lg bg-linear-to-br from-cyan-500/15 to-purple-500/15 p-2">
            <Eye className="size-5" />
          </div>
          <span className="text-lg font-semibold">Mirai</span>
        </div>
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-default flex-col justify-center gap-2">
          <span className="font-inter text-sm text-purple-500 uppercase">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, index) =>
              index <= currentStepIndex ? (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 rounded-full bg-linear-to-r from-cyan-500 to-purple-500",
                    index === currentStepIndex ? "flex-2" : "flex-1"
                  )}
                ></div>
              ) : (
                <div
                  key={index}
                  className="h-1.5 flex-1 rounded-full bg-muted-foreground/25"
                ></div>
              )
            )}
          </div>
        </div>
        {currentStep.canSkip && (
          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <Button variant="link" className="p-0">
              Skip
            </Button>
          </div>
        )}
      </nav>
      <div className="flex-1">{children}</div>
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
            type={currentStepIndex === totalSteps - 1 ? "submit" : "button"}
            onClick={handleNext}
          >
            <span>
              {currentStepIndex === totalSteps - 1 ? "Complete" : "Next Step"}
            </span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
