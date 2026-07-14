import { Geist, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"

export const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontPanchang = localFont({
  src: "../public/assets/fonts/panchang/Panchang-Variable.woff2",
  variable: "--font-panchang-family",
  display: "swap",
  weight: "100 200 300 400 500 600 700 800 900",
})

export const fontAdventPro = localFont({
  src: "../public/assets/fonts/adventpro/AdventPro-VariableFont_wdth,wght.ttf",
  variable: "--font-advent-pro-family",
  display: "swap",
  weight: "100 200 300 400 500 600 700 800 900",
})

export const fontKihim = localFont({
  src: "../public/assets/fonts/kihim/Kihim-Regular.woff2",
  variable: "--font-kihim-family",
  display: "swap",
  weight: "600 700 800 900",
})

export const fontZalando = localFont({
  src: [
    {
      path: "../public/assets/fonts/zalando/ZalandoSansExpanded-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/zalando/ZalandoSansExpanded-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-zalando-family",
  display: "swap",
  weight: "600 700 800 900",
})

export const fontMontserrat = localFont({
  src: [
    {
      path: "../public/assets/fonts/montserrat/Montserrat-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/montserrat/Montserrat-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-montserrat-family",
  display: "swap",
  weight: "600 700 800 900",
})
