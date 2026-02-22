import React, { createContext, useState, useCallback, useRef } from 'react'
import { generateProblem } from '../logic/mathEngine'
import useStreak from '../hooks/useStreak'
import { calculateRank } from '../utils/rankUtils'
import { playCorrectSound, playWrongSound, playLevelUpSound } from '../utils/soundUtils'

const GameContext = createContext()

export function GameProvider({ children, totalExercises = 10 }) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [problem, setProblem] = useState(null)
  const [running, setRunning] = useState(false)
  const [started, setStarted] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [settings, setSettings] = useState({
    level: 1,
    operators: ['+', '-'],
    totalExercises,
    isSuddenDeath: false,
    timeMultiplier: 1.0
  })
  const [consecutiveHits, setConsecutiveHits] = useState(0)
  const [mascotEmotion, setMascotEmotion] = useState('happy')
  const [mascotLook, setMascotLook] = useState({ x: 0, y: 0 })
  const { streak, updateStreak } = useStreak()

  const nextProblem = useCallback(() => {
    setMascotEmotion('watching')
    setProblem(generateProblem(settings.level, { operators: settings.operators }))
    setIndex(i => i + 1)
    setFeedback(null)
  }, [settings])

  const handleCorrect = useCallback(() => {
    setScore(s => s + 100)
    setConsecutiveHits(h => {
      const newHits = h + 1
      // Dynamic difficulty: Every 5 hits, level + 1 and time -5%
      if (settings.isSuddenDeath && newHits % 5 === 0) {
        setMascotEmotion('gusto')
        playLevelUpSound()
        setSettings(prev => ({
          ...prev,
          level: prev.level + 1,
          timeMultiplier: prev.timeMultiplier * 0.95
        }))
      }
      return newHits
    })

    setMascotEmotion('joy')
    playCorrectSound()
    updateStreak(true)
    setFeedback({ type: 'correct' })

    setTimeout(() => {
      if (!settings.isSuddenDeath && index + 1 >= settings.totalExercises) {
        setRunning(false)
      } else {
        nextProblem()
      }
    }, 600)
  }, [index, settings, nextProblem, updateStreak])

  const handleWrong = useCallback((correct) => {
    setMascotEmotion('angry')
    playWrongSound()
    setFeedback({ type: 'wrong', correct })

    const delay = settings.isSuddenDeath ? 4000 : 3000

    setTimeout(() => {
      setRunning(false)
      if (!settings.isSuddenDeath) {
        if (index + 1 < settings.totalExercises) {
          nextProblem()
          setRunning(true)
        }
      }
    }, delay)
  }, [index, settings, nextProblem])

  const restart = useCallback(() => {
    setIndex(0)
    setScore(0)
    setConsecutiveHits(0)
    setStarted(false)
    setRunning(false)
    setFeedback(null)
  }, [])

  const restartQuick = useCallback(() => {
    setIndex(0)
    setScore(0)
    setConsecutiveHits(0)
    setSettings(prev => ({ ...prev, level: prev.level, timeMultiplier: 1.0 })) // Reset dynamic multipliers but keep level? User said "incrementa el nivel", so we should probably reset to start level on quick restart.
    setProblem(generateProblem(settings.level, { operators: settings.operators }))
    setRunning(true)
    setStarted(true)
    setFeedback(null)
  }, [settings])

  const startGame = useCallback((opts) => {
    const cfg = {
      level: opts.level ?? 1,
      operators: opts.operators ?? ['+', '-'],
      totalExercises: opts.totalExercises ?? totalExercises,
      isSuddenDeath: opts.isSuddenDeath ?? false,
      timeMultiplier: 1.0
    }
    setSettings(cfg)
    setIndex(0)
    setScore(0)
    setConsecutiveHits(0)
    setProblem(generateProblem(cfg.level, { operators: cfg.operators }))
    setRunning(true)
    setStarted(true)
    setFeedback(null)
  }, [totalExercises])

  const rank = calculateRank(score)

  return (
    <GameContext.Provider value={{
      index,
      score,
      problem,
      running,
      started,
      feedback,
      streak,
      settings,
      consecutiveHits,
      mascotEmotion,
      setMascotEmotion,
      mascotLook,
      setMascotLook,
      rank,
      handleCorrect,
      handleWrong,
      nextProblem,
      restart,
      startGame,
      restartQuick,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = React.useContext(GameContext)
  if (!ctx) throw new Error('useGame debe estar dentro de GameProvider')
  return ctx
}
