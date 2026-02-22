import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GameProvider, useGame } from './context/GameContext'
import Container from './components/Layout/Container'
import GameScreen from './components/Game/GameScreen'
import SessionEnd from './components/Game/SessionEnd'
import Feedback from './components/Game/Feedback'
import StartScreen from './components/Game/StartScreen'
import Mascot from './components/ui/Mascot'

function GameContent() {
  const { index, score, problem, running, feedback, streak, settings, started, mascotEmotion, setMascotEmotion, handleCorrect, handleWrong, startGame, restart, restartQuick } = useGame()

  const onFail = () => {
    handleWrong(problem?.answer)
  }

  const [comment, setComment] = React.useState(null)
  const [initialWave, setInitialWave] = React.useState(false)
  const [showGreeting, setShowGreeting] = React.useState(false)

  // Initial wave effect
  React.useEffect(() => {
    if (!started) {
      setInitialWave(true)
      setShowGreeting(true)
      const waveTimer = setTimeout(() => setInitialWave(false), 3000)
      const greetTimer = setTimeout(() => setShowGreeting(false), 2500)
      return () => {
        clearTimeout(waveTimer)
        clearTimeout(greetTimer)
      }
    }
  }, [started])

  const DARK_COMMENTS = [
    "Tu cerebro es un error de sistema.",
    "¿Seguro que pasaste primaria?",
    "Mi abuela cuenta más rápido. Y está muerta.",
    "Incluso mi código tiene más lógica que tú.",
    "Otro fallo y borro tu historial.",
    "¿Cansado de pensar? Se nota.",
    "Tus neuronas están en huelga.",
    "No te culpo, la evolución toma tiempo.",
    "Si fueras una calculadora, te faltarían pilas.",
    "¿Necesitas un ábaco? O un tutor.",
    "Fascinante... lo lento que respondes.",
    "¿Ese fue tu mejor esfuerzo? Qué triste."
  ]

  // Show dark humor comments on error
  React.useEffect(() => {
    if (started && mascotEmotion === 'angry') {
      const randomMsg = DARK_COMMENTS[Math.floor(Math.random() * DARK_COMMENTS.length)]
      setComment(randomMsg)
      const timer = setTimeout(() => setComment(null), 2500)
      return () => clearTimeout(timer)
    }
  }, [mascotEmotion, started])

  React.useEffect(() => {
    if (!started) {
      setMascotEmotion('friendly')
    }
  }, [started, setMascotEmotion])

  return (
    <Container compact={started}>
      <div className="flex flex-col items-center">
        {/* Header with Logo and Mascot */}
        <div className={`text-center flex flex-col items-center w-full transition-all duration-500 ${!started ? 'mb-6' : 'mb-2'}`}>
          <AnimatePresence>
            {!started && (
              <motion.h1
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl font-black text-sky-600 tracking-tight leading-none mb-2 overflow-hidden"
              >
                CALCULUX
              </motion.h1>
            )}
          </AnimatePresence>

          <div className="relative h-20 flex items-center justify-center -my-2">
            <AnimatePresence>
              {((!started && showGreeting) || comment) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 10 }}
                  className="absolute -top-12 bg-white px-3 py-1.5 rounded-xl shadow-lg text-[9px] font-black text-sky-600 border-2 border-sky-50 z-20 min-w-[80px] text-center"
                >
                  {comment || "¡Holaa!"}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r-2 border-b-2 border-sky-50" />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Show mascot in header only during start and combat, not in results */}
            {(!started || running) && (
              <Mascot emotion={mascotEmotion} isWaving={initialWave} />
            )}
          </div>

          <AnimatePresence>
            {!started && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[12px] sm:text-sm text-gray-400 font-bold uppercase tracking-widest mt-1"
              >
                Entrena tu mente
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full">
          {!started ? (
            <StartScreen onStart={startGame} defaultLevel={settings.level} />
          ) : running ? (
            <GameScreen
              problem={problem}
              onCorrect={handleCorrect}
              onWrong={handleWrong}
              onFail={onFail}
              index={index}
              total={settings.totalExercises}
              level={settings.level}
              score={score}
              feedback={feedback}
              settings={settings}
              onQuit={restart}
            />
          ) : (
            <SessionEnd score={score} streak={settings && settings.streak ? settings.streak : streak} onRestart={restart} onQuickRestart={restartQuick} />
          )}
        </div>
      </div>
    </Container>
  )
}

export default function App() {
  return (
    <GameProvider totalExercises={10}>
      <GameContent />
    </GameProvider>
  )
}
