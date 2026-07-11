"use client"

import { PageLoader } from "@/components/loader"
import { SKIP_PROFILE_GATE_ROUTES } from "@/constants/auth"
import { MIN_LOADER_MS } from "@/constants/loader"
import { useUserProfileContext } from "@/providers/user-profile"
import { useAuth } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type Props = {
  children: React.ReactNode
}

export default function ProfileGate({ children }: Props) {
  const { isLoaded, isSignedIn, userId } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const skip =
    !isLoaded ||
    (isLoaded && !isSignedIn) ||
    !userId ||
    SKIP_PROFILE_GATE_ROUTES.some((p) => pathname.startsWith(p))

  const { userProfile, isLoading } = useUserProfileContext()

  const loaderStartRef = useRef(0)
  const [minDelayActive, setMinDelayActive] = useState(false)
  const [prevIsLoading, setPrevIsLoading] = useState(isLoading)

  if (isLoading !== prevIsLoading) {
    setPrevIsLoading(isLoading)
    if (isLoading) {
      setMinDelayActive(true)
    }
  }

  useEffect(() => {
    if (skip || isLoading) return

    if (!userProfile?.userId) {
      router.replace("/onboarding")
    }
  }, [skip, isLoading, userProfile, router])

  useEffect(() => {
    if (skip) {
      loaderStartRef.current = 0
      return
    }

    if (isLoading) {
      if (loaderStartRef.current === 0) {
        loaderStartRef.current = Date.now()
      }
      return
    }

    if (!minDelayActive || loaderStartRef.current === 0) return

    const remaining = Math.max(
      0,
      MIN_LOADER_MS - (Date.now() - loaderStartRef.current)
    )
    const timeout = setTimeout(() => setMinDelayActive(false), remaining)

    return () => clearTimeout(timeout)
  }, [skip, isLoading, minDelayActive])

  const showPageLoader =
    !isLoaded || (!skip && (isLoading || minDelayActive))

  return showPageLoader ? <PageLoader /> : <>{children}</>
}
