const fibonacci = n => {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

const factorial = n => {
  if (n === 0) return 1
  return n * factorial(n - 1)
}

const factTail = (n, acc) => {
  if (n === 0) return acc
  return factTail(n - 1, n * acc)
}

const recursoFibonadci = recurso({
  recurrence: ([x, y]) => x + y,
  base: [0, 1],
})

const recursoFactorial = recurso({
  recurrence: ([x], n) => n * x,
  base: [1],
})
