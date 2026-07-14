"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useUserProfileContext } from "@/providers"
import { getTimeOfDay } from "@/utils/date"
import { Bell } from "lucide-react"

export default function AppHeader() {
  const { userProfile } = useUserProfileContext()

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-background px-4 py-3">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="flex flex-col">
          <p className="text-xs tracking-wider text-muted-foreground uppercase">
            Good {getTimeOfDay()}
          </p>
          <p className="text-lg font-bold">{userProfile?.displayName}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline">
          <Bell />
        </Button>
        <Button size="icon" variant="outline" className="border-teal-200! border-17! rounded-full">
          <Avatar>
            <AvatarImage src={userProfile?.avatarUrl ?? ""} />
            <AvatarFallback>{userProfile?.displayName}</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  )
}
