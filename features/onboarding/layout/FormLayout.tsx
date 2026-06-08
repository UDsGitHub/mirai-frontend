"use client"

import { LayoutComponentProps } from "@/components/multistep-form"
import Footer from "./Footer"
import Header from "./Header"

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
      <Header
        currentStepIndex={currentStepIndex}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />
      <div className="flex-1">{children}</div>
      <Footer
        currentStepIndex={currentStepIndex}
        totalSteps={totalSteps}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </div>
  )
}
