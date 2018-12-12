type Mappable<T, Ordinal = number> = ((o: Ordinal) => T) | T[]
type Orderable<T> = ((o: number) => T) | Iterable<T> | IterableIterator<T>
type Nextable<Ordinal = number> =
  | ((o: Ordinal) => Ordinal)[]
  | ((o: Ordinal) => Ordinal[])
const identity = x => x
const MaxIterability = 1000
const MaxBase = 100
const DefaultRecurrence = ([x], [c]) => c
const access = (source, argument) =>
  typeof source === 'function' ? source(argument) : source[argument]
const getIteratedNextFunction = <Ordinal>(
  next: Nextable<Ordinal>,
  tuplicity: number
) => {
  return !(next instanceof Array)
    ? x =>
        Array.from(
          new Array(
            tuplicity === Infinity
              ? // && next === DefaultNext
                x
              : tuplicity > 0
              ? tuplicity - 1
              : 0
          )
        ).reduce((acc, _) => [...next(acc.slice(-1)[0]), ...acc], next(x))
    : x =>
        Array.from(new Array(tuplicity > 0 ? tuplicity - 1 : 0))
          .reduce(
            (acc, _) => [
              ...Array.from(new Array(next.length))
                .map(_ => acc.slice(-1).map(fn => _x => fn(fn(_x))))
                .reduce((acc, arr) => [...arr, ...acc]),
              ...acc
            ],
            next
          )
          .map(fn => fn(x))
}
const getDefaultTuplicity = <Ordinal, T>(
  next: Nextable<Ordinal>,
  base: Mappable<T, Ordinal>
) =>
  base instanceof Array ? base.length : next instanceof Array ? next.length : 1
const getFirstCases = <T>(iterator: IterableIterator<T>, n = 0) => {
  let count = 0
  let firstCases = []
  while (count < n) {
    firstCases = [...firstCases, iterator.next().value]
    count++
  }
  return firstCases.reduce<Map<T, number>>(
    (map, c, i) => map.set(c, i),
    new Map()
  )
}
const getGetBaseCaseAndFirstCases = <T, Ordinal>(
  base: T[],
  ordering: IterableIterator<Ordinal>
) => {
  const firstCases = getFirstCases<Ordinal>(ordering, base.length)
  return {
    firstCases,
    getBaseCase: recursiveCase =>
      base[
        [...new Array(base.length)]
          .map((_, i) => i)
          .filter(i => firstCases[i] === recursiveCase)[0]
      ] //error handling
  }
}

function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let iterationCount = 0
  for (let i = start; i < end; i += step) {
    iterationCount++
    yield i
  }
  return iterationCount
}

function* makeOffsetIterator<T>(orderable: Orderable<T>, offset = 0) {
  let iterationCount = 0
  const iterator = toIterator(orderable)
  let next = iterator.next()
  while (!next.done) {
    if (iterationCount >= offset) {
      yield next.value as T
    }
    next = iterator.next()
  }
}
function* toIterator<T>(orderable: Orderable<T>, max = MaxIterability) {
  let iterationCount = 0
  const handleException = () => {
    throw max === MaxIterability
      ? 'max iterability exceeded'
      : max === MaxBase
      ? 'max base cases exceeded'
      : 'generic iteration threshold exceeded message'
  }
  if (typeof orderable === 'function') {
    while (true) {
      if (iterationCount > max) handleException()
      iterationCount++
      yield orderable(iterationCount) as T
    }
  } else if (getIsIterator(orderable)) {
    for (const o of orderable) {
      handleException()
      iterationCount++
      yield o
    }
  }
}

const getIsIterable = obj => Symbol.iterator in Object(obj)
const getIsIterator = obj => getIsIterable(obj) && obj.next
// const getExplicitBaseFromOrdering = <T, Ordinal>({
//   base,
//   ordering = makeRangeIterator(),
//   offset = 0
// }: {
//   base: Mappable<T, Ordinal>
//   ordering: Orderable<Ordinal>
//   offset: number
// }) => {
//   if (base instanceof Array) return base
//   let i = 0
//   let _base = [] as T[]
//   if (typeof ordering === 'function') {
//   } else {
//     for (let internalCase of ordering) {
//       if (i > MaxIterability) {
//         throw 'base case overflow'
//       }
//       let nextValue = access(base, internalCase)
//       if (i === offset && nextValue === undefined) {
//         throw 'no base cases for tail optimization'
//       }
//       if (i > offset && nextValue === undefined) {
//         break
//       }
//       if (i >= offset) {
//         _base = [..._base, nextValue]
//       }
//       i++
//     }
//     return _base
//   }
// }
const _getBaseCaseResult = (
  recursiveCase,
  base,
  next,
  shouldAccumulate = false
) => {
  let currentCase = recursiveCase
  let nextCases
  let baseCaseResult = access(base, currentCase)
  let numIterations = 0
  let accs
  while (baseCaseResult === undefined && numIterations < MaxIterability) {
    numIterations += 1
    nextCases = next(currentCase)
    currentCase = nextCases.slice(-1)[0]
    baseCaseResult = access(base, currentCase)
    if (shouldAccumulate) {
      accs = [...accs, baseCaseResult]
    }
  }
  if (numIterations === MaxIterability) throw 'robo reached maximum iterations'
  return { baseCaseResult, accs }
}

