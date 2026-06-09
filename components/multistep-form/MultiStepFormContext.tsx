"use client"

import { createContext, useContext } from "react"

type MultiStepFormContextValue = {
  hasAttemptedStep: boolean
}

export const MultiStepFormContext =
  createContext<MultiStepFormContextValue | null>(null)

export function useMultiStepForm() {
  const context = useContext(MultiStepFormContext)
  if (!context) {
    throw new Error("useMultiStepForm must be used within MultiStepForm")
  }
  return context
}
