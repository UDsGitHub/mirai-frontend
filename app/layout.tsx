import "./globals.css"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import App from "./app"
import { CustomClerkProvider } from "@/providers"
import {
  fontAdventPro,
  fontKihim,
  fontMono,
  fontPanchang,
  fontZalando,
  fontMontserrat,
  geist,
} from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Mirai",
  description: "Discover Anime Engineered by AI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        geist.variable,
        fontMono.variable,
        fontPanchang.variable,
        fontAdventPro.variable,
        fontKihim.variable,
        fontZalando.variable,
        fontMontserrat.variable,
        "font-sans",
        "font-montserrat leading-relaxed",
        "h-full"
      )}
    >
      <head>
        <link rel="icon" href="/assets/favicon/favicon.svg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon/favicon-16x16.png"
        />
      </head>
      <body className="h-full">
        <CustomClerkProvider>
          <App>{children}</App>
        </CustomClerkProvider>
      </body>
    </html>
  )
}
