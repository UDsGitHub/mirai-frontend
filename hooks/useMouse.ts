import { useMotionValue, useSpring } from "motion/react"
import { useEffect, useRef, useState } from "react"

type SpringOptions = { damping: number; stiffness: number; mass: number }
const defaultSpringConfig = { damping: 25, stiffness: 250, mass: 0.5 }

export const useMouse = (springConfig: SpringOptions = defaultSpringConfig) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)
  const hasMovedRef = useRef(false)
  const [hasMoved, setHasMoved] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMovedRef.current) {
        mouseX.jump(e.clientX)
        mouseY.jump(e.clientY)
        springX.jump(e.clientX)
        springY.jump(e.clientY)
        hasMovedRef.current = true
        setHasMoved(true)
        return
      }

      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY, springX, springY])

  return { x: springX, y: springY, hasMoved }
}
