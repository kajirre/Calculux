import { useState } from 'react'
import { generateLevel1 } from '../utils/generator'

export default function useSession({ total = 10 } = {}) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [problem, setProblem] = useState(() => generateLevel1())

  function next() {
    setProblem(generateLevel1())
    setIndex(i => i + 1)
  }

  function addScore(points = 100) { setScore(s => s + points) }

  return { index, score, problem, next, addScore }
}