const getBaseCaseResult = (recursiveCase, base, next) =>
  _getBaseCaseResult(recursiveCase, base, next).baseCaseResult

const getBaseCaseResults = (recursiveCase, base, next) =>
  _getBaseCaseResult(recursiveCase, base, next, true).accs
const DefaultNext = n => {
  if (typeof n === 'number') {
    return [n - 1] as any // `any` since no generic reflection
  }
  throw 'must provide next function for non-numeric ordinals'
  // for now
}

// export
// const _robo = <T, Ordinal = number>({
//   base,
//   memoize,
//   ordering = makeRangeIterator() as any,
//   next = DefaultNext,
//   recurrence = DefaultRecurrence,
//   tuplicity = getDefaultTuplicity<Ordinal, T>(next, base),
//   offset = 0,
//   optimizeRuntime = false
// }: // = getIsIterable(base) ? makeOffsetIterator(makeRangeIterator(), offset) : undefined // iterable or function
// {
//   base: Mappable<T, Ordinal>
//   ordering?: Orderable<Ordinal>
//   next?: Nextable<Ordinal>
//   recurrence?: (recursiveCases: T[], ordinals?: Ordinal[]) => T
//   tuplicity?: number
//   offset?: number
//   memoize?:
//     | ((o: Ordinal) => string | number)
//     | ((o: any) => string | number)[]
//     | true
//   optimizeRuntime?: boolean
// }) => (recursiveCase: Ordinal) => {
//   const _next = getIteratedNextFunction(next, tuplicity)

//   const isTailRecursive = recurrence === DefaultRecurrence
//   if (isTailRecursive) {
//     debugger
//     return getBaseCaseResult(recursiveCase, base, _next)
//   }
//   const innerIterator = makeOffsetIterator<Ordinal>(ordering, offset)
//   const shouldBeSinglePassOptimized = base instanceof Array

//   if (shouldBeSinglePassOptimized) {
//     const { getBaseCase, firstCases } = getGetBaseCaseAndFirstCases<T, Ordinal>(
//       base as T[],
//       innerIterator
//     )
//     const getIsTerminal = (currentCase: Ordinal) =>
//       getBaseCase(currentCase) !== undefined
//     if (getIsTerminal(recursiveCase)) {
//       return getBaseCase(recursiveCase)
//     }
//     interface MetaOrdinal<T, Ordinal> {
//       accs: T[]
//       outerCase: Ordinal
//       innerCases?: Ordinal[]
//     }

//     return _robo<T, MetaOrdinal<T, Ordinal>>({
//       base: ({ accs, outerCase }) => {
//         if (getIsTerminal(outerCase)) return accs.slice(-1)[0]
//       },
//       next: ({ accs, outerCase, innerCases }) => {
//         const lastAccs = accs.slice(tuplicity === Infinity ? 0 : 1)
//         const newAcc = recurrence(accs, innerCases)
//         const lastCases = innerCases.slice(tuplicity === Infinity ? 0 : 1)
//         const nextInnerCases = [...lastCases, innerIterator.next().value]
//         return [
//           {
//             accs: [...(tuplicity === Infinity ? [newAcc] : lastAccs), newAcc],
//             outerCase: _next(outerCase).slice(-1)[0],
//             innerCases: nextInnerCases
//           }
//         ]
//       }
//     })({
//       accs: getExplicitBaseFromOrdering({ base, ordering, offset }),
//       innerCases: firstCases,
//       outerCase: recursiveCase
//     })
//   }
  // const shouldBeDoublePassOptimized =
  //   !getIsSinglePassTailable && (!!ordering || getIsIterable(base))
  // if (shouldBeDoublePassOptimized) {
  //   // const accs = getBaseCaseResults(recursiveCase, base, _next)
  //   // return roboList<T>(base)
  // }
}
// export
// const roboList = <Element, R>({
//   base,
//   optimizeRuntime,
//   recurrence = DefaultRecurrence,
//   tuplicity = base instanceof Array ? base.length : undefined,
// }: {
//   base: Mappable<R, Element>
//   ordering?: Orderable<Element>
//   recurrence?: (recursiveCases: R[], elements: Element[], indices: number[]) => R
//   tuplicity?: number
//   optimizeRuntime?: boolean
// }) => (list: Element[]) =>
//   robo<R, number>({
//     base,
//     recurrence: (r, o) => ,
//     tuplicity,
//   })(list.length - 1)
const Has = (x, props, has: any[]) =>
  props.every(f => (has.indexOf(f) === -1 && !f(x)) || f(x))
