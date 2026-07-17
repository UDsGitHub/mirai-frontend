import { ActivityVerb } from "@/constants/enums";
import { JSONValue } from "next/dist/server/config-shared";

export const validateMetaData = (activityVerb: ActivityVerb, metaData: JSONValue) => {
    switch (activityVerb) {
        case ActivityVerb.RATED:
            return validateRatedMetaData(metaData)
        case ActivityVerb.COMPLETED:
            return validateRatedMetaData(metaData)
        case ActivityVerb.ADDED_TO_LIST:
            return validateRatedMetaData(metaData)
        case ActivityVerb.SHARED_REC:
            return validateRatedMetaData(metaData)
        case ActivityVerb.STARTED_DISCUSSION:
            return validateRatedMetaData(metaData)
        case ActivityVerb.REPLIED_TO_DISCUSSION:
            return validateRatedMetaData(metaData)
        default:
            throw Error("Invalid Activity Verb")
    }
}

const validateRatedMetaData = (metaData: JSONValue) => {
    
}