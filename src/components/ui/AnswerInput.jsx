import React from 'react'

export default function AnswerInput({ value, onChange, onSubmit, inputRef, disabled, className = "" }) {
  function handleChange(e) {
    const newValue = e.target.value
    const numericOnly = newValue.replace(/[^0-9-]/g, '') // Permitir signo negativo también
    onChange(numericOnly)
  }

  return (
    <input
      ref={inputRef}
      inputMode="numeric"
      pattern="[0-9]*"
      type="text"
      className={`min-w-0 flex-1 bg-gray-50/50 border-2 border-transparent rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-xl sm:text-2xl font-black text-gray-700 outline-none focus:border-sky-500 focus:bg-white transition-all placeholder:text-gray-300 disabled:opacity-50 ${className}`}
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
