"use client"

import { FormStep, MultiStepForm, step1Schema, step2Schema, step3Schema } from "@/components/multistep-form"
import FormLayout from "./layout/FormLayout"
import {Step1, Step2, Step3} from "./steps"

export default function OnboardingPage() {
  const steps: FormStep[] = [
    {
      title: "Step 1",
      validationSchema: step1Schema,
      component: <Step1 />,
      fields: ["displayName"],
    },
    {
      title: "Step 2",
      validationSchema: step2Schema,
      component: <Step2 />,
      fields: ["birthDate"],
    },
    {
        title: "Step 3",
        validationSchema: step3Schema,
        component: <Step3 />,
        fields: ["genrePreferences", "tagPreferences"],
    }
  ]

  return <MultiStepForm LayoutComponent={FormLayout} steps={steps} onComplete={() => Promise.resolve()} />
}
