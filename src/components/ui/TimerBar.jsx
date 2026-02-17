import React from 'react'

export default function TimerBar({ pct, color: customColor }) {
  const dynamicColor = pct > 0.6 ? 'bg-emerald-500' : pct > 0.3 ? 'bg-amber-400' : 'bg-rose-500'
  const color = customColor || dynamicColor

  return (
    <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
      <div
        className={`${color} h-full transition-[width] duration-150 ease-linear rounded-full`}
        style={{ width: `${pct * 100}%` }}
      />
    </div>
  )
}
