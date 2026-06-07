"use client"

import { PageLoader } from "@/components/loader"
import { GetUserDocument } from "@/gql/graphql"
import { useLazyQuery } from "@apollo/client/react"
import { useAuth } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

const SKIP_ROUTES = ["/sign-in", "/onboarding"]

type Props = {
  children: React.ReactNode
}

export default function ProfileGate({ children }: Props) {
  const { isLoaded, isSignedIn, userId } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const skip =
    (isLoaded && !isSignedIn) || SKIP_ROUTES.some((p) => pathname.startsWith(p))
  const [getUserProfile, { data, loading }] = useLazyQuery(GetUserDocument)

  useEffect(() => {
    if (skip || !isLoaded || !userId || loading) return

    getUserProfile({ variables: { id: userId } }).then(({ data }) => {
      const hasProfile = Boolean(data?.user?.userId)
      if (!hasProfile) router.replace("/onboarding")
    })
  }, [isLoaded, userId, getUserProfile, router, loading, skip])

  if (!skip && (loading || !data?.user)) {
    return <PageLoader />
  }

  return <>{children}</>
}
