"use client"

import { FormStep, LayoutComponentType } from "./types"
import { FormProvider } from "react-hook-form"
import { CombinedSchemaType } from "./validators"
import { MultiStepFormContext } from "./MultiStepFormContext"
import { useMultiStepFormState } from "./useMultiStepFormState"

type Props = {
  LayoutComponent: LayoutComponentType
  steps: FormStep[]
  onComplete: (data: CombinedSchemaType) => Promise<void>
}

export default function MultiStepForm({
  LayoutComponent,
  steps,
  onComplete,
}: Props) {
  const {
    hasAttemptedStep,
    currentStep,
    currentStepData,
    handleNext,
    handlePrevious,
    methods,
  } = useMultiStepFormState(steps, onComplete)

  return (
    <MultiStepFormContext.Provider value={{ hasAttemptedStep }}>
      <FormProvider {...methods}>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex h-full min-h-0 flex-col"
        >
          <LayoutComponent
            currentStepIndex={currentStep}
            currentStep={currentStepData}
            totalSteps={steps.length}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          >
            {currentStepData.component}
          </LayoutComponent>
        </form>
      </FormProvider>
    </MultiStepFormContext.Provider>
  )
}
