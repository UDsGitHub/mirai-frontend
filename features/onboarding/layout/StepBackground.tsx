import { cn } from "@/lib/utils"

type Props = {
  imageSrc: string
  children: React.ReactNode
  className?: string
}

export default function StepBackground({
  imageSrc,
  children,
  className,
}: Props) {
  return (
    <div className={"relative h-full min-h-0 bg-background"}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat mix-blend-luminosity opacity-20"
        style={{ backgroundImage: `url("${imageSrc}")` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 backdrop-blur-xs"
      />
      <div className={cn("relative z-10 h-full min-h-0", className)}>
        {children}
      </div>
    </div>
  )
}
