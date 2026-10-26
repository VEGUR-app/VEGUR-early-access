import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/signup.js'

// Meldet einmalig, sobald ein Element in den Viewport kommt. Ohne
// IntersectionObserver oder bei reduzierter Bewegung sofort sichtbar -
// kein Element bleibt dauerhaft unsichtbar.
export function useInView({ threshold = 0.2, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, visible]
}
