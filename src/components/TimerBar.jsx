import React from 'react'

export default function TimerBar({ pct }) {
  const color = pct > 0.6 ? 'bg-green-500' : pct > 0.3 ? 'bg-yellow-400' : 'bg-red-500'
  return (
    <div className="h-2 mb-4 bg-gray-200 rounded overflow-hidden">
      <div className={`${color} h-2`} style={{ width: `${pct * 100}%` }} />
    </div>
  )
}
