import { Button } from "@/components/ui/button"

type Props = {
  value: string
  onClick: () => void
}

export default function SuggestedPrompt({ value, onClick }: Props) {
  return (
    <Button
      variant={"outline"}
      onClick={onClick}
      className="rounded-2xl bg-transparent text-xs font-semibold"
    >
      &quot;{value}&quot;
    </Button>
  )
}
