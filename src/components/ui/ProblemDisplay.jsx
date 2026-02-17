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
      <div className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight break-words">
        {a} <span className="text-sky-600 mx-1 sm:mx-2">{opMap[op] || op}</span> {b}
      </div>
      <div className="text-3xl sm:text-4xl font-black text-gray-300 mt-2">= ?</div>
    </div>
  )
}