type BaseArray<T> = { base: T[] }
const BaseArray = x => x.hasOwnProperty('base') && x.base instanceof Array
type BaseFunction<T, Ordinal> = { base: (o: Ordinal) => T }
const BaseFunction = x =>
  x.hasOwnProperty('base') && typeof x.base === 'function'
type Ordering<Ordinal> = { ordering: Orderable<Ordinal> }
const Ordering = x => x.hasOwnProperty('ordering')
type Next<Ordinal> = { next: Nextable<Ordinal> }
const Next = x => x.hasOwnProperty('next')
const Props = [BaseArray, BaseFunction, Ordering, Next]
type Memoize<Ordinal> = {
  memoize?:
    | ((o: Ordinal) => string | number)
    | ((o: any) => string | number)[]
    | true
}
type RoboRest<T, Ordinal> = {
  recurrence?: (recursiveCases: T[], ordinals?: Ordinal[]) => T
  tuplicity?: number
  offset?: number
}
type ImplicitLinear<T> = BaseArray<T> & RoboRest<T, number>
const ImplicitLinear = x =>
  Has(x, [BaseArray, BaseFunction, Ordering, Next], [BaseArray])
// const ImplicitLinear = <T>(x: ImplicitLinear<T>) => x.hasOwnProperty('base')
type ExplicitLinear<T, Ordinal> = BaseArray<T> &
  Ordering<Ordinal> &
  Next<Ordinal> &
  RoboRest<T, Ordinal>
const ExplicitLinear = x => x =>
  Has(x, [BaseArray, BaseFunction, Ordering, Next], [BaseArray, Ordering, Next])

type ExplicitIndefiniteLinear<T, Ordinal> = BaseFunction<T, Ordinal> &
  Ordering<Ordinal> &
  Next<Ordinal> &
  RoboRest<T, Ordinal>

const ExplicitIndefiniteLinear = x =>
  Has(
    x,
    [BaseArray, BaseFunction, Ordering, Next],
    [BaseFunction, Ordering, Next]
  )

type NonLinear<T, Ordinal> = BaseFunction<T, Ordinal> &
  Next<Ordinal> &
  Memoize<Ordinal> &
  RoboRest<T, Ordinal>
const NonLinear = x =>
  Has(x, [BaseArray, BaseFunction, Ordering, Next], [BaseFunction, Next])
const getGetBaseCase = <T, Ordinal>(firstCases: Ordinal[], base: T[]) => (
  recursiveCase: Ordinal
) => base[firstCases.indexOf(recursiveCase)]
const roboLinear = <T, Ordinal = number>({
  base,
  recurrence,
  ordering,
  tuplicity,
  offset,
  next
}: ExplicitLinear<T, Ordinal> &
  (Ordering<Ordinal> | Next<Ordinal>)) => recursiveCase => {
  const innerIterator = toIterator(ordering)
  const _next = getIteratedNextFunction(next, tuplicity)
  const firstCases = getFirstCases<Ordinal>(toIterator(ordering), offset)
  const getBaseCase = (recursiveCase: Ordinal) => firstCases.get(recursiveCase)
  const getIsTerminal = (currentCase: Ordinal) => currentCase === recursiveCase
  const caseIfBase = getBaseCase(recursiveCase)
  if (caseIfBase !== undefined) {
    caseIfBase
  }
  interface MetaOrdinal<T, Ordinal> {
    accs: T[]
    outerCase: Ordinal
    innerCases?: Ordinal[]
  }

  return robo<T, MetaOrdinal<T, Ordinal>>({
    base: ({ accs, outerCase }) => {
      if (getIsTerminal(outerCase)) return accs.slice(-1)[0]
    },
    next: ({ accs, outerCase, innerCases }) => {
      const lastAccs = accs.slice(tuplicity === Infinity ? 0 : 1)
      const newAcc = recurrence(accs, innerCases)
      const lastCases = innerCases.slice(tuplicity === Infinity ? 0 : 1)
      const nextInnerCases = [...lastCases, innerIterator.next().value]
      return [
        {
          accs: [...(tuplicity === Infinity ? [newAcc] : lastAccs), newAcc],
          outerCase: _next(outerCase).slice(-1)[0],
          innerCases: nextInnerCases
        }
      ]
    }
  })({
    accs: base,
    innerCases: [...firstCases.keys()],
    outerCase: recursiveCase
  })
}
const robo = <T, Ordinal = number>(
  params:
    | ImplicitLinear<T>
    | ExplicitLinear<T, Ordinal>
    | ExplicitIndefiniteLinear<T, Ordinal>
    | NonLinear<T, Ordinal>
) => {
  debugger
  if (ImplicitLinear(params)) {
    const ordering = makeOffsetIterator(makeRangeIterator(), params.offset)
    const next = getIteratedNextFunction(DefaultNext, params.tuplicity)
    return roboLinear<T>({
      ...(params as ImplicitLinear<T>),
      ordering,
      next
    })
  }
  if (ExplicitLinear(params)) {
    return roboLinear<T, Ordinal>(params as ExplicitLinear<T, Ordinal>)
  }
  if (ExplicitIndefiniteLinear(params)) {
  }
  if (NonLinear(params)) {
  }
}

