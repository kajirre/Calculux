import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import ShareCard from './ShareCard'
import { useGame } from '../../context/GameContext'

export default function SessionEnd({ score, streak, onRestart, onQuickRestart }) {
  const { rank, consecutiveHits } = useGame()

  // Dynamic feedback based on performance
  const feedback = useMemo(() => {
    if (score >= 1000) return {
      phrase: "¡Nivel fachero, bro!",
      emotion: "cool"
    }
    if (score >= 500) return {
      phrase: "Nada mal, humano.",
      emotion: "pleased"
    }
    if (score >= 200) return {
      phrase: "¿Es tu límite?",
      emotion: "silly"
    }
    if (score >= 100) return {
      phrase: "Meh... puedes más.",
      emotion: "unimpressed"
    }
    return {
      phrase: "¿En serio? Patético.",
      emotion: "stare"
    }
  }, [score])

  return (
    <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500 max-w-sm mx-auto">
      <div className="flex flex-col items-center gap-1">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-sky-50 rounded-full border border-sky-100 mb-1">
          <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">{rank}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight leading-none uppercase">Estadísticas</h2>
      </div>

      <div className="transform hover:scale-[1.01] transition-all duration-300">
        <ShareCard
          score={score}
          rank={rank}
          consecutiveHits={consecutiveHits}
          mascotPhrase={feedback.phrase}
          mascotEmotion={feedback.emotion}
        />
      </div>

      <div className="flex flex-col gap-2.5 pt-1 pb-2">
        {onQuickRestart && (
          <Button
            onClick={onQuickRestart}
            variant="primary"
            className="py-4 rounded-2xl text-sm sm:text-base font-black shadow-xl shadow-sky-100"
          >
            INTENTAR DE NUEVO
          </Button>
        )}
        {onRestart && (
          <Button
            onClick={onRestart}
            variant="outline"
            className="py-2.5 rounded-xl font-bold text-gray-400 border-none hover:bg-gray-50 text-[10px] uppercase tracking-[0.2em] w-full"
          >
            ← Volver al Menú
          </Button>
        )}
      </div>
    </div>
  )
}
