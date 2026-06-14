"use client"

import { LayoutComponentProps } from "@/components/multistep-form"
import Footer from "./Footer"
import Header, { HEADER_HEIGHT_CLASS } from "./Header"
import { cn } from "@/lib/utils"

export default function FormLayout({
  children,
  currentStepIndex,
  currentStep,
  totalSteps,
  handleNext,
  handlePrevious,
}: LayoutComponentProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <Header
        currentStepIndex={currentStepIndex}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />
      <div className={cn(HEADER_HEIGHT_CLASS, "shrink-0")} aria-hidden />
      <div className="relative min-h-0 flex-1">
        <div className="relative h-full min-h-0">{children}</div>
      </div>
      <Footer
        currentStepIndex={currentStepIndex}
        totalSteps={totalSteps}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </div>
  )
}
