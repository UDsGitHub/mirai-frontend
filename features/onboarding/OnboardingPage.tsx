"use client"

import {
  CombinedSchemaType,
  FormStep,
  MultiStepForm,
  step1Schema,
  step2Schema,
  step3Schema,
} from "@/components/multistep-form"
import FormLayout from "./layout/FormLayout"
import { Step1, Step2, Step3 } from "./steps"
import { useAuth } from "@clerk/nextjs"
import { useMutation } from "@apollo/client/react"
import { CreateUserDocument, GetUserDocument } from "@/gql/graphql"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import LoadingDialogue from "./LoadingDialogue"

export default function OnboardingPage() {
  const { userId } = useAuth()
  const router = useRouter()
  const [createUser] = useMutation(CreateUserDocument)
  const [isCreating, setIsCreating] = useState(false)

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
    },
  ]

  const onComplete = async (data: CombinedSchemaType) => {
    if (!userId) {
      toast.error("User ID is required", { duration: 4000 })
      setTimeout(() => {
        router.replace("/sign-in")
      }, 4000)
      return
    }

    try {
      setIsCreating(true)
      await createUser({
        variables: {
          input: {
            userId: userId,
            ...data,
          },
        },
        update(cache, { data: mutationData }) {
          const user = mutationData?.createUser
          if (!user) return

          cache.writeQuery({
            query: GetUserDocument,
            variables: { id: user.userId },
            data: { user },
          })
        },
      })
      router.replace("/")
    } catch (error) {
      console.error(error)
      toast.error("Failed to create user")
    } finally {
      setIsCreating(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsCreating(false)
    }
  }

  return (
    <div className="h-svh overflow-hidden">
      <MultiStepForm
        LayoutComponent={FormLayout}
        steps={steps}
        onComplete={onComplete}
      />
      <LoadingDialogue open={isCreating} onOpenChange={handleOpenChange} />
    </div>
  )
}
