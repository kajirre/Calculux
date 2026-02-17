import { useEffect, useState } from 'react'

const STORAGE_KEY = 'mental-calc-streak'

export default function useStreak() {
  const [streak, setStreak] = useState(0)
  const [lastSuccess, setLastSuccess] = useState(null)

  useEffect(() => {
    loadStreak()
  }, [])

  function loadStreak() {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        const { streak: s, lastSuccess: ls } = JSON.parse(data)
        setStreak(s)
        setLastSuccess(ls)
      }
    } catch {}
  }

  function updateStreak(success) {
    if (!success) {
      setStreak(0)
      setLastSuccess(null)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ streak: 0, lastSuccess: null }))
      } catch {}
      return
    }

    const now = new Date()
    let newStreak = 1
    if (lastSuccess) {
      const prev = new Date(lastSuccess)
      const diff = now - prev
      if (diff <= 48 * 3600 * 1000) {
        newStreak = streak + 1
      }
    }
    const nowISO = now.toISOString()
    setStreak(newStreak)
    setLastSuccess(nowISO)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ streak: newStreak, lastSuccess: nowISO }))
    } catch {}
  }

  return { streak, lastSuccess, updateStreak }
}
