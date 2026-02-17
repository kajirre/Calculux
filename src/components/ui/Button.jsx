import React from 'react'

export default function Button({ onClick, children, variant = 'primary', disabled = false }) {
  const baseClass = 'px-3 py-2 rounded font-medium'
  const variantClass = variant === 'primary' ? 'bg-sky-600 text-white' : 'border'
  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
