import React from 'react'

export default function AnswerInput({ value, onChange, onSubmit, inputRef, disabled }) {
  function handleChange(e) {
    const newValue = e.target.value
    // Solo permitir dígitos
    const numericOnly = newValue.replace(/[^0-9]/g, '')
    onChange(numericOnly)
  }

  return (
    <input
      ref={inputRef}
      inputMode="numeric"
      pattern="[0-9]*"
      type="text"
      className="flex-1 bg-gray-50/50 border-2 border-transparent rounded-2xl px-5 py-4 text-2xl font-black text-gray-700 outline-none focus:border-sky-500 focus:bg-white transition-all placeholder:text-gray-300 disabled:opacity-50"
      placeholder="0"
      value={value}
      onChange={handleChange}
      onKeyDown={e => { if (e.key === 'Enter') onSubmit() }}
      aria-label="Respuesta"
      autoFocus
      disabled={disabled}
    />
  )
}
