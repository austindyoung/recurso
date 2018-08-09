# recurso
Recursion optimization and abstraction utility
## First-order recursion
```
const fact = recurso(
  { base: [1], next: [n => n - 1] },
  ([nextCase], n) => n * nextCase
)
```


## Higher-order recursion
```
const fib = recurso(
  { base: [0, 1], next: [n => n - 2, n => n - 1] },
  ([x, y]) => x + y
)
```

```
const numDerangements = recurso(
  {
    base: [1, 0]
  },
  ([x, y], n) => (n - 1) * (x + y)
)
```

```
const buySell = recurso(
  {
    next: maxProfitNextCase,
    base: arr => {
      if (arr.length === 2) return arr[1] - arr[0]
      if (arr.length === 1) return 0
    }
  },
  ([leftMaxProft, rightMaxProfit], arr, [left, right]) => {
    return Math.max(
      leftMaxProft,
      rightMaxProfit,
      Math.max(...right) - Math.min(...left)
    )
  }
)
```
##List-based recursion
```
const efficientSubsets = recursoList(
  { base: [[[]]], next: [i => i - 1] },
  ([subsets], el) => [...subsets, ...subsets.map(subset => [el, ...subset])]
)
```

