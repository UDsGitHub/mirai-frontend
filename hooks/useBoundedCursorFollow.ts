import { clamp, SpringOptions, useMotionValue, useSpring } from "motion/react"
import { RefObject, useEffect, useMemo, useRef } from "react"

type BoundedCursorFollowOptions = {
  maxOffset: number
  spring: SpringOptions
  enabled: boolean
}

const DEFAULT_OPTIONS: BoundedCursorFollowOptions = {
  maxOffset: 24,
  spring: { damping: 60, stiffness: 60, mass: 1.8 },
  enabled: true,
}

function mapCursorToOffset(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  maxOffset: number
) {
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const relX = clamp(-1, 1, (clientX - centerX) / (rect.width / 2))
  const relY = clamp(-1, 1, (clientY - centerY) / (rect.height / 2))

  return {
    x: Math.sign(relX) * Math.pow(Math.abs(relX), 0.7) * maxOffset,
    y: Math.sign(relY) * Math.pow(Math.abs(relY), 0.7) * maxOffset,
  }
}

export const useBoundedCursorFollow = (
  zoneRef: RefObject<HTMLElement | null>,
  options: Partial<BoundedCursorFollowOptions> = {}
) => {
  const resolvedOptions = useMemo<BoundedCursorFollowOptions>(
    () => ({
      maxOffset: options.maxOffset ?? DEFAULT_OPTIONS.maxOffset,
      enabled: options.enabled ?? DEFAULT_OPTIONS.enabled,
      spring: { ...DEFAULT_OPTIONS.spring, ...options.spring },
    }),
    [options.enabled, options.maxOffset, options.spring]
  )

  const isActiveRef = useRef(false)
  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const x = useSpring(targetX, resolvedOptions.spring)
  const y = useSpring(targetY, resolvedOptions.spring)

  useEffect(() => {
    const zone = zoneRef.current
    if (!zone || !resolvedOptions.enabled) {
      return
    }

    const onEnter = () => {
      isActiveRef.current = true
    }

    const onLeave = () => {
      isActiveRef.current = false
      targetX.set(0)
      targetY.set(0)
    }

    const onMove = (e: MouseEvent) => {
      if (!isActiveRef.current) {
        return
      }

      const offset = mapCursorToOffset(
        e.clientX,
        e.clientY,
        zone.getBoundingClientRect(),
        resolvedOptions.maxOffset
      )
      targetX.set(offset.x)
      targetY.set(offset.y)
    }

    zone.addEventListener("mouseenter", onEnter)
    zone.addEventListener("mousemove", onMove)
    zone.addEventListener("mouseleave", onLeave)

    return () => {
      zone.removeEventListener("mouseenter", onEnter)
      zone.removeEventListener("mousemove", onMove)
      zone.removeEventListener("mouseleave", onLeave)
    }
  }, [resolvedOptions, zoneRef, targetX, targetY])

  return { x, y }
}
