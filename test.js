const fib = recurso(
  { base: [0, 1], next: [n => n - 2, n => n - 1] , recurrence: ([x, y]) => x + y }  
)

const implicitFib = recurso(
  { base: [0, 1], next: n => n + 1 , recurrence: ([x, y]) => x + y}
)
// const triFib = recurso({ base: [0, 1, 2] }, ([x, y, z]) => x + y + z)
// const fibTail = num =>
//   recurso({
//     base: ({ acc1, acc2, n }) => {
//       if (n === 0) return acc1
//       if (n === 1) return acc2
//     },
//     next: [({ acc1, acc2, n }) => ({ acc1: acc2, acc2: acc1 + acc2, n: n - 1 })]
//   })({ acc1: 0, acc2: 1, n: num })

// const fact = recurso(
//   { base: [1], next: [n => n - 1] },
//   ([nextCase], n) => n * nextCase
// )

// const listFact = arr =>
//   recurso(
//     {
//       base: a => {
//         debugger
//         if (a.length === 0) return 1
//       },
//       ordering: i => arr.slice(0, i),
//       next: [a => a.slice(0, a.length - 1)]
//     },
//     ([x], n) => n[0] * x
//   )(arr)

// const listFib = arr => {
//   return recurso(
//     {
//       base: a => {
//         if (a.length === 1 || a.length === 2) return a.length - 1
//       },
//       ordering: i => arr.slice(0, i),
//       next: [a => a.slice(2), a => a.slice(1)]
//     },
//     ([x, y]) => x + y
//   )(arr)
// }

// const shorthandEfficientListFib = recursoList(
//   {
//     base: [0, 1]
//   },
//   ([x, y]) => x + y
// )

// const sumFirstPos = recursoList(
//   {
//     base: (n, survey) => {
//       if (n < 0) return 0
//     }
//   },
//   ([x], el, survey) => el + x,
//   (numOdds, el) => numOdds + (el % 2)
// )

// const nullHeadLength = recursoList(
//   {
//     base: n => {
//       if (n !== 0) return 1
//     }
//   },
//   ([x]) => 1 + x
// )

// const nullHeadFib = l =>
//   recursoList(
//     {
//       base: (n, i) => {
//         if (l[i] === 0 && l[i - 1] !== 0) return 1
//         if (l[i] !== 0) return 0
//       }
//     },
//     ([x, y]) => x + y
//   )(l)

// const efficientListFact = arr =>
//   recurso(
//     {
//       base: [1],
//       next: [a => a - 1]
//     },
//     ([x], i) => arr[i - 1] * x
//   )(arr.length)

// const shorthandEfficientListFact = recursoList({ base: [1] }, ([x], n) => n * x)
// const sumFirstOdd = arr => {
//   return recursoList(
//     {
//       base: ([n]) => {
//         if (n % 2) return 0
//       }
//     },
//     ([x], n) => n + x
//   )(arr)
// }

// const numDerangements = recurso(
//   {
//     base: [1, 0]
//   },
//   ([x, y], n) => (n - 1) * (x + y)
// )

// const numDerangementsList = l =>
//   recursoList(
//     {
//       base: [1, 0]
//     },
//     ([x, y], n, i) => l[i - 1] * (x + y)
//   )(l)

// const length = s =>
//   recurso(
//     {
//       base: s => {
//         if (s.length === 0) return 0
//       },
//       next: [s => s.slice(1)],
//       ordering: i => s.slice(i)
//     },
//     ([x]) => 1 + x
//   )(s)

// const subsets = elements =>
//   recurso(
//     {
//       base: [[[]]],
//       next: [elements => elements.slice(1)],
//       ordering: i => elements.slice(i)
//     },
//     ([subsets], remainingElements) => [
//       ...subsets,
//       ...subsets.map(subset => [remainingElements[0], ...subset])
//     ]
//   )(elements)

// const efficientSubsets = recursoList(
//   { base: [[[]]], next: [i => i - 1] },
//   ([subsets], el) => [...subsets, ...subsets.map(subset => [el, ...subset])]
// )

// const cons = recursoList({ base: [[]], next: [i => i - 1] }, ([x], n) => [
//   n,
//   ...x
// ])

// const nest = recursoList(
//   { base: [1, 1], next: [i => 1 - 2, i => i - 1] },
//   ([x, y], n) => n * x * y
// )

// const divide = arr => {
//   const halfLength = Math.ceil(arr.length / 2)
//   const mid = arr[halfLength - 1]
//   const [left, right] = [
//     arr.slice(0, Math.ceil(arr.length / 2)),
//     arr.slice(Math.ceil(arr.length / 2))
//   ]
//   return [left, right]
// }
// const divideWithMid = arr => {
//   const [left, right] = divide(arr)
//   const mid = right[0]
//   return { left, mid, right: right.slice(1) }
// }
// const maxProfitNextCase = divide

