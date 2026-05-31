"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default function Page() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
      </div>
    </div>
  )
}