declare let it
declare let expect
declare let describe

const getKbonacciSource = k => n => {
  if (n < k) return n
  return [...new Array(k)]
    .map((_, i) => getKbonacciSource(k)(n - i - 1))
    .reduce((sumAcc, c) => sumAcc + c, 0)
}

const triFibonacciSource = getKbonacciSource(3)
const quadFibonacciSource = getKbonacciSource(4)

const fibonacci = robo<number, number>({
  base: [0, 1],
  next: [n => n - 1],
  recurrence: ([subcase0, subcase1]) => subcase0 + subcase1
})

const factorial = robo<number, number>({
  base: [1],
  recurrence: ([subcase], [n]) => n * subcase
})

const sum = arr => arr.reduce((sumAcc, c) => sumAcc + c, 0)

const getKbonacci = k =>
  robo({
    base: [...new Array(k)].map((_, i) => i),
    recurrence: sum
  })

const triFibonacci = getKbonacci(3)
const quadFibonacci = getKbonacci(4)

const explicitFibonacci = robo<number, number>({
  base: [0, 1],
  next: [n => n - 2, n => n - 1],
  recurrence: ([subcase0, subcase1]) => subcase0 + subcase1
})

// const implicitExplicitFibonacci = robo<number, number>({
//   base: [0, 1],
//   next: [n => n - 1],
//   recurrence: ([subcase0, subcase1]) => subcase0 + subcase1,
// })

// const explicitFactorial = robo<number, number>({
//   base: [1],
//   next: [n => n - 1],
//   recurrence: ([x], [n]) => n * x,
// })

const numDerangements = robo<number, number>({
  base: [1, 0],
  recurrence: ([subcase0, subcase1], [_, previous]) =>
    previous * (subcase0 + subcase1)
})

// const explicitNumDerangements = robo<number, number>({
//   base: [1, 0],
//   next: [(n: number) => n - 1, (n: number) => n - 2],
//   recurrence: ([subcase0, subcase1], [_, previous]) =>
//     previous * (subcase0 + subcase1),
// })

// const subsets = <T>(l: T[]) =>
//   roboList<T[][]>({
//     base: [[[]]],
//     recurrence: ([subsets], [el]) => [
//       ...subsets,
//       ...subsets.map(subset => [el, ...subset]),
//     ],
//   })(l)

// const and = roboList({
//   base: x => {
//     if (!x) return false
//   },
//   recurrence: ([conjunction], [conjunct]) => conjunction && conjunct,
// })

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
      { coins: coins.slice(1), target }
    ],
    recurrence: sum,
    memoize: [coins => coins.length, target => target]
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
    }
  })

// const mergeSort = <T>(arr: T[]) =>
//   robo<T[], T[]>({
//     base: subArr => {
//       if (!subArr.length) return subArr
//     },
//     next: subArr => {
//       const mid = Math.floor(subArr.length / 2)
//       return [subArr.slice(0, mid), subArr.slice(mid)]
//     },
//     recurrence: ([left, right]) => merge(left, right)
//   })(arr)

// export
const test = () => {
  describe('fibonacci', function() {
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

// export { robo, roboList }
