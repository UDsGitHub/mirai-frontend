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

const now = Date.now()

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

  const [showPageLoader, setShowPageLoader] = useState(true)
  const loaderShownAtRef = useRef<number | null>(now)

  useEffect(() => {
    if (skip || isLoading) return

    if (!userProfile?.userId) {
      router.replace("/onboarding")
    }
  }, [skip, isLoading, userProfile, router])

  useEffect(() => {
    if (isLoading) {
      if (loaderShownAtRef.current === null) {
        loaderShownAtRef.current = Date.now()
      }
      setShowPageLoader(true)
      return
    }

    if (loaderShownAtRef.current === null) {
      setShowPageLoader(false)
      return
    }

    const elapsed = Date.now() - loaderShownAtRef.current
    const remaining = Math.max(0, MIN_LOADER_MS - elapsed)

    const timeout = setTimeout(() => {
      loaderShownAtRef.current = null
      setShowPageLoader(false)
    }, remaining)

    return () => clearTimeout(timeout)
  }, [isLoading])

  return showPageLoader ? <PageLoader /> : <>{children}</>
}
