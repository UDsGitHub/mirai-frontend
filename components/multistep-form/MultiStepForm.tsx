"use client"

import { useState } from "react"
import { FormStep, LayoutComponentType } from "./types"
import { FormProvider, useForm } from "react-hook-form"
import { combinedSchema, CombinedSchemaType } from "./validators"
import { zodResolver } from "@hookform/resolvers/zod"

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
  const nonUniqueSteps =
    steps.map((step) => step.title).length !==
    new Set(steps.map((step) => step.title)).size
  if (nonUniqueSteps) {
    throw new Error("Steps must have unique titles")
  }

  const [currentStep, setCurrentStep] = useState(0)
  const currentStepData = steps[currentStep]
  const methods = useForm<CombinedSchemaType>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {},
  })

  const handleNext = async () => {
    const isValid = await methods.trigger(currentStepData.fields)
    if (!isValid) {
      return
    }

    if (currentStepData.onBeforeNext) {
      await currentStepData.onBeforeNext(methods.getValues())
    }

    const currentStepValues = methods.getValues(currentStepData.fields)
    const formValues = Object.fromEntries(
      currentStepData.fields.map((field, index) => [
        field,
        currentStepValues[index] || "",
      ])
    )

    if (currentStepData.validationSchema) {
      const validationResult =
        currentStepData.validationSchema.safeParse(formValues)

      if (!validationResult.success) {
        validationResult.error.issues.forEach((err) => {
          methods.setError(err.path.join(".") as keyof CombinedSchemaType, {
            type: "manual",
            message: err.message,
          })
        })
        return
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep === 0) {
      return
    }
    setCurrentStep(currentStep - 1)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onComplete)} className="h-full">
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
  )
}
