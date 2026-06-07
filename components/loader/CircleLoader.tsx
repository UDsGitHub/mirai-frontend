"use client"

import { motion } from "motion/react"

type Props = {
  size?: number
  color?: string | string[]
}

export default function CircleLoader({
  size = 10,
  color = ["#06B6D4", "#B026FF"],
}: Props) {
  const r = size / 2 - 2
  const circumference = 2 * Math.PI * r
  const patternLength = circumference * 2

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          {Array.isArray(color) &&
            color.map((c, i) => (
              <stop key={i} offset={`${i * 100}%`} stopColor={c} />
            ))}
        </linearGradient>
      </defs>
      <motion.circle
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -patternLength, rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        cx="50%"
        cy="50%"
        r="calc(50% - 2px)"
        fill="none"
        stroke={Array.isArray(color) ? `url(#gradient)` : color}
        strokeWidth="4"
        strokeDasharray={`${Math.PI * size} ${Math.PI * size}`}
        strokeDashoffset="0"
        strokeLinecap="round"
      />
    </svg>
  )
}
