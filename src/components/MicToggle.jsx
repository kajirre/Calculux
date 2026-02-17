import React from 'react'

export default function MicToggle({ micOn, onToggle }) {
  return (
    <button onClick={onToggle} className={`px-3 py-2 rounded border ${micOn ? 'bg-gray-100' : ''}`}>
      {micOn ? 'Mic: ON' : 'Mic: OFF'}
    </button>
  )
}
