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
    <form className="relative flex flex-col justify-center gap-4 rounded-xl border border-teal-200/50 bg-muted/10 p-3 shadow-xl sm:shadow-2xl shadow-teal-200/20 before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:shadow-inner before:shadow-teal-200/50 before:content-[''] sm:p-6">
      <div className="flex items-center">
        <div className="flex size-8 items-center justify-center rounded-xl bg-teal-200 sm:size-10">
          <Bot size={20} className="text-accent" />
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
          <Button variant={"primary"} size={"icon"} className="rounded-2xl">
            <ArrowUp />
          </Button>
        ) : (
          <Button
            variant={"primary"}
            className={"rounded-xl px-6 py-5 font-semibold"}
          >
            <WandSparkles />
            <span>Ask Mirai</span>
          </Button>
        )}
      </div>
      {!isMobile && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>Try: </span>
          {examplePrompts.map((prompt) => (
            <SuggestedPrompt
              key={prompt}
              value={prompt}
              onClick={() => console.log(prompt)}
            />
          ))}
        </div>
      )}
    </form>
  )
}
