const identity = x => x
const MaxIterability = 100000
const DefaultRecurrence = identity
const DefaultNext = x => [x.slice ? x.slice(-1) : x - 1]
const access = (source, argument) =>  typeof source === 'function' ? sorce(argument) : source[argument]
const getIteratedNextFunction = (next, tuplicity) => {
debugger
  return !(next instanceof Array)
      ? x =>
          Array.from(
            new Array(
              tuplicity === Infinity && next === DefaultNext
                ? x
                : tuplicity > 0
                  ? tuplicity - 1
                  : 0
            )
          ).reduce((acc, _) => [...next(...acc.slice(-1)), ...acc], next(x))
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
const getDefaultTuplicity = (next, base) =>
  next instanceof Array
    ? next.length
    : base instanceof Array
      ? base.length
      : Infinity

const getBaseCase = (recursiveCase, base) =>
  typeof base === 'function' ? base(recursiveCase) : base[recursiveCase]

const recurso = ({
    base,
    next = DefaultNext,
    tuplicity = getDefaultTuplicity(next, base),
    recurrence = DefaultRecurrence
}) => recursiveCase => {
    const _next = getIteratedNextFunction(
        next,
        tuplicity
      )
    const isTailRecursive = recurrence === DefaultRecurrence
    if (isTailRecursive) {
        let currentCase = recursiveCase
        let nextCases
        let baseCaseResult = access(currentCase, base)
        let numIterations = 0
        while (baseCaseResult === undefined && numIterations < MaxIterability) {
          numIterations += 1
          nextCases = _next(currentCase)
          currentCase = nextCases.slice(-1)[0]
          baseCaseResult = access(currentCase, base)
        }
        if (numIterations === MaxIterability)
          throw 'recurso reached maximum iterations'
        return baseCaseResult
      }
      const getIsTerminal = (currentCase, _base) => getBaseCase(currentCase, _base) !== undefined
      const shouldBeSinglePassOptimized = base instanceof Array //iterator
      if (shouldBeSinglePassOptimized) {
        return recurso({
          base: ({ accs, outerCase, innerCase, _base }) => {
            if (getIsTerminal(outerCase, _base)) return accs
          },
          next: ({ accs, outerCase, innerCase, _base }) => {
            const lastAccs = accs.slice(tuplicity === Infinity ? 0 : 1)
            const newAcc = recurrence(accs, innerCase)
            return [
              {
                accs: [...(tuplicity === Infinity ? [newAcc] : lastAccs), newAcc],
                outerCase: _next(outerCase).slice(-1)[0],
                innerCase: innerCase + 1, //iterate
                _base
              }
            ]
          },
          tuplicity
        })({
          accs: base,
          innerCase: 0, //iterate
          _base: base
          
        })
      }
    }