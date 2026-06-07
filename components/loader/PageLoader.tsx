"use client"

import CircleLoader from "./CircleLoader"

export default function PageLoader() {
  return (
    <div className="flex h-full items-center justify-center">
      <CircleLoader size={100} />
    </div>
  )
}
