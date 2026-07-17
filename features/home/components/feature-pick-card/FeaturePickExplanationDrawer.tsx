import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks"

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function FeaturePickExplanationDrawer({
  isOpen,
  onClose,
}: Props) {
  const isMobile = useIsMobile()

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-zalando font-semibold">
            Why Mirai picked this for you today?
          </DrawerTitle>
        </DrawerHeader>
        <p className="p-4 text-sm text-muted-foreground">
          Based on your love of complex character introspection and
          world-building, Frieren&apos;s quiet meditation on time, loss, and meaning
          aligns perfectly with your taste profile. Its painterly animation and
          emotionally resonant pacing mirror the storytelling depth you
          consistently rate highest.
        </p>
        <DrawerFooter>
          <Button className="bg-teal-200 duration-180 active:bg-teal-400">
            View Details
          </Button>
          <DrawerClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
