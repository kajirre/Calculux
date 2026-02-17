import { useEffect, useRef, useState } from 'react'
import { extractNumber } from '../logic/validators'

export default function useSpeech({ lang = 'es-ES', onResult } = {}) {
  const [active, setActive] = useState(false)
  const [supported, setSupported] = useState(true)
  const recogRef = useRef(null)

  useEffect(() => {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Rec) {
      setSupported(false)
      return
    }
    const r = new Rec()
    r.lang = lang
    r.interimResults = false
    r.maxAlternatives = 1
    r.onresult = (e) => {
      const transcript = (e.results[0][0].transcript || '').trim()
      const number = extractNumber(transcript)
      if (number !== null) {
        onResult?.(number)
      }
    }
    r.onend = () => {
      if (active) {
        try { r.start() } catch {}
      }
    }
    r.onerror = () => {}
    recogRef.current = r
    return () => {
      try { r.stop() } catch {}
    }
  }, [lang, onResult, active])

  function start() {
    if (!supported) return
    try {
      recogRef.current?.start()
      setActive(true)
    } catch {}
  }

  function stop() {
    try {
      recogRef.current?.stop()
      setActive(false)
    } catch {}
  }

  return { active, supported, start, stop }
}
