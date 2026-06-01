import { ClerkProvider } from "@clerk/nextjs"
import { LocalizationResource } from "@clerk/nextjs/types"
import { shadcn } from "@clerk/ui/themes"
type Props = { children: React.ReactNode }

const localization: LocalizationResource = {
  signIn: {
    start: {
      title: "Welcome to Mirai",
      subtitle: "Sign in to access your personalized neural network.",
      titleCombined: "Welcome to Mirai",
      subtitleCombined: "Sign in to access your personalized neural network.",
    },
  },
}

const appearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  signIn: {
    variables: {
      colorPrimary: "#00E5FF",
      spacing: "1.2rem",
      colorInput: "#000000",
      colorInputForeground: "#ffffff",
    },
    elements: {
      cardBox: "w-md",
      card: "bg-neutral-800/25 backdrop-blur-lg",
      headerTitle: "text-2xl font-bold",
      socialButtonsBlockButton: "py-3 rounded-lg text-white font-medium",
      formFieldLabel: "text-muted-foreground text-sm font-medium",
      input: "rounded-lg py-6 px-4 bg-black/25!",
      formFieldInput: "border-border rounded-lg py-6 px-4",
      formButtonPrimary: `py-3 rounded-lg text-white text-sm font-semibold bg-linear-to-r from-cyan-500 to-purple-500 
        border-none outline-none! ring-0! focus:ring-0! focus-visible:ring-0!
        before:content-[''] before:absolute before:-inset-1 before:top-2 before:-z-10 
        before:bg-purple-500 before:rounded-lg before:blur-xs before:opacity-25 before:duration-300 before:transition-all 
        hover:before:opacity-35 hover:before:blur-sm
        `,
      buttonArrowIcon: "hidden",
    },
  },
}

export default function CustomClerkProvider({ children }: Props) {
  return (
    <ClerkProvider localization={localization} appearance={appearance}>
      {children}
    </ClerkProvider>
  )
}
