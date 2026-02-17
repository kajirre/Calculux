/**
 * Generates a math problem based on level and selected operators.
 * Levels:
 * 1: Range 0-20, Tables 1-5
 * 2: Range 0-100, Tables 1-10
 * 3: Range 0-500, Tables 1-12, Simple Division
 * 4: Range 0-1000, Multipliers 2-digit x 1-digit
 * 5: Range 0-2500, Multipliers up to 20x20
 * 6: Range 0-10000, Multipliers 2nd digit complex
 */
export function generateProblem(level = 1, options = {}) {
  const { operators = ['+', '-'] } = options

  // Ensure we have at least one operator
  const ops = operators.length > 0 ? operators : ['+', '-']
  let op = ops[Math.floor(Math.random() * ops.length)]

  let a, b, answer

  switch (op) {
    case '+':
      const maxAdd = level * 20 * (level > 3 ? level : 1)
      a = Math.floor(Math.random() * (maxAdd + 1))
      b = Math.floor(Math.random() * (maxAdd + 1))
      answer = a + b
      break

    case '-':
      const maxSub = level * 20 * (level > 3 ? level : 1)
      a = Math.floor(Math.random() * (maxSub + 1))
      b = Math.floor(Math.random() * (maxSub + 1))
      if (a < b) [a, b] = [b, a] // No negatives for simplicity
      answer = a - b
      break

    case '*':
      let maxMultA, maxMultB
      if (level === 1) { maxMultA = 5; maxMultB = 5 }
      else if (level === 2) { maxMultA = 10; maxMultB = 10 }
      else if (level === 3) { maxMultA = 12; maxMultB = 12 }
      else if (level === 4) { maxMultA = 50; maxMultB = 10 }
      else if (level === 5) { maxMultA = 20; maxMultB = 20 }
      else { maxMultA = 100; maxMultB = 10 }

      a = Math.floor(Math.random() * maxMultA) + 1
      b = Math.floor(Math.random() * maxMultB) + 1
      answer = a * b
      break

    case '/':
      let maxDivBase
      if (level <= 2) maxDivBase = 10
      else if (level === 3) maxDivBase = 12
      else if (level === 4) maxDivBase = 20
      else if (level === 5) maxDivBase = 50
      else maxDivBase = 100

      const divisor = Math.floor(Math.random() * maxDivBase) + 1
      const quotient = Math.floor(Math.random() * 12) + 1
      a = divisor * quotient
      b = divisor
      answer = quotient
      break

    default:
      // Fallback to simple addition
      a = 1; b = 1; op = '+'; answer = 2
  }

  return { a, b, op, answer }
}
