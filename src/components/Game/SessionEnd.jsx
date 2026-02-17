import React from 'react'
import Button from '../ui/Button'
import ShareCard from './ShareCard'
import { useGame } from '../../context/GameContext'

export default function SessionEnd({ score, streak, onRestart, onQuickRestart }) {
  const { rank, consecutiveHits } = useGame()
  const isHighScorer = score >= 1500

  return (
    <div className="mt-4 text-center space-y-8 animate-in slide-in-from-bottom duration-500 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="text-sm font-black text-sky-500 uppercase tracking-[0.2em] mb-2 px-6 py-2 bg-sky-50 rounded-full inline-block">
          {rank}
        </div>
        <h2 className="text-4xl font-black text-gray-800 tracking-tight">¡Misión cumplida!</h2>
        <p className="text-gray-500 font-medium px-4">
          {isHighScorer
            ? 'Has demostrado ser una fuerza de la naturaleza matemática.'
            : 'Sigue entrenando para ascender al Rango Turing.'}
        </p>
      </div>

      <ShareCard score={score} rank={rank} consecutiveHits={consecutiveHits} />

      <div className="flex flex-col gap-3 px-4">
        {onQuickRestart && (
          <Button onClick={onQuickRestart} variant="primary" className="py-4 rounded-2xl text-lg font-black shadow-lg shadow-sky-100">
            INTENTAR DE NUEVO
          </Button>
        )}
        {onRestart && (
          <Button onClick={onRestart} variant="outline" className="py-4 rounded-2xl font-bold text-gray-400 border-none hover:bg-gray-50">
            VOLVER AL MENÚ
          </Button>
        )}
      </div>
    </div>
  )
}
