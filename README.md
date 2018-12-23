![](https://i.ibb.co/QvMp9SY/robojs-Logo-Long.png)
**Recursive Optimization through Bare Operation**

- Eliminate recursive call stack consumption
- Modularize and abstract recurrence-based defintion
- Implicitly memoize

### First-order recurrences

##### Factorial: non-tail recursive

```
const factorial = n =>
  n ? n * factorial(n - 1) : 1
```

- call stack space: _O(n)_
- runtime: _O(n)_

##### Factorial: non-tail recursive

```
const factorial = (n, acc = 1) =>
  n ? factorial(n - 1, n * acc) : acc
```

- call stack space: _O(n)_ (without TCO)
- runtime: _O(n)_

---

##### Factorial: with `robo`

`robo: <T>({ base: T[] recurrence: ((results: T[], cases?: number[]) => T) }) => T`

```
const factorial = robo<number>({
  base: [1],
  recurrence: ([subcase], [n]) => n * subcase
})
```

- call stack space: _O(1)_
- general space: _O(1)_
- runtime: _O(n)_

---

### Higher-order recurrences

##### Fibonacci: non-tail recursive

```
const fibonacci = n => {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
 }
```

- call stack space: _O(n)_ (without TCO)
- runtime: _O(2<sup>n</sup>)_

##### Fibonacci: tail recursive

```
const fibonacci = (n, acc0 = 0, acc1 = 1) => {
  if (n === acc0) return acc0
  if (n === acc1) return acc1
  if (n === 1) return acc1
  return fibonacci(n - 1, acc1, acc0 + acc1)
 }
```

- call stack space: _O(n)_ (without TCO)
- runtime: _O(n)_

---

##### Fibonacci: with `robo`

`robo: <T>({ base: T[] recurrence: ((results: T[], cases?: number[]) => T) }) => T`

```
const fibonacci = robo<number>({
  base: [0, 1],
  recurrence: ([subcase0, subcase1]) => subcase0 + subcase1
  // recurrence: sum
})
```

- call stack space: _O(1)_
- general space: _O(1)_
- runtime: _O(n)_

---

##### [Derangements:](https://en.wikipedia.org/wiki/Derangement) non-tail recursive

```
const numDerangements = n => {
  if (n === acc0) return acc0
  if (n === acc1) return acc1
  return (n - 1) * (numDerangements(n - 1) + numDerangements(n - 2))
 }
```

- call stack space: _O(n)_
- runtime: _O(2<sup>n</sup>)_

##### [Derangements:](https://en.wikipedia.org/wiki/Derangement) tail recursive

```
const numDerangements = (n, acc0 = 1, acc1 = 0) => {
  if (n === 0) return 1
  if (n === 1) return 0
  return numDerangements(n - 1, acc1, (n - 1) * (acc0 + acc1))
 }
```

- runtime: _O(n)_
- call stack space (without TCO): _O(n)_

---

##### [Derangements:](https://en.wikipedia.org/wiki/Derangement) with `robo`

`robo: <T>({ base: T[] recurrence: ((results: T[], cases?: number[]) => T) }) => T`

```
const numDerangements = robo<number, number>({
  base: [1, 0],
  recurrence: ([subcase0, subcase1], [previous]) =>
    previous * (subcase0 + subcase1)
})
```

- runtime: _O(n)_
- call stack space: _O(1)_
- general space: _O(1)_

---

### List-based recurrences

##### Subsets: recursive

```
const subsets = <Element>(elements: Element[]) => {
  if (!elements.length) return [[]]
  const subcase = subsets(elements.slice(1))
  return [...subcase, ...subcase.map(subset => [...subset, element])]
}
```

- call stack space: _O(elements.length)_
- general space: _O(2<sup>n</sup>)_

---

##### Subsets: with `robo`

`robo: <T, Element>({ base: T[] recurrence: ((results: T[], cases?: Element[]) => T) }) => T`

```
const subsets = roboList<number[][], number>({
  base: [[[]]],
  recurrence: ([subsets], [element]) => [
    ...subsets,
    ...subsets.map(subset => [...subset, element])
  ]
})
```

- call stack space: _O(1)_
- general space: _O(2<sup>n</sup>)_

---

### General recurrences, `next` and `base` functions, `memoize`

##### Binomial coefficient: recursive

```
robo: <T, Ordinal>({
  base: (o: Ordinal) => T,
  next: (o: Ordinal) => Ordinal[],
  recurrence: ((results: T[], cases?: Ordinal[]) => T)
  memoize: boolean | (o: Ordinal) => string | number
}) => T
```

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

- stack space: _O(1)_
- general space: _O(k)_
- runtime: _O(nk)_

##### Make change

```
robo: <T, Ordinal>({
  base: (o: Ordinal) => T,
  next: (o: Ordinal) => Ordinal[],
  recurrence: ((results: T[], cases?: Ordinal[]) => T)
  memoize: boolean | (o: Ordinal) => string | number
}) => T
```

```
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

- stack space: _O(1)_
- general space: _O(Max(coins.length, target))_
- runtime: _O(coins.length \* target)_

---

### Unbounded recurrence parameters: `tuplicity`

#### Powers of two: complete induction recurrence

Powers of two satisfy the following mathematical equation:

> 2 <sup>n</sup> - 1 = 2<sup>0</sup> + ... + 2<sup>n - 1</sup>

From this we get the following (inefficient) recurrence where the number of used subcases is unbounded (scales with the input):

```

// Inefficient recurrence for powers of two

const powerOfTwo = n =>
n ? sum(range(0, n).map(powerOfTwo)) + 1 : 1

```

- stack space _O(n)_
- runtime: _O(2<sup>n</sup>)_

#### Powers of two: with `robo`

**For a `recurrence` function with a paramater that is unbounded in size, this must be specified by assigning the optional `tuplicity` parameter to `Infinity`:**

```

// Inefficient recurrence for powers of two

const powerOfTwo = robo<number, number>({
base: [1],
tuplicity: Infinity,
recurrence: cases => sum(cases) + 1
})

```

- stack space: _O(1)_
- general space: _O(n)_
- runtime: _O(n<sup>2</sup>)_

#### Bounded recurrence parameters: `tuplicity`

**Specify constant recurrence parameters size with `tuplicity` for space optimizations:**

```
const binaryTreeSearch = <T>(target: T) =>
  robo<Root<T>, Root<T>>({
    tuplicity: 2,
    base: node => {
      if (node.value === target) return node
      if (!node) return null
    },
    recurrence: ([left, right]) => left || right,
    next: node => [node.left, node.right]
})
```

**_or_ by representing `next` with an array**

```
const binaryTreeSearch = <T>(target: T) =>
  robo<Root<T>, Root<T>>({
    base: node => {
      if (node.value === target) return node
      if (!node) return null
    },
    recurrence: ([left, right]) => left || right,
    next: [node => node.left, node => node.right]
})

```
