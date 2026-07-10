"use client"

import { SKIP_PROFILE_GATE_ROUTES } from "@/constants/auth"
import { GetUserDocument, GetUserQuery } from "@/gql/graphql"
import { NetworkStatus } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { useAuth } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { createContext, useContext } from "react"

type UserProfileType = GetUserQuery["user"]
type UserProfileContextType = {
  userProfile: UserProfileType | null
  isLoading: boolean
}

const UserProfileContext = createContext<UserProfileContextType>({
  userProfile: null,
  isLoading: true,
})

export default function UserProfileProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoaded, isSignedIn, userId } = useAuth()
  const pathname = usePathname()
  const skip =
    !isLoaded ||
    (isLoaded && !isSignedIn) ||
    !userId ||
    SKIP_PROFILE_GATE_ROUTES.some((p) => pathname.startsWith(p))

  const { data, networkStatus } = useQuery(GetUserDocument, {
    variables: { id: userId! },
    skip,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  })

  const queryInFlight =
    networkStatus === NetworkStatus.loading ||
    networkStatus === NetworkStatus.setVariables ||
    networkStatus === NetworkStatus.refetch

  const isResolvingProfile = !skip && (queryInFlight || data === undefined)

  return (
    <UserProfileContext.Provider
      value={{ userProfile: data?.user ?? null, isLoading: isResolvingProfile }}
    >
      {children}
    </UserProfileContext.Provider>
  )
}

export const useUserProfileContext = () => useContext(UserProfileContext)
