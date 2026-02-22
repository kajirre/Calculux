import React, { useEffect, useRef, useState, useCallback } from 'react'
import TimerBar from '../ui/TimerBar'
import AnswerInput from '../ui/AnswerInput'
import Button from '../ui/Button'
import ProblemDisplay from '../ui/ProblemDisplay'
import useTimer from '../../hooks/useTimer'
import useSpeech from '../../hooks/useSpeech'
import { useGame } from '../../context/GameContext'
import { motion, AnimatePresence } from 'framer-motion'
import { validateAnswer } from '../../logic/validators'

export default function GameScreen({
  problem,
  onCorrect,
  onWrong,
  onFail,
  index,
  total,
  score,
  level = 1,
  feedback,
  settings = {},
  onQuit
}) {
  const { setMascotEmotion, setMascotLook } = useGame()
  const [answer, setAnswer] = useState('')
  const inputRef = useRef(null)

  // Eye interaction logic
  const [eyeMode, setEyeMode] = useState('tracking') // 'tracking' | 'hurry'

  // Toggle eye mode every 3.5s
  useEffect(() => {
    if (feedback !== null) return
    const timer = setInterval(() => {
      setEyeMode(prev => prev === 'tracking' ? 'hurry' : 'tracking')
    }, 3500)
    return () => clearInterval(timer)
  }, [feedback])

  // Emotion categories for different time phases
  const PHASE_POOLS = {
    early: ['happy', 'pleased', 'serious', 'silly'], // 100% - 60%
    mid: ['serious', 'confused', 'tired', 'irritated'], // 60% - 30%
    late: ['scared', 'shocked', 'pain', 'wtf', 'nervous'] // 30% - 0%
  }

  const MS_BY_LEVEL = {
    1: 20000,
    2: 22000,
    3: 25000,
    4: 30000,
    5: 35000,
    6: 45000
  }

  const baseMs = (MS_BY_LEVEL[level] || 10000) * (settings.timeMultiplier || 1)
  const ms = Math.floor(baseMs)

  const { pct, reset, stop, start } = useTimer({
    ms,
    onExpire: () => {
      stop()
      onFail()
    }
  })

  // Controlled emotion and eye rotation
  const lastPhase = useRef(null)

  useEffect(() => {
    if (feedback !== null) return

    // 1. Emotion logic
    let currentPhase = 'early'
    if (pct < 0.3) currentPhase = 'late'
    else if (pct < 0.6) currentPhase = 'mid'

    if (lastPhase.current !== currentPhase) {
      lastPhase.current = currentPhase
      const pool = PHASE_POOLS[currentPhase]
      setMascotEmotion(pool[Math.floor(Math.random() * pool.length)])
    }

    // 2. Eye tracking logic
    if (eyeMode === 'tracking') {
      // Follow the bar: Map pct (1 -> 0) to X (10 -> -10)
      const lookX = (pct * 20) - 10
      setMascotLook({ x: lookX, y: 6 })
    } else {
      // Hurry mode: Look at user
      setMascotLook({ x: 0, y: 0 })
      // When looking at screen in later phases, force a "hurry" emotion
      if (pct < 0.4) {
        setMascotEmotion('shocked')
      }
    }
  }, [pct, feedback, eyeMode, setMascotEmotion, setMascotLook])

  const { active: micOn, start: startMic, stop: stopMic, supported } = useSpeech({
    lang: 'es-ES',
    onResult: (number) => {
      handleSubmit(number)
    },
  })

  useEffect(() => {
    inputRef.current?.focus()
    start()
    return () => {
      stop()
      setMascotLook({ x: 0, y: 0 })
    }
  }, [start, stop, setMascotLook])

  useEffect(() => {
    setAnswer('')
    if (feedback === null) {
      reset()
      setMascotEmotion('serious')
      setMascotLook({ x: 5, y: 6 }) // Start looking at the bar edge
      lastPhase.current = 'early'
    }
    inputRef.current?.focus()
  }, [problem, reset, feedback, setMascotEmotion, setMascotLook])

  const handleSubmit = useCallback((value) => {
    const attempt = value !== undefined ? String(value).trim() : answer.trim()
    if (attempt === '' || Number.isNaN(Number(attempt))) return

    stop()

    if (validateAnswer(attempt, problem.answer)) {
      setAnswer('')
      onCorrect()
    } else {
      setAnswer('')
      onWrong(problem.answer)
    }
  }, [answer, problem, onCorrect, onWrong, stop])

  const toggleMic = useCallback(() => {
    if (micOn) stopMic()
    else startMic()
    inputRef.current?.focus()
  }, [micOn, startMic, stopMic])

  const isSuddenDeath = settings.isSuddenDeath

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex justify-between items-start px-1">
        <button
          onClick={onQuit}
          className="text-[10px] font-black text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1.5 rounded-lg active:scale-95 transition-all"
        >
          ← Volver
        </button>
        <div className="flex gap-4 sm:gap-6">
          <div className="text-right">
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
              {isSuddenDeath ? 'Racha' : 'Ejerc.'}
            </div>
            <motion.div
              key={isSuddenDeath ? settings.consecutiveHits : index}
              initial={{ scale: 1.2, color: '#0ea5e9' }}
              animate={{ scale: 1, color: '#374151' }}
              className="text-base sm:text-xl font-black text-gray-700 leading-none"
            >
              {isSuddenDeath ? (settings.consecutiveHits ?? 0) : `${index + 1}/${total}`}
            </motion.div>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Puntos</div>
            <motion.div
              key={score}
              initial={{ scale: 1.5, color: '#10b981' }}
              animate={{ scale: 1, color: '#0ea5e9' }}
              className="text-base sm:text-xl font-black text-sky-600 tracking-tighter leading-none"
            >
              {score}
            </motion.div>
          </div>
        </div>
      </div>

      <TimerBar pct={pct} color={isSuddenDeath ? 'bg-rose-500' : 'bg-sky-500'} />

      <div className="py-2 min-h-[100px] sm:min-h-[140px] flex items-center justify-center">
        {feedback?.type === 'wrong' ? (
          <div className="text-center animate-in zoom-in duration-300">
            <div className="text-5xl font-black text-rose-600 mb-2 drop-shadow-sm">✕</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Resultado Correcto</div>
            <div className={`font-black text-5xl text-rose-600 ${isSuddenDeath ? 'animate-pulse' : ''}`}>
              {feedback.correct}
            </div>
          </div>
        ) : (
          <div className="transform scale-90 sm:scale-100">
            <ProblemDisplay a={problem.a} b={problem.b} op={problem.op} />
          </div>
        )}
      </div>

      <div className="flex gap-2 sm:gap-3">
        <AnswerInput
          value={answer}
          onChange={setAnswer}
          onSubmit={handleSubmit}
          inputRef={inputRef}
          disabled={pct === 0 || feedback !== null}
        />
        <Button
          onClick={() => handleSubmit()}
          variant="primary"
          disabled={pct === 0 || feedback !== null}
          className={`px-4 sm:px-8 rounded-2xl font-black text-base sm:text-lg ${isSuddenDeath ? 'bg-rose-600 shadow-rose-100' : 'bg-sky-600 shadow-sky-100'}`}
        >
          OK
        </Button>
      </div>
    </div>
  )
}
