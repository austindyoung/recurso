# robo

Recursive Optimization through Bare Operation

### First-order recurrences

##### Factorial: conventional

```
// non-tail recursive
// call stack space: O(n)
// runtime: O(n)

const factorial = n =>
  n ? n * factorial(n - 1) : 1

```

```
// tail recursive
// call stack space: O(n) (without TCO)

const factorial = (n, acc = 1) =>
  n ? factorial(n - 1, n * acc) : acc
```

##### Factorial: with robo

```
// call stack space: O(1)
// general space: O(1)

const factorial = robo<number>({
  base: [1],
  recurrence: ([subcase], [n]) => n * subcase
})
```

### Higher-order recurrences

##### Fibonacci: conventional

```
// non-tail recursive
// call stack space: O(n)
// runtime: O(2 ^ n)

const fibonacci = n => {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
 }

```

```
// tail recursive
// call stack space (without TCO): O(n)

const fibonacci = (n, acc0 = 0, acc1 = 1) => {
  if (n === acc0) return acc0
  if (n === acc1) return acc1
  if (n === 1) return acc1
  return fibonacci(n - 1, acc1, acc0 + acc1)
 }
```

##### Fibonacci: with robo

```
// runtime: O(n)
// call stack space: O(1)
// general space: O(1)

const fibonacci = robo<number>({
  base: [0, 1],
  recurrence: ([subcase0, subcase1]) => subcase0 + subcase1
})
```

##### [Derangements:](https://en.wikipedia.org/wiki/Derangement) conventional

```
// non-tail recursive
// runtime: O(2 ^ n)
// call stack space: O(n)

const numDerangements = (n, acc0 = 1, acc1 = 0) => {
  if (n === acc0) return acc0
  if (n === acc1) return acc1
  return (n - 1) * (numDerangements(n - 1) + numDerangements(n - 2))
 }
```

```
// tail recursive
// runtime: O(n)
// call stack space (without TCO): O(n)

const numDerangements = n => {
  if (n === 0) return 1
  if (n === 1) return 0
  return numDerangements(n - 1, acc1, (n - 1) * (acc0 + acc1))
 }

```

##### [Derangements:](https://en.wikipedia.org/wiki/Derangement) with robo

```
// runtime: O(n)
// call stack space: O(1)
// general space: O(1)

const numDerangements = robo<number, number>({
  base: [1, 0],
  recurrence: ([subcase0, subcase1], [previous]) =>
    previous * (subcase0 + subcase1)
})
```

### List-based recurrences

##### Subsets: conventional

```
// call stack space: O(elements.length)
// general space: O(2 ^ n)

const subsets = elements => {
  if (!elements.length) return [[]]
  const subcase = subsets(elements.slice(1))
  return [...subcase, ...subcase.map(subset => [...subset, element])]
}


```

##### Subsets: with robo

```
// call stack space: O(1)
// general space: O(2 ^ n)

const subsets = roboList<number[][], number>({
  base: [[[]]],
  recurrence: ([subsets], [element]) => [
    ...subsets,
    ...subsets.map(subset => [...subset, element])
  ]
})
```

### General recurrences, `next` and `base` functions, `memoize`

##### Binomial coefficient: conventional

```
type Choose = {
  n: number
  k: number
}

const binomialCoefficient = robo<number, Choose>({
  base: ({ n, k }) => {
    if (k === 0) return 1
    if (n === k) return 1
  },
  next: ({ n, k }) => [{ n: n - 1, k: k - 1 }, { n, k: k - 1 }],
  recurrence: sum,
  memoize: true
})
```

##### Make change

```
// linear call call stack space, exponential runtime

```

```
// constant call call stack space, O(coins.length * target) runtime
interface Change {
  coins: number[]
  target: number
}

const makeChange = robo<number, Change>({
  base: ({ coins, target }) => {
    if (!coins.length) return 0
    if (target && !coins.length) return 0
    if (!target) return 1
  },
  next: ({ coins, target }) => [
    { coins, target: target - coins[0] },
    { coins: coins.slice(1), target }
  ],
  recurrence: sum,
  memoize: ({ coins, target }) => [coins.length, target]
})
```

### Recurrence parameters: tuplicity

##### Unbounded recurrence parameters

```
const powerOfTwo = robo<number, number>({
  base: [1],
  tuplicity: Infinity,
  recurrence: allPriorCases => sum(allPriorCases)
})
```

##### Constant tuplicity optimization
