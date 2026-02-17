import React from 'react'

export default function SessionSummary({ score, streak, onRestart }) {
  return (
    <div className="mt-4 text-center">
      <div className="text-lg">Sesión finalizada</div>
      <div className="text-sm text-gray-600">Puntaje final: {score}</div>
      <div className="text-sm text-gray-600">Racha: {streak}</div>
      {onRestart && (
        <div className="mt-2">
          <button onClick={onRestart} className="px-3 py-2 bg-sky-600 text-white rounded">Reiniciar</button>
        </div>
      )}
    </div>
  )
}
