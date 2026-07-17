import { ActivityVerb } from "@/constants/enums"
import { JSONValue } from "next/dist/server/config-shared"

export type FriendsActivityType = {
    id: string
    userInfo: {
        id: string;
        avatarUrl: string
        displayName: string
    }
    activityVerb: ActivityVerb
    metadata?: JSONValue
    createdAt: Date
}