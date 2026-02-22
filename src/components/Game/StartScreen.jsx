import React, { useState } from 'react'
import { motion } from 'framer-motion'

const LEVELS = [
  { id: 1, label: 'Novato', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { id: 2, label: 'Iniciado', color: 'bg-sky-50 text-sky-700 border-sky-100' },
  { id: 3, label: 'Intermedio', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
  { id: 4, label: 'Avanzado', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { id: 5, label: 'Experto', color: 'bg-rose-50 text-rose-700 border-rose-100' },
  { id: 6, label: 'Maestro', color: 'bg-purple-50 text-purple-700 border-purple-100' },
]

export default function StartScreen({ onStart, defaultLevel = 1 }) {
  const [step, setStep] = useState(1)
  const [level, setLevel] = useState(defaultLevel)
  const [operators, setOperators] = useState(['+', '-'])
  const [total, setTotal] = useState(10)
  const [isSuddenDeath, setIsSuddenDeath] = useState(false)

  function toggleOp(op) {
    setOperators(prev => {
      const newOps = prev.includes(op) ? prev.filter(p => p !== op) : [...prev, op]
      return newOps.length > 0 ? newOps : prev // Evitar desmarcar todas
    })
  }

  function handleStart() {
    if (!operators.length) return
    onStart({ level: Number(level), operators, totalExercises: Number(total), isSuddenDeath })
  }

  const selectedLevel = LEVELS.find(l => l.id === level)

  return (
    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
      {step === 1 ? (
        <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-500">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Selecciona tu Rango</div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {LEVELS.map((l) => (
              <motion.button
                key={l.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setLevel(l.id)
                  setStep(2)
                }}
                className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 transition-all ${l.color} border-transparent shadow-sm`}
              >
                <span className="font-bold text-sm sm:text-base">{l.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3 animate-in slide-in-from-right-4 duration-500">
          <button
            onClick={() => setStep(1)}
            className="text-[10px] font-black text-sky-600 hover:text-sky-700 flex items-center gap-1 uppercase tracking-wider mb-2"
          >
            ← Volver
          </button>

          <div className={`p-3 rounded-xl border-2 flex items-center justify-between shadow-sm ${selectedLevel.color}`}>
            <div className="flex items-center gap-2">
              <div>
                <div className="text-[10px] font-black uppercase opacity-60 tracking-wider">Modo</div>
                <div className="font-black text-lg leading-none">{selectedLevel.label}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <div className="font-black text-gray-700 uppercase text-[10px] tracking-wider">Muerte Súbita</div>
              <div className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">Infinito + Velocidad</div>
            </div>
            <button
              onClick={() => setIsSuddenDeath(!isSuddenDeath)}
              className={`w-10 h-6 rounded-full transition-all relative ${isSuddenDeath ? 'bg-rose-500' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${isSuddenDeath ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Operaciones</div>
            <div className="flex gap-2">
              {[
                { id: '+', label: 'Suma', icon: '+' },
                { id: '-', label: 'Resta', icon: '−' },
                { id: '*', label: 'Mult', icon: '×' },
                { id: '/', label: 'Div', icon: '÷' },
              ].map(op => (
                <button
                  key={op.id}
                  onClick={() => toggleOp(op.id)}
                  className={`flex-1 py-3 rounded-lg border-2 font-black transition-all ${operators.includes(op.id) ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-sm shadow-sky-100' : 'border-gray-50 text-gray-300 hover:border-gray-100'}`}
                >
                  <div className="text-xl">{op.icon}</div>
                </button>
              ))}
            </div>
          </div>

          {!isSuddenDeath && (
            <div className="flex items-end justify-between gap-4 animate-in fade-in duration-300 px-1">
              <div className="flex-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Ejercicios</label>
                <div className="flex items-center bg-gray-50 rounded-xl px-1">
                  <button onClick={() => setTotal(Math.max(5, total - 5))} className="p-2 text-gray-400 font-black">-</button>
                  <input
                    type="number"
                    value={total}
                    readOnly
                    className="w-full bg-transparent border-none text-center font-black text-gray-700 py-2 text-base"
                  />
                  <button onClick={() => setTotal(Math.min(50, total + 5))} className="p-2 text-gray-400 font-black">+</button>
                </div>
              </div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className={`w-full py-4 rounded-xl font-black text-lg shadow-lg transition-all ${isSuddenDeath ? 'bg-rose-600 text-white shadow-rose-200' : 'bg-sky-600 text-white shadow-sky-200'}`}
          >
            {isSuddenDeath ? 'INICIAR RETO' : '¡EMPEZAR!'}
          </motion.button>
        </div>
      )}
    </div>
  )
}
