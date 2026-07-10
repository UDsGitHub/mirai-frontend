import { useState } from "react"
import {
  combinedSchema,
  CombinedSchemaInput,
  CombinedSchemaType,
} from "./validators"
import { useForm } from "react-hook-form"
import { FormStep } from "./types"

export const useMultiStepFormState = (
  steps: FormStep[],
  onComplete: (data: CombinedSchemaType) => Promise<void>
) => {
  const nonUniqueSteps =
    steps.map((step) => step.title).length !==
    new Set(steps.map((step) => step.title)).size
  if (nonUniqueSteps) {
    throw new Error("Steps must have unique titles")
  }

  const methods = useForm<CombinedSchemaInput, unknown, CombinedSchemaType>({
    defaultValues: {
      displayName: "",
      birthDate: "",
      genrePreferences: [],
      tagPreferences: [],
    },
  })
  const { clearErrors, getValues, setError } = methods

  const [currentStep, setCurrentStep] = useState(0)
  const [hasAttemptedStep, setHasAttemptedStep] = useState(false)
  const currentStepData = steps[currentStep]

  const resetErrorState = () => {
    setHasAttemptedStep(false)
    clearErrors()
  }

  const handleNext = async () => {
    if (currentStepData.onBeforeNext) {
      await currentStepData.onBeforeNext(getValues())
    }

    const values = getValues()
    const isLastStep = currentStep === steps.length - 1
    const dataToValidate = isLastStep
      ? values
      : Object.fromEntries(
          currentStepData.fields.map((field) => [field, values[field]])
        )
    const schema = isLastStep
      ? combinedSchema
      : currentStepData.validationSchema
    const validationResult = schema.safeParse(dataToValidate)

    if (!validationResult.success) {
      setHasAttemptedStep(true)
      clearErrors(isLastStep ? undefined : currentStepData.fields)
      validationResult.error.issues.forEach((err) => {
        setError(err.path.join(".") as keyof CombinedSchemaInput, {
          type: "manual",
          message: err.message,
        })
      })
      return
    }

    if (isLastStep) {
      resetErrorState()
      await onComplete(validationResult.data as CombinedSchemaType)
      return
    }

    resetErrorState()
    setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep === 0) {
      return
    }
    setCurrentStep(currentStep - 1)
    resetErrorState()
  }

  return {
    hasAttemptedStep,
    currentStep,
    currentStepData,
    handleNext,
    handlePrevious,
    methods,
  }
}
