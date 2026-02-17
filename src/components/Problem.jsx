import React from 'react'

export default function Problem({ a, b, op }) {
  return (
    <div className="text-center mb-4">
      <div className="text-2xl font-semibold">{a} {op} {b} = ?</div>
    </div>
  )
}
