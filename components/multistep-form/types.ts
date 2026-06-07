import { ZodType } from "zod"
import { CombinedSchemaType } from "./validators"
import { ComponentType } from "react"

type FieldKeys = keyof CombinedSchemaType

export type FormStep = {
  title: string
  validationSchema: ZodType<unknown>
  component: React.ReactElement
  fields: FieldKeys[]
  onBeforeNext?: (data: CombinedSchemaType) => Promise<void>
  canSkip?: boolean
}

export type LayoutComponentProps = {
  children: React.ReactNode
  currentStepIndex: number
  currentStep: FormStep
  totalSteps: number
  handleNext: () => void
  handlePrevious: () => void
}

export type LayoutComponentType = ComponentType<LayoutComponentProps>
