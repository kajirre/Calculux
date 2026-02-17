export function generateLevel1() {
  const op = Math.random() < 0.5 ? '+' : '-'
  let a = Math.floor(Math.random() * 21)
  let b = Math.floor(Math.random() * 21)
  if (op === '-' && a < b) [a, b] = [b, a]
  const answer = op === '+' ? a + b : a - b
  return { a, b, op, answer }
}
