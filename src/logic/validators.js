export function validateAnswer(userAnswer, correct) {
  const num = Number(userAnswer)
  if (Number.isNaN(num)) return false
  return num === correct
}

export function extractNumber(text) {
  const match = text.match(/-?\d+/)
  return match ? match[0] : null
}