// const maxProfitIndicesNextCase = arr => {
//   const { left, right } = divide(arr)
//   return [[0, left.length], [left.length, left.length + right.length]]
// }

// const buySell = recurso(
//   {
//     next: maxProfitNextCase,
//     base: arr => {
//       if (arr.length === 2) return arr[1] - arr[0]
//       if (arr.length === 1) return 0
//     }
//   },
//   ([leftMaxProft, rightMaxProfit], arr, [left, right]) => {
//     return Math.max(
//       leftMaxProft,
//       rightMaxProfit,
//       Math.max(...right) - Math.min(...left)
//     )
//   }
// )
// const maxBy = (arr, toNumber) => {
//   arr.reduce((acc, key) => (toNumber(acc) > toNumber(key) ? acc : key))
// }

// const minBy = (arr, toNumber) => {
//   arr.reduce((acc, key) => (toNumber(acc) < toNumber(key) ? acc : key))
// }

// const buySellIndices = arr =>
//   recurso(
//     {
//       next: maxProfitIndicesNextCase,
//       base: ([left, right]) => {
//         if (left - right === 1) return arr[1] - arr[0]
//         if (arr.length === 0) return 0
//       }
//     },
//     (
//       [
//         [leftMaxProftstart, leftMaxProftEnd],
//         [rightMaxProfitStart, rightMaxProfitEnd]
//       ],
//       [leftIndex, rightIndex],
//       [[leftStart, leftEnd], [rightStart, rightEnd]]
//     ) =>
//       maxBy(
//         [
//           [leftMaxProftstart, leftMaxProftEnd],
//           [rightMaxProfitStart, rightMaxProfitEnd],
//           [
//             minBy(
//               Array.from(new Array(leftIndexEnd - leftIndexStart + 1)),
//               k => arr[k]
//             ),
//             maxBy(
//               Array.from(new Array(rightIndexEnd - rightIndexStart + 1)).map(
//                 x => x + leftEnd
//               ),
//               k => arr[k]
//             )
//           ]
//         ],
//         ([s, e]) => arr[e] - arr[s]
//       )
//   )(arr)

// const binarySearch = (arr, target) => {
//   return recurso({
//     next: ([{ arrayCase, displacement }]) => {
//       const { left, right, mid } = divideWithMid(arrayCase)
//       return mid === target
//         ? [{ arrayCase: [mid], displacement: displacement + left.length }]
//         : target < mid
//           ? [{ arrayCase: left, displacement }]
//           : [{ arrayCase: right, displacement: displacement + left.length }]
//     },
//     base: ({ arrayCase, displacement }) => {
//       if (arrayCase.length === 1 && arrayCase[0] === target) return displacement
//       if (arrayCase.length === 1 || !arrayCase.length) return null
//     }
//   })({ arrayCase: arr, displacement: 0 }).displacement
// }
// const test = (name, f, cases) => {
//   console.log(name + ':***\n')
//   cases.forEach(([k, v]) => {
//     if (f(k) !== v) {
//       console.log(k)
//       console.log(f(k) === v)
//     }
//   })
// }
// const mergeSort = recurso(
//   {
//     base: arr => {
//       if (arr.length <= 1) return arr
//     }
//   },
//   (sortedLeft, sortedRight) => {
//     const { arr, i } = sortedLeft.reduce(
//       (acc, el, i) =>
//         sortedRight.length - 1 < i && el < sortedRight[i]
//           ? { arr: [...acc.arr, el], i }
//           : sortedRight.length < i && el > sortedRight[i]
//             ? { arr: [...acc.arr, sortedRight[i]], i }
//             : sortedRight.length < i && el === sortedRight[i]
//               ? { arr: [...acc.arr, el, el], i }
//               : { arr: [...acc.arr, el], i },
//       { arr: [], i: 0 }
//     )
//     return [...arr, ...sortedRight.slice(i)]
//   }
// )

// const powerOfTwo =
//   recurso(
//     {
//       base: [1],
//       tuplicity: Infinity
//     },
//     (powers, n) => powers.reduce((x, y) => )
//   )

// const indeterminateRecursion = recurso(
//   {
//     base: arr => {
//       if (arr === null) return null
//       if (arr.length === 1) return arr
//     },
//     next: [
//       arr => {
//         return arr.reduce(
//           (acc, el, i) => el > arr[0] && indeterminateRecursion(arr.slice(i)),
//           null
//         )
//       }
//     ]
//   },
//   ([x], n) => (x ? [n[0], ...x] : null)
// )

