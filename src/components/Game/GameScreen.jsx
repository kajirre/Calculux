import React, { useEffect, useRef, useState, useCallback } from 'react'
import TimerBar from '../ui/TimerBar'
import AnswerInput from '../ui/AnswerInput'
import Button from '../ui/Button'
import ProblemDisplay from '../ui/ProblemDisplay'
import useTimer from '../../hooks/useTimer'
import useSpeech from '../../hooks/useSpeech'
import { validateAnswer } from '../../logic/validators'

export default function GameScreen({
  problem,
  onCorrect,
  onWrong,
  onFail,
  index,
  total,
  score,
  level = 1,
  feedback,
  settings = {}
}) {
  const [answer, setAnswer] = useState('')
  const inputRef = useRef(null)

  const MS_BY_LEVEL = {
    1: 10000,
    2: 12000,
    3: 15000,
    4: 18000,
    5: 20000,
    6: 25000
  }

  // Apply time multiplier from dynamic difficulty
  const baseMs = MS_BY_LEVEL[level] || 10000
  const ms = Math.floor(baseMs * (settings.timeMultiplier || 1))

  const { pct, reset, stop, start } = useTimer({
    ms,
    onExpire: () => {
      stop()
      onFail()
    }
  })

  const { active: micOn, start: startMic, stop: stopMic, supported } = useSpeech({
    lang: 'es-ES',
    onResult: (number) => {
      handleSubmit(number)
    },
  })

  useEffect(() => {
    inputRef.current?.focus()
    start()
    return () => stop()
  }, [start, stop])

  useEffect(() => {
    setAnswer('')
    if (feedback === null) {
      reset()
    }
    inputRef.current?.focus()
  }, [problem, reset, feedback])

  const handleSubmit = useCallback((value) => {
    const attempt = value !== undefined ? String(value).trim() : answer.trim()
    if (attempt === '' || Number.isNaN(Number(attempt))) return

    stop()

    if (validateAnswer(attempt, problem.answer)) {
      setAnswer('')
      onCorrect()
    } else {
      setAnswer('')
      onWrong(problem.answer)
    }
  }, [answer, problem, onCorrect, onWrong, stop])

  const toggleMic = useCallback(() => {
    if (micOn) stopMic()
    else startMic()
    inputRef.current?.focus()
  }, [micOn, startMic, stopMic])

  const isSuddenDeath = settings.isSuddenDeath

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <div>
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {isSuddenDeath ? 'Racha Actual' : 'Ejercicio'}
          </div>
          <div className="text-xl font-black text-gray-700">
            {isSuddenDeath ? (settings.consecutiveHits ?? 0) : `${index + 1} / ${total}`}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Puntaje</div>
          <div className="text-xl font-black text-sky-600 tracking-tighter">{score}</div>
        </div>
      </div>

      <TimerBar pct={pct} color={isSuddenDeath ? 'bg-rose-500' : 'bg-sky-500'} />

      <div className="py-10 min-h-[160px] flex items-center justify-center">
        {feedback?.type === 'wrong' ? (
          <div className="text-center animate-in zoom-in duration-300">
            <div className="text-6xl font-black text-rose-600 mb-4 drop-shadow-sm">✕</div>
            <div className="text-xl font-bold text-gray-500 uppercase tracking-wide mb-1">Resultado Correcto</div>
            <div className={`font-black text-6xl text-rose-600 ${isSuddenDeath ? 'animate-pulse' : ''}`}>
              {feedback.correct}
            </div>
          </div>
        ) : (
          <ProblemDisplay a={problem.a} b={problem.b} op={problem.op} />
        )}
      </div>

      <div className="flex gap-2 sm:gap-3">
        <AnswerInput
          value={answer}
          onChange={setAnswer}
          onSubmit={handleSubmit}
          inputRef={inputRef}
          disabled={pct === 0 || feedback !== null}
        />
        <Button
          onClick={() => handleSubmit()}
          variant="primary"
          disabled={pct === 0 || feedback !== null}
          className={`px-4 sm:px-8 rounded-2xl font-black text-base sm:text-lg ${isSuddenDeath ? 'bg-rose-600 shadow-rose-100 hover:bg-rose-700' : ''}`}
        >
          OK
        </Button>
      </div>

      {supported && !isSuddenDeath && (
        <div className="flex justify-center">
          <button
            onClick={toggleMic}
            disabled={pct === 0 || feedback !== null}
            className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all ${micOn ? 'bg-rose-50 text-rose-600' : 'bg-gray-50 text-gray-400'}`}
          >
            {micOn ? '• MIC Escuchando' : 'Mic: OFF'}
          </button>
        </div>
      )}
    </div>
  )
}
