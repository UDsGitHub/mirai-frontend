"use client"

import { OnboardingPage } from "@/features/onboarding"
import { useUserProfileContext } from "@/providers"
import { redirect, RedirectType } from "next/navigation"

export default function OnboardingScreen() {
  const { userProfile, isLoading } = useUserProfileContext()

  if (!isLoading && userProfile) {
    redirect("/", RedirectType.replace)
  }

  return <OnboardingPage />
}
