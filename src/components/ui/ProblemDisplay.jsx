import React from 'react'

export default function ProblemDisplay({ a, b, op }) {
  const opMap = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷'
  }

  return (
    <div className="text-center w-full overflow-hidden">
      <div className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight break-words flex items-center justify-center flex-wrap gap-x-2">
        <span>{a}</span>
        <span className="text-sky-600">{opMap[op] || op}</span>
        <span>{b}</span>
        <span className="text-gray-300 tracking-tighter">= ?</span>
      </div>
    </div>
  )
}
