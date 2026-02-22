import React from 'react'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import ShareCard from './ShareCard'
import { useGame } from '../../context/GameContext'
import Mascot from '../ui/Mascot'

export default function SessionEnd({ score, streak, onRestart, onQuickRestart }) {
  const { rank, consecutiveHits } = useGame()

  return (
    <div className="text-center space-y-3 animate-in fade-in zoom-in duration-500 max-w-sm mx-auto">
      <div className="flex flex-col items-center gap-1">
        <div className="relative mb-2">
          <Mascot emotion="joy" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-4 -right-10 bg-sky-600 text-white px-2.5 py-1 rounded-full text-[9px] font-black shadow-lg"
          >
            ¡BRUTAL! 🔥
          </motion.div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-sky-50 rounded-full border border-sky-100 mb-1">
          <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">{rank}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight leading-none uppercase">Misión Cumplida</h2>
      </div>

      <div className="transform hover:scale-[1.01] transition-all duration-300">
        <ShareCard score={score} rank={rank} consecutiveHits={consecutiveHits} />
      </div>

      <div className="flex flex-col gap-2 pt-1 pb-2">
        {onQuickRestart && (
          <Button
            onClick={onQuickRestart}
            variant="primary"
            className="py-3 sm:py-4 rounded-2xl text-sm sm:text-base font-black shadow-xl shadow-sky-100 flex items-center justify-center gap-2"
          >
            🔄 REPETIR DESAFÍO
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
