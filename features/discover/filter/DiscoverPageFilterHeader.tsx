import { Button } from "@/components/ui/button"
import { CollapsibleTrigger } from "@/components/ui/collapsible"
import { Funnel } from "lucide-react"
import SearchField from "./fields/SearchField"
import { FilterFieldType } from "./fields/type"

export default function DiscoverPageFilterHeader({
  control,
  register,
}: FilterFieldType) {
  
  return (
    <div className="mx-auto flex items-center justify-center gap-2">
      <div className="w-full max-w-md transition-[max-width] duration-180 focus-within:max-w-full">
        <SearchField control={control} register={register} />
      </div>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="icon">
          <Funnel />
        </Button>
      </CollapsibleTrigger>
    </div>
  )
}
