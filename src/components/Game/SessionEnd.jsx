import React from 'react'
import Button from '../ui/Button'
import ShareCard from './ShareCard'
import { useGame } from '../../context/GameContext'

export default function SessionEnd({ score, streak, onRestart, onQuickRestart }) {
  const { rank, consecutiveHits } = useGame()
  const isHighScorer = score >= 1500

  return (
    <div className="mt-2 text-center space-y-4 animate-in slide-in-from-bottom duration-500 max-w-sm mx-auto overflow-hidden">
      <div className="space-y-2">
        <div className="text-xs font-black text-sky-500 uppercase tracking-[0.2em] mb-1 px-4 py-1.5 bg-sky-50 rounded-full inline-block">
          {rank}
        </div>
        <h2 className="text-3xl font-black text-gray-800 tracking-tight leading-none">¡Misión cumplida!</h2>
      </div>

      <ShareCard score={score} rank={rank} consecutiveHits={consecutiveHits} />

      <div className="flex flex-col gap-2.5 px-2">
        {onQuickRestart && (
          <Button onClick={onQuickRestart} variant="primary" className="py-3.5 rounded-xl text-base font-black shadow-lg shadow-sky-100">
            INTENTAR DE NUEVO
          </Button>
        )}
        {onRestart && (
          <Button onClick={onRestart} variant="outline" className="py-3.5 rounded-xl font-bold text-gray-400 border-none hover:bg-gray-50 text-sm">
            VOLVER AL MENÚ
          </Button>
        )}
      </div>
    </div>
  )
}
