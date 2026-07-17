import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUp, Bot, WandSparkles } from "lucide-react"
import SuggestedPrompt from "./SuggestedPrompt"
import { useIsMobile } from "@/hooks"

const examplePrompts: string[] = [
  "Something like death note but darker",
  "Slow-burn romance with greate OST",
  "Best hidden gems of 2023",
  "Emotionally, visually stunning",
]

export default function AskMiraiInput() {
  const isMobile = useIsMobile()

  return (
    <form className="relative isolate flex flex-col justify-center gap-4 rounded-xl border border-teal-200/50 bg-muted/10 p-3 shadow-xl shadow-teal-200/20 sm:p-6 sm:shadow-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-xl ring-1 ring-teal-200/50 ring-inset"
      />
      <div className="relative z-10 flex items-center">
        <div className="flex size-8 items-center justify-center rounded-xl bg-teal-200 sm:size-10">
          <Bot className="size-5 text-accent" />
        </div>
        <Textarea
          id="prompt-input"
          className="field-sizing-content flex-1 resize-none border-none! bg-transparent! text-sm ring-0! outline-none! sm:text-base"
          placeholder={
            isMobile
              ? "What should I watch next?..."
              : "What should I watch next? Describe a mood, genre, or a series you loved…"
          }
        />
        {isMobile ? (
          <Button variant={"primary"} size={"icon"} className="rounded-2xl before:hidden sm:before:block">
            <ArrowUp />
          </Button>
        ) : (
          <Button
            variant={"primary"}
            className="rounded-xl px-6 py-5 font-semibold"
          >
            <WandSparkles />
            <span>Ask Mirai</span>
          </Button>
        )}
      </div>
      {!isMobile && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Try: </span>
          <div className="flex flex-wrap items-center gap-2">
          {examplePrompts.map((prompt) => (
            <SuggestedPrompt
              key={prompt}
              value={prompt}
              onClick={() => console.log(prompt)}
            />
          ))}
        </div>
        </div>
      )}
    </form>
  )
}