// const nonTerminal = recurso({
//   base: [0],
//   next: [x => x]
// })

// const factCont = recurso(
//   {
//     base: n => {
//       if (!n) return 1
//     },
//     next: [n => n - 1]
//   },
//   ([x], n) => x * n
// )

// const consCont = recurso(
//   {
//     base: n => {
//       if (!n) return [n]
//     },
//     next: [n => n - 1]
//   },
//   ([x], n) => [n, ...x]
// )
// const nestCont = recurso(
//   {
//     base: n => {
//       if (!n) return [n]
//     },
//     next: [n => n - 1]
//   },
//   ([x], n) => [n, x]
// )

// const isBalancedRecurse = ({ left, right }) => {
//   const leafResult = { height: 0, isBalanced: true }
//   const { height: leftHeight, isBalanced: isLeftBalanced } = left
//     ? isBalancedRecurse(left)
//     : leafResult
//   const { height: rightHeight, isBalanced: isRightBalanced } = right
//     ? isBalancedRecurse(right)
//     : leafResult
//   return {
//     height: 1 + Math.max(leftHeight, rightHeight),
//     isBalanced:
//       isLeftBalanced &&
//       isRightBalanced &&
//       Math.abs(leftHeight - rightHeight) <= 1
//   }
// }

// const isBalanced = ({ left, right }) =>
//   isBalancedRecurse({ left, right }).isBalanced

// const nestContWithorder = recurso(
//   {
//     base: n => {
//       if (!n) return [n]
//     },
//     next: [n => n - 1],
//     order: 2
//   },
//   ([x], n) => [n, x]
// )

// const treeCont = n => {
//   return recurso(
//     {
//       base: n => {
//         if (!n || n === 1) return [n]
//       },
//       next: [n => n - 2, n => n - 1]
//     },
//     ([x, y], n) => [y[0] + x[0], y, x]
//   )(n)
// }
// const tree = recurso(
//   {
//     base: [[0], [1]],
//     next: [n => n - 2, n => n - 1]
//   },
//   ([x, y], n) => [y[0] + x[0], y, x]
// )

// const fibCont = n => {
//   return recurso(
//     {
//       base: n => {
//         if (!n) return 0
//         if (n === 1) return 1
//       },
//       next: [n => n - 2, n => n - 1]
//     },
//     ([x, y]) => x + y
//   )(n)
// }
// const derangementCont = recurso(
//   {
//     base: n => {
//       if (!n) return 1
//       if (n === 1) return 0
//     },
//     next: [n => n - 2, n => n - 1]
//   },
//   ([x, y], n) => (n - 1) * (x + y)
// )

// const curry = (fn, params = []) => param =>
//   param ? curry(fn, [...params, param]) : fn(...params)
// const compose = (fn, ...fns) => (...args) =>
//   fns.length ? fn(compose(...fns)(...args)) : fn(...args)
// const curryCompose = curry(compose)

// const sum = (...args) => args.reduce((x, y) => x + y, 0)
// const curriedSum = curry(sum)
// const increment = x => x + 1
// const choose = (n, k) => fact(n) / (fact(n - k) * fact(k))
// const treeProb = (n, d, t, p) =>
//   n && d && t
//     ? new Array(n)
//         .fill()
//         .reduce(
//           (acc, _, i) =>
//             acc + treeProb(n - i, d - 1, t, p) * treeProb(i, d, t, p),
//           0
//         )
//     : !n
//       ? Math.pow(Math.pow(1 - p, t), d)
//       : !d
//         ? Math.pow(p, n) * choose(t, n)
//         : null
// // const derangementCont = maxOdds =>
// //   recurso(
// //     {
// //       base: (n, { oddsSoFar }) => {
// //         if (oddsSoFar) if (!n) return 1
// //         if (n === 1) return 0
// //       },
// //       next: [n => n - 2, n => n - 1]
// //     },
// //     ([x, y], n, { oddsSoFar, prevCase }) => prevCase * (x + y),
// //     ({ oddsSoFar, prevCase }, n) => ({
// //       oddsSoFar: oddsSoFar + n % 2,
// //       prevCase: n
// //     })
// //   )

