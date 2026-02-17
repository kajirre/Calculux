import { useEffect, useRef, useState } from 'react'

export default function useSpeechRecognition({ lang = 'es-ES', onResult } = {}) {
  const [active, setActive] = useState(false)
  const recogRef = useRef(null)

  useEffect(() => {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Rec) return
    const r = new Rec()
    r.lang = lang
    r.interimResults = false
    r.maxAlternatives = 1
    r.onresult = (e) => {
      const t = (e.results[0][0].transcript || '').trim()
      onResult && onResult(t)
    }
    r.onend = () => { if (active) { try { r.start() } catch {} } }
    r.onerror = () => {}
    recogRef.current = r
    return () => { try { r.stop() } catch {} }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, onResult])

  function start() { try { recogRef.current?.start(); setActive(true) } catch {} }
  function stop() { try { recogRef.current?.stop(); setActive(false) } catch {} }

  return { active, start, stop }
}
