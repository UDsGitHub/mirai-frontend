"use client"

import { LayoutComponentProps } from "@/components/multistep-form"
import Footer from "./Footer"
import Header, { HEADER_HEIGHT_CLASS } from "./Header"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { useMouse } from "@/hooks"

const cursorGlowSpring = {
  stiffness: 90,
  damping: 32,
  mass: 1.4,
}

export default function FormLayout({
  children,
  currentStepIndex,
  currentStep,
  totalSteps,
  handleNext,
  handlePrevious,
}: LayoutComponentProps) {
  const mouse = useMouse(cursorGlowSpring)

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
        <motion.div
          className={cn(
            "pointer-events-none fixed top-0 left-0 z-20 h-[400px] w-[400px] origin-center -translate-x-1/2 -translate-y-1/2 rounded-full",
            "bg-cyan-500 opacity-5 mix-blend-color blur-3xl"
          )}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: mouse.hasMoved ? 1 : 0, scale: 1 }}
          style={{
            x: mouse.x,
            y: mouse.y,
            opacity: mouse.hasMoved ? 1 : 0,
            pointerEvents: "none",
          }}
        />
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
