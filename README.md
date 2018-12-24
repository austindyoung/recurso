![](https://i.ibb.co/QvMp9SY/robojs-Logo-Long.png)
**Recursive Optimization through Bare Operation**

- Eliminate recursive call stack consumption
- Modularize and abstract recurrence-based defintion
- Implicitly memoize

## Usage

### First-order recurrences

#### Factorial

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

<details><summary><strong>Performance comparison</strong></summary>
  <p>

|                      | Non-tail recursive | Tail recursive (without TCO) | `robo` |
| -------------------- | ------------------ | ---------------------------- | ------ |
| **call stack space** | O(n)               | O(n)                         | O(1)   |
| **global space**     | O(1)               | O(1)                         | O(1)   |
| **runtime**          | O(n)               | O(n)                         | O(n)   |

</p>
</details></summary>

---

### Higher-order recurrences

#### Fibonacci

`robo: <T>({ base: T[], recurrence: ((results: T[], cases?: number[]) => T) }) => T`

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

<details><summary><strong>Performance comparison</strong></summary>
  <p>

|                      | Non-tail recursive | Tail recursive (without TCO) | `robo` |
| -------------------- | ------------------ | ---------------------------- | ------ |
| **call stack space** | O(n)               | O(n)                         | O(1)   |
| **global space**     | O(1)               | O(1)                         | O(1)   |
| **runtime**          | O(2<sup>n</sup>)   | O(n)                         | O(n)   |

</p>
</details></summary>

---

#### [Derangements](https://en.wikipedia.org/wiki/Derangement)

`robo: <T>({ base: T[], recurrence: ((results: T[], cases?: number[]) => T) }) => T`

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

<details><summary><strong>Performance comparison</strong></summary>
  <p>

|                      | Non-tail recursive | Tail recursive (without TCO) | `robo` |
| -------------------- | ------------------ | ---------------------------- | ------ |
| **call stack space** | O(n)               | O(n)                         | O(1)   |
| **global space**     | O(1)               | O(1)                         | O(1)   |
| **runtime**          | O(2<sup>n</sup>)   | O(n)                         | O(n)   |

</p>
</details></summary>

---

### List-based recurrences

##### Subsets

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

<details><summary><strong>Performance comparison</strong></summary>
  <p>

|                      | Recursive          | `robo`           |
| -------------------- | ------------------ | ---------------- |
| **call stack space** | O(elements.length) | O(1)             |
| **global space**     | O(2<sup>n</sup>)   | O(2<sup>n</sup>) |

</p>
</details></summary>

---

### General recurrences: `next` and `base` functions, `memoize`

##### Binomial coefficient

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

- call stack space: _O(1)_
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

- call stack space: _O(1)_
- general space: _O(Max(coins.length, target))_
- runtime: _O(coins.length \* target)_

---

### Unbounded recurrence parameters: `tuplicity`

#### Powers of two: complete induction recurrence

Powers of two satisfy the following mathematical equation:

> 2 <sup>n</sup> - 1 = 2<sup>0</sup> + ... + 2<sup>n - 1</sup>

From this we get the following (inefficient) recurrence where the number of used subcases is unbounded (scales with the input):

> powerOfTwo(n) = powerOfTwo(0) + ... + powerOfTwo(n - 1)

> powerOfTwo(0) = 1

**For a `recurrence` function with a paramater that is unbounded in size, this must be specified by assigning the optional `tuplicity` parameter to `Infinity`:**

```
// Inefficient recurrence for powers of two

const powerOfTwo = robo<number, number>({
  tuplicity: Infinity,
  base: [1],
  recurrence: cases => sum(cases) + 1
})
```

- call stack space: _O(1)_
- general space: _O(n)_
- runtime: _O(n<sup>2</sup>)_

<details><summary><strong>Performance comparison</strong></summary>
  <p>

|                      | Non-tail recursive | [Tail recursive]() (without TCO) | `robo` |
| -------------------- | ------------------ | -------------------------------- | ------ |
| **call stack space** | O(n)               | O(n)                             | O(1)   |
| **global space**     | O(1)               | O(1)                             | O(1)   |
| **runtime**          | O(n!)              | O(n)                             | O(n)   |

</p>
</details></summary>

---

### Bounded recurrence parameters: `tuplicity`

**Specify constant recurrence parameters size with `tuplicity` parameter for space optimizations:**

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
