const identity = x => x;
const MaxIterability = 1000;
const DefaultRecurrence = (x, c) => identity(x);
const DefaultNext = [x => x - 1];
const access = (source, argument) => typeof source === 'function' ? source(argument) : source[argument];
const getIteratedNextFunction = (next, tuplicity) => {
    return !(next instanceof Array)
        ? x => Array.from(new Array(tuplicity === Infinity && next === DefaultNext
            ? x
            : tuplicity > 0
                ? tuplicity - 1
                : 0)).reduce((acc, _) => [...next(...acc.slice(-1)), ...acc], next(x))
        : x => Array.from(new Array(tuplicity > 0 ? tuplicity - 1 : 0))
            .reduce((acc, _) => [
            ...Array.from(new Array(next.length))
                .map(_ => acc.slice(-1).map(fn => _x => fn(fn(_x))))
                .reduce((acc, arr) => [...arr, ...acc]),
            ...acc
        ], next)
            .map(fn => fn(x));
};
const getDefaultTuplicity = (next, base) => next instanceof Array
    ? next.length
    : base instanceof Array
        ? base.length
        : Infinity;
const getFirstCases = (iterator, n = 0) => {
    let count = 0;
    let firstCases = [];
    debugger;
    while (count < n) {
        firstCases = [...firstCases, iterator.next().value];
        count++;
    }
    debugger;
    return firstCases;
};
const getGetBaseCase = (base, ordering) => {
    debugger;
    if (ordering && base instanceof Array) {
        const firstCases = getFirstCases(ordering, base.length);
        return recursiveCase => base[[...new Array(base.length)].map((_, i) => i).filter(i => firstCases[i] === recursiveCase)[0]];
    }
    return recursiveCase => typeof base === 'function' ? base(recursiveCase) : base[recursiveCase];
};
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let iterationCount = 0;
    for (let i = start; i < end; i += step) {
        iterationCount++;
        yield i;
    }
    return iterationCount;
}
function* makeOffsetIterator(iterator, offset = 0) {
    let iterationCount = 0;
    let next = iterator.next();
    while (!next.done) {
        iterationCount++;
        if (iterationCount >= offset) {
            yield next.value;
        }
        next = iterator.next();
    }
    return iterationCount;
}
const toIterator = identity;
const getIsIterable = obj => Symbol.iterator in Object(obj);
const getIsIterator = obj => getIsIterable(obj) && obj.next;
const getExplicitBaseFromOrdering = ({ base, ordering = makeRangeIterator(), offset = 0 } = { base: undefined }) => {
    if (base instanceof Array)
        return base;
    let i = 0;
    let _base = [];
    for (let internalCase of ordering) {
        if (i > MaxIterability) {
            throw 'base case overflow';
        }
        let nextValue = access(base, internalCase);
        if (i === offset && nextValue === undefined) {
            throw 'no base cases for tail optimization';
        }
        if (i > offset && nextValue === undefined) {
            break;
        }
        if (i >= offset) {
            _base = [..._base, nextValue];
        }
        i++;
    }
    return _base;
};
const getIsSinglePassTailable = (base, ordering) => getIsIterable(base) || ordering;
const recurso = ({ base = undefined, ordering = undefined, next = DefaultNext, recurrence = DefaultRecurrence, tuplicity = getDefaultTuplicity(next, base), offset = 0, } = {}) => recursiveCase => {
    const _next = getIteratedNextFunction(next, tuplicity);
    const isTailRecursive = recurrence === DefaultRecurrence;
    if (isTailRecursive) {
        let currentCase = recursiveCase;
        let nextCases;
        let baseCaseResult = access(base, currentCase);
        let numIterations = 0;
        while (baseCaseResult === undefined && numIterations < MaxIterability) {
            numIterations += 1;
            nextCases = _next(currentCase);
            currentCase = nextCases.slice(-1)[0];
            baseCaseResult = access(base, currentCase);
        }
        if (numIterations === MaxIterability)
            throw 'recurso reached maximum iterations';
        return baseCaseResult;
    }
    const shouldBeSinglePassOptimized = getIsSinglePassTailable(base, ordering);
    if (shouldBeSinglePassOptimized) {
        const innerIterator = makeOffsetIterator(ordering || makeRangeIterator(), offset);
        const getBaseCase = getGetBaseCase(base, innerIterator);
        const getIsTerminal = currentCase => getBaseCase(currentCase) !== undefined;
        if (getIsTerminal(recursiveCase)) {
            return getBaseCase(recursiveCase);
        }
        const nextInnerCase = innerIterator.next().value;
        return recurso({
            base: ({ accs, outerCase }) => {
                debugger;
                if (getIsTerminal(outerCase))
                    return accs.slice(-1)[0];
            },
            next: ({ accs, outerCase, innerCase }) => {
                debugger;
                const lastAccs = accs.slice(tuplicity === Infinity ? 0 : 1);
                const newAcc = recurrence(accs, innerCase);
                const nextInnerCase = innerIterator.next().value;
                return [{
                        accs: [...(tuplicity === Infinity ? [newAcc] : lastAccs), newAcc],
                        outerCase: _next(outerCase).slice(-1)[0],
                        innerCase: nextInnerCase
                    }];
            },
            tuplicity
        })({
            accs: getExplicitBaseFromOrdering({ base, ordering, offset }),
            innerCase: nextInnerCase,
            outerCase: recursiveCase
        });
    }
};
const recursoList = (list, { base = undefined, recurrence = DefaultRecurrence, next = undefined, tuplicity = base instanceof Array ? base.length : undefined } = {}) => recurso({
    base,
    next,
    recurrence,
    tuplicity
});
//# sourceMappingURL=recurso.js.map