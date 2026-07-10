"use client"

import { ApolloProvider } from "@apollo/client/react"
import { useAuth } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"
import React, { useMemo } from "react"
import { createApolloClient } from "@/lib/apollo-client"
import { ProfileGate } from "@/features/auth"
import { Toaster } from "@/components/ui/sonner"
import { UserProfileProvider } from "@/providers"

export default function App({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth()
  const client = useMemo(() => createApolloClient(getToken), [getToken])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <UserProfileProvider>
          <ProfileGate>{children}</ProfileGate>
        </UserProfileProvider>
        <Toaster />
      </ThemeProvider>
    </ApolloProvider>
  )
}
