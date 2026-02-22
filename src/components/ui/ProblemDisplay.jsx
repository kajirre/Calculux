import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProblemDisplay({ a, b, op }) {
  const opMap = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷'
  }

  return (
    <div className="text-center w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${a}-${op}-${b}`}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8, transition: { duration: 0.1 } }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight break-words flex items-center justify-center flex-wrap gap-x-2"
        >
          <span>{a}</span>
          <span className="text-sky-600">{opMap[op] || op}</span>
          <span>{b}</span>
          <span className="text-gray-300 tracking-tighter">= ?</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
