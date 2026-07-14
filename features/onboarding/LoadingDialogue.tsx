import { Dialog, DialogContent } from "@/components/ui/dialog"
import { PropagateLoader } from "react-spinners"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LoadingDialogue({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="h-[120px] w-[250px] flex flex-col items-center justify-center gap-1 bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg"
        showCloseButton={false}
      >
        <p className="text-sm font-semibold font-zalando text-accent-foreground">Loading...</p>
        <PropagateLoader color="var(--accent-foreground)" size={10} />
      </DialogContent>
    </Dialog>
  )
}