describe('single pass optimization works for', function() {
  describe('fibonacci', function() {
    it('base cases', function() {
      expect(fib(0)).toBe(0)
      expect(fib(1)).toBe(1)
    })
    it('rest', function() {
      expect(fib(2)).toBe(1)
      expect(fib(3)).toBe(2)
      expect(fib(4)).toBe(3)
      expect(fib(5)).toBe(5)
      expect(fib(6)).toBe(8)
    })
  })

  // describe('tri fib', function() {
  //   it('base cases', function() {
  //     expect(triFib(0)).toBe(0)
  //     expect(triFib(1)).toBe(1)
  //     expect(triFib(2)).toBe(2)
  //   })
  //   it('rest', function() {
  //     expect(triFib(3)).toBe(3)
  //     expect(triFib(4)).toBe(6)
  //     expect(triFib(5)).toBe(11)
  //     expect(triFib(6)).toBe(20)
  //     expect(triFib(7)).toBe(37)
  //   })
  // })
  // describe('factorial', function() {
  //   it('base cases', function() {
  //     expect(fact(0)).toBe(1)
  //   })
  //   it('rest', function() {
  //     expect(fact(1)).toBe(1)
  //     expect(fact(2)).toBe(2)
  //     expect(fact(3)).toBe(6)
  //     expect(fact(4)).toBe(24)
  //   })
  // })

  // describe('power of two', function() {
  //   it('base cases', function() {
  //     expect(powerOfTwo(0)).toBe(1)
  //   })
  //   it('rest', function() {
  //     debugger
  //     expect(powerOfTwo(1)).toBe(1)
  //     expect(powerOfTwo(2)).toBe(2)
  //     expect(powerOfTwo(3)).toBe(4)
  //     expect(powerOfTwo(4)).toBe(8)
  //   })
  // })

  // describe('list factorial', function() {
  //   it('base cases', function() {
  //     expect(listFact([])).toBe(1)
  //   })
  //   it('rest', function() {
  //     expect(listFact([1, 2])).toBe(2)
  //     expect(listFact([1, 2, 3])).toBe(6)
  //     expect(listFact([1, 2, 3, 4])).toBe(24)
  //   })
  })

//   describe('efficient list factorial', function() {
//     it('base cases', function() {
//       expect(efficientListFact([])).toBe(1)
//     })
//     it('rest', function() {
//       expect(efficientListFact([1, 2])).toBe(2)
//       expect(efficientListFact([1, 2, 3])).toBe(6)
//       expect(efficientListFact([1, 2, 3, 4])).toBe(24)
//     })
//   })

//   describe('shorthand list factorial', function() {
//     it('base cases', function() {
//       expect(shorthandEfficientListFact([])).toBe(1)
//     })
//     it('rest', function() {
//       expect(shorthandEfficientListFact([1])).toBe(1)
//       expect(shorthandEfficientListFact([1, 2])).toBe(2)
//       expect(shorthandEfficientListFact([1, 2, 3])).toBe(6)
//       expect(shorthandEfficientListFact([1, 2, 3, 4])).toBe(24)
//     })
//   })

//   describe('list fibonacci', function() {
//     it('base cases', function() {
//       expect(listFib([1])).toBe(0)
//       expect(listFib([1, 1])).toBe(1)
//     })
//     it('rest', function() {
//       expect(listFib([1, 1, 1])).toBe(1)
//       expect(listFib([1, 1, 1, 1])).toBe(2)
//       expect(listFib([1, 1, 1, 1, 1])).toBe(3)
//       expect(listFib([1, 1, 1, 1, 1, 1])).toBe(5)
//       expect(listFib([1, 1, 1, 1, 1, 1, 1])).toBe(8)
//     })
//   })

//   describe('shorthand list fibonacci', function() {
//     it('base cases', function() {
//       expect(shorthandEfficientListFib([])).toBe(0)
//       expect(shorthandEfficientListFib([1])).toBe(1)
//     })
//     it('rest', function() {
//       expect(shorthandEfficientListFib([1, 1])).toBe(1)
//       expect(shorthandEfficientListFib([1, 1, 1])).toBe(2)
//       expect(shorthandEfficientListFib([1, 1, 1, 1])).toBe(3)
//       expect(shorthandEfficientListFib([1, 1, 1, 1, 1])).toBe(5)
//       expect(shorthandEfficientListFib([1, 1, 1, 1, 1, 1])).toBe(8)
//       expect(shorthandEfficientListFib([1, 1, 1, 1, 1, 1, 1])).toBe(13)
//     })
//   })

//   //   describe('shorthand efficient list subsets', function() {
//   //     it('base cases', function() {
//   //       expect(efficientSubsets([])).toEqual([[]])
//   //     })
//   //     it('rest', function() {
//   //       expect(efficientSubsets([1])).toEqual([[], [1]])
//   //       expect(efficientSubsets([1, 2])).toEqual([[], [1], [2], [2, 1]])
//   //       expect(efficientSubsets([1, 2, 3])).toEqual([
//   //         [],
//   //         [1],
//   //         [2],
//   //         [2, 1],
//   //         [3],
//   //         [3, 1],
//   //         [3, 2],
//   //         [3, 2, 1]
//   //       ])
//   //     })
//   //   })

