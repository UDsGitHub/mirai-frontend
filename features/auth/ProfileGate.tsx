"use client"

import { SplashPageLoader } from "@/components/loader"
import { SKIP_PROFILE_GATE_ROUTES } from "@/constants/auth"
import { MIN_LOADER_MS } from "@/constants/loader"
import { useUserProfileContext } from "@/providers/user-profile"
import { useAuth } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type Props = { children: React.ReactNode }

export default function ProfileGate({ children }: Props) {
  const { isLoaded, isSignedIn, userId } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [navKey, setNavKey] = useState(0)

  useEffect(() => {
    const handleBrowserNavigation = () => setNavKey((prev) => prev + 1)

    window.addEventListener("popstate", handleBrowserNavigation)
    window.addEventListener("pageshow", handleBrowserNavigation)

    return () => {
      window.removeEventListener("popstate", handleBrowserNavigation)
      window.removeEventListener("pageshow", handleBrowserNavigation)
    }
  }, [])

  const skip =
    !isLoaded ||
    (isLoaded && !isSignedIn) ||
    !userId ||
    SKIP_PROFILE_GATE_ROUTES.some((p) => pathname.startsWith(p))

  const { userProfile, isLoading } = useUserProfileContext()
  const loaderStartRef = useRef(0)
  const [minDelayActive, setMinDelayActive] = useState(false)
  const [prevIsLoading, setPrevIsLoading] = useState(isLoading)

  // start the min delay when the loading state changes to true
  if (isLoading !== prevIsLoading) {
    setPrevIsLoading(isLoading)
    if (isLoading) {
      setMinDelayActive(true)
    }
  }

  // redirect to onboarding if the user is not logged in and the user profile is not loaded
  useEffect(() => {
    if (skip || isLoading) return
    if (!userProfile?.userId) {
      router.replace("/onboarding")
    }
  }, [skip, isLoading, userProfile, router, navKey])

  // handle splash screen animation timer
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
  }, [skip, isLoading, minDelayActive, navKey])

  const showSplashPageLoader =
    !isLoaded || (!skip && (isLoading || minDelayActive))

  return (
    <fieldset key={`${pathname}-${navKey}`} className="min-w-0">
      <SplashPageLoader visible={showSplashPageLoader} />
      {children}
    </fieldset>
  )
}
