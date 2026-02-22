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

  React.useEffect(() => {
    if (!started) {
      setMascotEmotion('friendly')
    }
  }, [started, setMascotEmotion])

  return (
    <Container>
      <div className="flex flex-col items-center">
        {/* Header with Logo and Mascot */}
        <div className="text-center mb-6 flex flex-col items-center w-full">
          <h1 className="text-4xl sm:text-5xl font-black text-sky-600 tracking-tight leading-none mb-2">CALCULUX</h1>

          <div className="relative h-24 flex items-center justify-center -my-2">
            <AnimatePresence>
              {!started && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 10 }}
                  className="absolute -top-10 bg-white px-3 py-1.5 rounded-xl shadow-lg text-[10px] font-black text-sky-600 border-2 border-sky-50 z-20"
                >
                  ¡Hola! ¿Listo?
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r-2 border-b-2 border-sky-50" />
                </motion.div>
              )}
            </AnimatePresence>
            <Mascot emotion={mascotEmotion} />
          </div>

          <p className="text-[12px] sm:text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">
            {!started ? "Entrena tu mente" : running ? "En Combate" : "Resultados"}
          </p>
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
