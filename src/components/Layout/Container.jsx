import React from 'react'

export default function Container({ children, compact = false }) {
  return (
    <div className="h-[100dvh] w-full fixed inset-0 overflow-hidden flex items-start justify-center pt-2 sm:items-center sm:pt-0 p-3 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-white to-sky-50">
      <div className={`w-full ${compact ? 'max-w-xs sm:max-w-sm' : 'max-w-xl'} transform transition-all duration-500 bg-white/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-white p-4 sm:p-8 animate-fade-in-scale overflow-y-auto max-h-[95vh]`}>
        {children}
      </div>
    </div>
  )
}
