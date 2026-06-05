import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import App from "./app"
import { CustomClerkProvider } from "@/providers"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

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
        fontMono.variable,
        "font-sans",
        geist.variable,
        "h-full"
      )}
    >
      <body className="h-full">
      <CustomClerkProvider>
        <App>{children}</App>
      </CustomClerkProvider>
      </body>
    </html>
  )
}
