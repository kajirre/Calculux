import React from 'react'
import { GameProvider, useGame } from './context/GameContext'
import Container from './components/Layout/Container'
import GameScreen from './components/Game/GameScreen'
import SessionEnd from './components/Game/SessionEnd'
import Feedback from './components/Game/Feedback'
import StartScreen from './components/Game/StartScreen'

function GameContent() {
  const { index, score, problem, running, feedback, streak, settings, started, handleCorrect, handleWrong, startGame, restart, restartQuick } = useGame()

  const onFail = () => {
    handleWrong(problem?.answer)
  }

  return (
    <Container>
      {!started ? (
        <StartScreen onStart={startGame} defaultLevel={settings.level} />
      ) : running ? (
        <>
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
        </>
      ) : (
        <SessionEnd score={score} streak={settings && settings.streak ? settings.streak : streak} onRestart={restart} onQuickRestart={restartQuick} />
      )}
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
