import React from 'react'

export default function Feedback({ type, correct }) {
  if (type === 'correct') {
    return <div className="text-sm text-green-600 font-medium">¡Correcto!</div>
  }
  if (type === 'wrong') {
    return <div className="text-sm text-red-600 font-medium">Incorrecto — respuesta: {correct}</div>
  }
  return null
}
