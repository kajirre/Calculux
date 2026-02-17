import React from 'react'

export default function AnswerInput({ value, onChange, onSubmit, inputRef }) {
  return (
    <div className="flex gap-2 mb-3">
      <input
        ref={inputRef}
        inputMode="numeric"
        pattern="[0-9]*"
        className="flex-1 border rounded px-3 py-2 text-lg focus:outline-none focus:ring"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onSubmit() }}
        aria-label="Respuesta"
        autoFocus
      />
      <button onClick={onSubmit} className="px-3 py-2 bg-sky-600 text-white rounded">OK</button>
    </div>
  )
}
