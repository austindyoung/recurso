const identity = x => x
const DefaultAggregator = identity
const MaxIterability = 100000
const DefaultNext = x => [x.slice ? x.slice(-1) : x - 1]
const UndefinedTuplicity = {}
const getIteratedNextFunction = (order, next, tuplicity) => {
  return !(next instanceof Array)
    ? x =>
        Array.from(
          new Array(
            tuplicity === Infinity && next === DefaultNext
              ? x
              : order > 0
                ? order - 1
                : 0
          )
        ).reduce((acc, _) => [...next(...acc.slice(-1)), ...acc], next(x))
    : x =>
        Array.from(new Array(order > 0 ? order - 1 : 0))
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
const getDefaultTuplicity = (next, base, order) =>
  next !== DefaultNext && next instanceof Array
    ? next.length * order
    : next !== DefaultNext && base instanceof Array
      ? null
      : base instanceof Array
        ? base.length * order
        : null
const getDefaultOrdering = (base, next) =>
  base instanceof Array || next === DefaultNext ? identity : null
const getBaseCase = (cse, base) =>
  typeof base === 'function' ? base(cse) : base[cse]
// const getExplicitBase = (base, cse, next, getFromOrder) => {
//   if (!(typeof getFromOrder === 'function')) throw 'ordering must be function'
//   if (base instanceof Array) return base
//   let explicitBase = []
//   let cse = 0
//   while (getBaseCase(getFromOrder(cse), base) === undefined) {
//     cse += 1
//   }
//   let caseResult = getBaseCase(getFromOrder(cse), base)
//   while (caseResult !== undefined) {
//     cse += 1
//     explicitBase = [...explicitBase, caseResult]
//     caseResult = getBaseCase(getFromOrder(cse), base)
//   }
//   return explicitBase
// }
const recurso = (
  {
    base,
    memoize,
    order = 1,
    next = DefaultNext,
    tuplicity = getDefaultTuplicity(next, base, order),
    ordering = getDefaultOrdering(base, next),
    optimize = { associative: false }
  } = {},
  aggregate = DefaultAggregator
) => n => {
  const getFromOrder = ordering instanceof Array ? i => ordering[i] : ordering
  const areCasesInt = ordering === identity
  const isBaseArray = next instanceof Array
  const isTailBased = aggregate === DefaultAggregator
  const isPossiblyTailable = !!tuplicity
  const hasImplicitTuplicity = next instanceof Array
  const nextSize = hasImplicitTuplicity && next.length
  const shouldBeSinglePassOptimized =
    //next === DefaultNext
    ordering && tuplicity
  const shouldBeDoublePassTailOptimized = tuplicity && ordering

  const _next = getIteratedNextFunction(
    next === DefaultNext && base instanceof Array ? base.length : order,
    next,
    tuplicity
  )
  const isAggregateFree = aggregate === DefaultAggregator

  const getIsTerminal = (c, b = base) => getBaseCase(c, b) !== undefined
  if (isAggregateFree) {
    let currentCase = n
    let nextCases
    let baseCaseResult = getBaseCase(currentCase, base)
    let numIterations = 0
    while (baseCaseResult === undefined && numIterations < MaxIterability) {
      numIterations += 1
      nextCases = _next(currentCase)
      currentCase = nextCases.slice(-1)[0]
      baseCaseResult = getBaseCase(currentCase, base)
    }
    if (numIterations === MaxIterability)
      throw 'recurso reached maximum iterations'
    return baseCaseResult
  }
  if (shouldBeSinglePassOptimized) {
    const { accs, c, count, baseBase } = recurso({
      base: ({ accs, c, count, baseBase }) => {
        if (getIsTerminal(c, baseBase)) return { accs, count, baseBase, c }
      },
      next: ({ accs, c, count, baseBase }) => {
        const lastAccs = accs.slice(tuplicity === Infinity ? 0 : 1)
        const newAcc = aggregate(accs, getFromOrder(count), count)
        return [
          {
            accs: [...(tuplicity === Infinity ? [newAcc] : lastAccs), newAcc],
            c: _next(c).slice(-1)[0],
            count: count + 1,
            baseBase
          }
        ]
      },
      tuplicity,
      ordering
    })({
      accs:
        ordering === identity
          ? base
          : tuplicity !== Infinity && base instanceof Array
            ? base
            : Array.from(new Array(tuplicity)).map((_, i) => {
                if (typeof base === 'function') return base(getFromOrder(i))
                else throw 'base case must be function or Array'
              }),
      c: n,
      count: base.length,
      baseBase: base
    })
    return count <= baseBase.length
      ? getBaseCase(c, baseBase)
      : accs.slice(-1)[0]
  }
  const getBaseCases = c => {
    let acc = [getBaseCase(c)]
    let [cse] = _next(c).slice(-1)
    let value = getBaseCase(cse)

    while (value !== undefined) {
      acc = [value, ...acc]
      cse = _next(cse)
      value = getBaseCase(cse)
    }
    return acc
  }

  if (shouldBeDoublePassTailOptimized) {
    return recurso({
      base: ({ c, baseBase, cont }) => {
        if (getIsTerminal(c, baseBase)) {
          return cont(getBaseCases(c))
        }
      },
      next: ({ c, cont, baseBase }) => [
        {
          cont: continuationAccs => {
            const lastAccs = continuationAccs.slice(
              tuplicity === Infinity ? 0 : 1
            )
            const newAcc = aggregate(continuationAccs, c)
            return cont([...lastAccs, newAcc])
          },
          c: _next(c).slice(-1)[0],
          baseBase
        }
      ],
      tuplicity,
      ordering
    })({
      cont: x => x.slice(-1)[0],
      c: n,
      baseBase: base
    })
  } else {
    const getMemoKey = memoize || (x => x)
    const memo = {}
    const recurse = currentCase => {
      const baseCaseResult = base(currentCase)
      if (memoize && memo[getMemoKey(currentCase)]) {
        return memo[getMemoKey(currentCase)]
      }
      const result =
        baseCaseResult === undefined
          ? aggregate(
              _next(currentCase).map(recurse),
              currentCase,
              _next(currentCase)
            )
          : baseCaseResult
      if (memoize) {
        memo[getMemoKey(currentCase)] = result
      }
      return result
    }
    return recurse(n)
  }
}

const recursoList = (
  {
    base,
    memoize,
    order,
    tuplicity = getDefaultTuplicity(DefaultNext, base, 1) || UndefinedTuplicity,
    ordering = identity,
    optimize
  },
  agg
) => arr =>
  recurso(
    {
      memoize,
      order,
      optimize,
      tuplicity,
      base,
      ordering: [undefined, ...arr]
    },
    agg
  )(arr)
