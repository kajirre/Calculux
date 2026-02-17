import React from 'react'

export default function Container({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-white to-sky-50">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-white p-6 sm:p-10">
        {children}
      </div>
    </div>
  )
}
