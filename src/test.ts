// import { robo, roboList } from './robo'
let describe
let it
let expect
const getKbonacciSource = k => n => {
  debugger
  if (n < k) return n
  return [...new Array(k)]
    .map((_, i) => getKbonacciSource(k)(n - i - 1))
    .reduce((sumAcc, c) => sumAcc + c, 0)
}

const triFibonacciSource = getKbonacciSource(3)
const quadFibonacciSource = getKbonacciSource(4)

const fibonacci = robo<number, number>({
  base: [0, 1],
  recurrence: ([x, y]) => x + y,
})

const factorial = robo<number, number>({
  base: [1],
  recurrence: ([x], n: number) => n * x,
})

const sum = arr => arr.reduce((sumAcc, c) => sumAcc + c, 0)

const getKbonacci = k =>
  robo({
    base: [...new Array(k)].map((_, i) => i),
    recurrence: sum,
  })

const triFibonacci = getKbonacci(3)
const quadFibonacci = getKbonacci(4)

const explicitFibonacci = robo<number, number>({
  base: [0, 1],
  next: [n => n - 2, n => n - 1],
  recurrence: ([x, y]) => x + y,
})

const implicitExplicitFibonacci = robo<number, number>({
  base: [0, 1],
  next: [n => n - 1],
  recurrence: ([x, y]) => x + y,
})

const explicitFactorial = robo<number, number>({
  base: [1],
  next: [n => n - 1],
  recurrence: ([x], n) => n * x,
})

const numDerangements = robo<number, number>({
  base: [1, 0],
  recurrence: ([x, y], n: number) => (n - 1) * (x + y),
})

const explicitNumDerangements = robo<number, number>({
  base: [1, 0],
  next: [(n: number) => n - 1, (n: number) => n - 2],
  recurrence: ([x, y], n) => (n - 1) * (x + y),
})

const subsets = l =>
  roboList(l, {
    base: [[[]]],
    recurrence: ([subsets], el) => [
      ...subsets,
      ...subsets.map(subset => [el, ...subset]),
    ],
  })

const and = l =>
  roboList(l, {
    base: x => {
      if (!x) return false
    },
    recurrence: ([conjunction], conjunct) => conjunction && conjunct,
  })(l)
interface Change {
  coins: number[]
  target: number
}
const makeChange = (coins, target) =>
  robo<number, Change>({
    base: ({ coins, target }) => {
      if (!coins.length) return 0
      if (!target) return 1
      if (target && !coins.length) return 0
    },
    next: ({ coins, target }) => [
      { coins, target: target - coins[0] },
      { coins: coins.slice(1), target },
    ],
    recurrence: sum,
    memoize: [coins => coins.length, target => target],
  })({ coins, target })

interface BinarySearch<T> {
  subArr: T[]
  displacement: number
}

const binarySearch = <T>(arr: T[], target: T) =>
  robo<number, BinarySearch<T>>({
    base: ({ subArr, displacement }) => {
      if (!subArr.length) return -1
      if (subArr[0] === target) return displacement
    },
    next: ({ subArr, displacement }) => {
      const mid = Math.floor(subArr.length / 2)
      if (target <= subArr[mid])
        return [{ subArr: subArr.slice(0, mid), displacement }]
      return [{ subArr: subArr.slice(mid), displacement: mid + displacement }]
    },
  })

