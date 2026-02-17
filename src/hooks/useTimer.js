import { useEffect, useRef, useState, useCallback } from 'react'

export default function useTimer({ ms = 10000, onExpire } = {}) {
  const [timeLeft, setTimeLeft] = useState(ms)
  const [isActive, setIsActive] = useState(false)
  const startRef = useRef(Date.now())
  const intervalRef = useRef(null)
  const onExpireRef = useRef(onExpire)

  // Keep onExpire updated without triggering useEffect
  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  const stop = useCallback(() => {
    setIsActive(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const start = useCallback(() => {
    startRef.current = Date.now()
    setTimeLeft(ms)
    setIsActive(true)
  }, [ms])

  const reset = useCallback(() => {
    stop()
    start()
  }, [stop, start])

  useEffect(() => {
    if (!isActive) return

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current
      const left = Math.max(0, ms - elapsed)
      setTimeLeft(left)
      
      if (left === 0) {
        setIsActive(false)
        clearInterval(intervalRef.current)
        onExpireRef.current?.()
      }
    }, 100)

    return () => clearInterval(intervalRef.current)
  }, [isActive, ms])

  const pct = Math.max(0, Math.min(1, timeLeft / ms))

  return { timeLeft, pct, reset, stop, start, isActive }
}