//   //   describe('derangements', function() {
//   //     it('base cases', function() {
//   //       expect(numDerangements(0)).toBe(1)
//   //       expect(numDerangements(1)).toBe(0)
//   //     })
//   //     it('rest', function() {
//   //       expect(numDerangements(2)).toBe(1)
//   //       expect(numDerangements(3)).toBe(2)
//   //       expect(numDerangements(4)).toBe(9)
//   //       expect(numDerangements(5)).toBe(44)
//   //     })
//   //   })

//   //   describe('cons', function() {
//   //     it('base cases', function() {
//   //       expect(cons([])).toEqual([])
//   //     })
//   //     it('rest', function() {
//   //       expect(cons([1, 2, 3])).toEqual([3, 2, 1])
//   //     })
//   //   })

//   //   describe('double pass fact', function() {
//   //     it('base cases', function() {
//   //       expect(factCont(0)).toEqual(1)
//   //     })
//   //     it('rest', function() {
//   //       expect(factCont(3)).toEqual(6)
//   //       expect(factCont(4)).toEqual(24)
//   //     })
//   //   })

//   //   describe('double pass fib', function() {
//   //     it('base cases', function() {
//   //       expect(fibCont(0)).toEqual(0)
//   //       expect(fibCont(1)).toEqual(1)
//   //     })
//   //     it('rest', function() {
//   //       expect(fibCont(2)).toEqual(1)
//   //       expect(fibCont(3)).toEqual(2)
//   //       expect(fibCont(4)).toEqual(3)
//   //       expect(fibCont(5)).toEqual(5)
//   //       expect(fibCont(6)).toEqual(8)
//   //     })
//   //   })

//   //   describe('double pass derangements', function() {
//   //     it('base cases', function() {
//   //       expect(derangementCont(0)).toEqual(1)
//   //       expect(derangementCont(1)).toEqual(0)
//   //     })
//   //     it('rest', function() {
//   //       expect(derangementCont(2)).toEqual(1)
//   //       expect(derangementCont(3)).toEqual(2)
//   //       expect(derangementCont(4)).toEqual(9)
//   //       expect(derangementCont(5)).toEqual(44)
//   //     })
//   //   })

//   //   describe('double pass point cons', function() {
//   //     it('base cases', function() {
//   //       expect(consCont(0)).toEqual([0])
//   //     })
//   //     it('rest', function() {
//   //       expect(consCont(3)).toEqual([3, 2, 1, 0])
//   //     })
//   //   })

//   //   describe('double pass point nest', function() {
//   //     it('base cases', function() {
//   //       expect(nestCont(0)).toEqual([0])
//   //     })
//   //     it('rest', function() {
//   //       expect(nestCont(3)).toEqual([3, [2, [1, [0]]]])
//   //     })
//   //   })

//   //   describe('single pass tree', function() {
//   //     it('base cases', function() {
//   //       expect(tree(0)).toEqual([0])
//   //       expect(tree(1)).toEqual([1])
//   //     })
//   //     it('rest', function() {
//   //       expect(tree(7)).toEqual(
//   //         JSON.parse(
//   //           '[13,[8,[5,[3,[2,[1,[1],[0]],[1]],[1,[1],[0]]],[2,[1,[1],[0]],[1]]],[3,[2,[1,[1],[0]],[1]],[1,[1],[0]]]],[5,[3,[2,[1,[1],[0]],[1]],[1,[1],[0]]],[2,[1,[1],[0]],[1]]]]'
//   //         )
//   //       )
//   //     })
//   //   })

//   //   describe('double pass tree', function() {
//   //     it('base cases', function() {
//   //       expect(treeCont(0)).toEqual([0])
//   //       expect(treeCont(1)).toEqual([1])
//   //     })
//   //     it('rest', function() {
//   //       expect(treeCont(7)).toEqual(
//   //         JSON.parse(
//   //           '[13,[8,[5,[3,[2,[1,[1],[0]],[1]],[1,[1],[0]]],[2,[1,[1],[0]],[1]]],[3,[2,[1,[1],[0]],[1]],[1,[1],[0]]]],[5,[3,[2,[1,[1],[0]],[1]],[1,[1],[0]]],[2,[1,[1],[0]],[1]]]]'
//   //         )
//   //       )
//   //     })
//   //   })
// })