export const test = () => {
  describe('single pass optimization works for', function() {
    describe('fibonacci', function() {
      it('base cases', function() {
        expect(explicitFibonacci(0)).toBe(0)
        expect(explicitFibonacci(1)).toBe(1)
      })
      it('rest', function() {
        expect(explicitFibonacci(2)).toBe(1)
        expect(explicitFibonacci(3)).toBe(2)
        expect(explicitFibonacci(4)).toBe(3)
        expect(explicitFibonacci(5)).toBe(5)
        expect(explicitFibonacci(6)).toBe(8)
      })
    })

    describe('implicit fibonacci', function() {
      it('base cases', function() {
        expect(implicitExplicitFibonacci(0)).toBe(0)
        expect(implicitExplicitFibonacci(1)).toBe(1)
      })
      it('rest', function() {
        expect(implicitExplicitFibonacci(2)).toBe(1)
        expect(implicitExplicitFibonacci(3)).toBe(2)
        expect(implicitExplicitFibonacci(4)).toBe(3)
        expect(implicitExplicitFibonacci(5)).toBe(5)
        expect(implicitExplicitFibonacci(6)).toBe(8)
      })
    })

    describe('super implicit fibonacci', function() {
      it('base cases', function() {
        expect(fibonacci(0)).toBe(0)
        expect(fibonacci(1)).toBe(1)
      })
      it('rest', function() {
        expect(fibonacci(2)).toBe(1)
        expect(fibonacci(3)).toBe(2)
        expect(fibonacci(4)).toBe(3)
        expect(fibonacci(5)).toBe(5)
        expect(fibonacci(6)).toBe(8)
      })
    })

    describe('test tribonacci', function() {
      it('base cases', function() {
        expect(triFibonacci(0)).toBe(triFibonacciSource(0))
        expect(triFibonacci(1)).toBe(triFibonacciSource(1))
      })
      it('rest', function() {
        expect(triFibonacci(2)).toBe(triFibonacciSource(2))
        expect(triFibonacci(3)).toBe(triFibonacciSource(3))
        expect(triFibonacci(4)).toBe(triFibonacciSource(4))
        expect(triFibonacci(5)).toBe(triFibonacciSource(5))
        expect(triFibonacci(6)).toBe(triFibonacciSource(6))
      })
    })

    describe('test quadbonacci', function() {
      it('base cases', function() {
        expect(quadFibonacci(0)).toBe(quadFibonacciSource(0))
        expect(quadFibonacci(1)).toBe(quadFibonacciSource(1))
      })
      it('rest', function() {
        expect(quadFibonacci(2)).toBe(quadFibonacciSource(2))
        expect(quadFibonacci(3)).toBe(quadFibonacciSource(3))
        expect(quadFibonacci(4)).toBe(quadFibonacciSource(4))
        expect(quadFibonacci(5)).toBe(quadFibonacciSource(5))
        expect(quadFibonacci(6)).toBe(quadFibonacciSource(6))
      })
    })

    describe('factorial', function() {
      it('base cases', function() {
        expect(factorial(0)).toBe(1)
      })
      it('rest', function() {
        expect(factorial(1)).toBe(1)
        expect(factorial(2)).toBe(2)
        expect(factorial(3)).toBe(6)
        expect(factorial(4)).toBe(24)
      })
    })

    describe('explicit factorial', function() {
      it('base cases', function() {
        expect(explicitFactorial(0)).toBe(1)
      })
      it('rest', function() {
        expect(explicitFactorial(1)).toBe(1)
        expect(explicitFactorial(2)).toBe(2)
        expect(explicitFactorial(3)).toBe(6)
        expect(explicitFactorial(4)).toBe(24)
      })
    })

    describe('derangements', function() {
      it('base cases', function() {
        expect(numDerangements(0)).toBe(1)
        expect(numDerangements(1)).toBe(0)
      })
      it('rest', function() {
        expect(numDerangements(2)).toBe(1)
        expect(numDerangements(3)).toBe(2)
        expect(numDerangements(4)).toBe(9)
        expect(numDerangements(5)).toBe(44)
      })
    })
  })
  describe('single pass optimization with custom ordering works for', function() {})

  describe('double pass optimization works for', function() {})

  describe('double pass optimization with custom ordering works for', function() {})

  describe('double pass time optimization works for', function() {})

  describe('double pass time optimization with custom ordering works for', function() {})

  describe('double pass space optimization works for', function() {})

  describe('double pass space optimization with custom ordering works for', function() {})

  describe('list recursion works for', function() {})

  describe('list recursion with short circuiting works for', function() {})

  describe('divide-and-conqceur works for', function() {})
  describe('divide-and-conqceur implicit single-dimensional memoization works for', function() {})

  describe('divide-and-conqceur explicit multi-dimensional memoization works for', function() {})
}
test()
