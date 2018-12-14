const identity = x => x;
const MaxIterability = 1000;
const MaxBase = 100;
const DefaultRecurrence = ([x], [c]) => c;
const access = (source, argument) => typeof source === 'function' ? source(argument) : source[argument];
const getIteratedNextFunction = (next, tuplicity) => {
    return !(next instanceof Array)
        ? x => Array.from(new Array(tuplicity === Infinity
            ?
                x
            : tuplicity > 0
                ? tuplicity - 1
                : 0)).reduce((acc, _) => [...next(acc.slice(-1)[0]), ...acc], next(x))
        : x => Array.from(new Array(tuplicity > 0 ? tuplicity - 1 : 0))
            .reduce((acc, _) => [
            ...Array.from(new Array(next.length))
                .map(_ => acc.slice(-1).map(fn => _x => fn(fn(_x))))
                .reduce((acc, arr) => [...arr, ...acc]),
            ...acc
        ], next)
            .map(fn => fn(x));
};
const getDefaultTuplicity = (next, base) => base instanceof Array ? base.length : next instanceof Array ? next.length : 1;
const getFirstCases = (iterator, b = 1) => {
    let count = 0;
    let firstCases = [];
    while (count < b) {
        firstCases = [...firstCases, iterator.next().value];
        count++;
    }
    debugger;
    return firstCases.reduce((map, c, i) => {
        debugger;
        map.set(c, i);
        return map;
    }, new Map());
};
const getGetBaseCaseAndFirstCases = (base, ordering) => {
    const firstCases = getFirstCases(ordering, base.length);
    return {
        firstCases,
        getBaseCase: recursiveCase => base[[...new Array(base.length)]
            .map((_, i) => i)
            .filter(i => firstCases[i] === recursiveCase)[0]]
    };
};
const makeRangeGenerator = (start = 0, end = Infinity, step = 1) => function* () {
    let iterationCount = 0;
    for (let i = start; i < end; i += step) {
        iterationCount++;
        yield i;
    }
    return iterationCount;
};
const makeOffsetGenerator = (generator, offset = 0) => function* () {
    let iterationCount = 0;
    const iterator = generator();
    let next = iterator.next();
    while (!next.done) {
        debugger;
        if (iterationCount >= offset) {
            yield next.value;
        }
        next = iterator.next();
    }
};
const handleIterationException = (count, max) => {
    if (count > max) {
        debugger;
        throw max === MaxIterability
            ? 'max iterability exceeded'
            : max === MaxBase
                ? 'max base cases exceeded'
                : 'generic iteration threshold exceeded message';
    }
};
const getIsIterable = obj => Symbol.iterator in Object(obj);
const getIsIterator = obj => getIsIterable(obj) && obj.next;
const _getBaseCaseResult = (recursiveCase, base, next, shouldAccumulate = false) => {
    debugger;
    let currentCase = recursiveCase;
    let nextCases;
    let baseCaseResult = access(base, currentCase);
    let numIterations = 0;
    let accs;
    while (baseCaseResult === undefined && numIterations < MaxIterability) {
        numIterations += 1;
        nextCases = next(currentCase);
        currentCase = nextCases.slice(-1)[0];
        baseCaseResult = access(base, currentCase);
        if (shouldAccumulate) {
            accs = [...accs, baseCaseResult];
        }
    }
    if (numIterations === MaxIterability)
        throw 'robo reached maximum iterations';
    return { baseCaseResult, accs };
};
const getBaseCaseResult = (recursiveCase, base, next) => _getBaseCaseResult(recursiveCase, base, next).baseCaseResult;
const getBaseCaseResults = (recursiveCase, base, next) => _getBaseCaseResult(recursiveCase, base, next, true).accs;
const DefaultNext = n => {
    if (typeof n === 'number') {
        return [n - 1];
    }
    throw 'must provide next function for non-numeric ordinals';
};
const HasIntersection = (x, props, has) => props.every(f => (has.indexOf(f) === -1 && !f(x)) || f(x));
const BaseArray = x => x.hasOwnProperty('base') && x.base instanceof Array;
const BaseFunction = x => x.hasOwnProperty('base') && typeof x.base === 'function';
const Ordering = x => x.hasOwnProperty('ordering');
const Next = x => x.hasOwnProperty('next');
const Props = [BaseArray, BaseFunction, Ordering, Next];
const ImplicitLinear = (x) => HasIntersection(x, [BaseArray, BaseFunction, Ordering, Next], [BaseArray]);
const ExplicitLinear = (x) => HasIntersection(x, [BaseArray, BaseFunction, Ordering, Next], [BaseArray, Ordering, Next]);
const ExplicitIndefiniteLinear = (x) => HasIntersection(x, [BaseArray, BaseFunction, Ordering, Next], [BaseFunction, Ordering, Next]);
const NonLinear = (x) => HasIntersection(x, [BaseArray, BaseFunction, Ordering, Next], [BaseFunction, Next]);
const getGetBaseCase = (firstCases, base) => (recursiveCase) => base[firstCases.indexOf(recursiveCase)];
const TailRecursive = (x) => HasIntersection(x, [BaseArray, BaseFunction, Ordering, Next], [
    BaseArray,
    Next
]) ||
    HasIntersection(x, [BaseArray, BaseFunction, Ordering, Next], [BaseFunction, Next]);
const roboLinear = ({ base, recurrence, ordering, tuplicity, offset, next }) => recursiveCase => {
    debugger;
    const innerIterator = makeOffsetGenerator(ordering, offset)();
    const _next = getIteratedNextFunction(next, tuplicity);
    debugger;
    const firstCases = getFirstCases(innerIterator, base.length);
    debugger;
    const getBaseCase = (recursiveCase) => base[firstCases.get(recursiveCase)];
    const getIsTerminal = (innerCase) => firstCases.get(innerCase) < base.length;
    const caseIfBase = getBaseCase(recursiveCase);
    if (caseIfBase !== undefined) {
        return caseIfBase;
    }
    return robo({
        base: ({ accs, outerCase }) => {
            debugger;
            if (getIsTerminal(outerCase))
                return accs.slice(-1)[0];
        },
        next: ({ accs, outerCase, innerCases }) => {
            debugger;
            const lastCases = innerCases.slice(tuplicity === Infinity ? 0 : 1);
            const nextInnerCases = [...lastCases, innerIterator.next().value];
            const lastAccs = accs.slice(tuplicity === Infinity ? 0 : 1);
            const newAcc = recurrence(accs, nextInnerCases);
            return [
                {
                    accs: [...(tuplicity === Infinity ? [newAcc] : lastAccs), newAcc],
                    outerCase: _next(outerCase).slice(-1)[0],
                    innerCases: nextInnerCases
                }
            ];
        }
    })({
        accs: base,
        innerCases: [...firstCases.keys()],
        outerCase: recursiveCase
    });
};
const robo = (params) => {
    debugger;
    if (TailRecursive(params)) {
        const { base, next, tuplicity } = params;
        return recursiveCase => getBaseCaseResult(recursiveCase, base, getIteratedNextFunction(next, tuplicity));
    }
    if (ImplicitLinear(params)) {
        const ordering = makeOffsetGenerator(makeRangeGenerator(), params.offset);
        debugger;
        const next = getIteratedNextFunction(DefaultNext, params.tuplicity);
        return roboLinear(Object.assign({}, params, { ordering,
            next }));
    }
    if (ExplicitLinear(params)) {
        return roboLinear(params);
    }
    if (ExplicitIndefiniteLinear(params)) {
        debugger;
    }
    if (NonLinear(params)) {
        debugger;
    }
};
const getKbonacciSource = k => n => {
    if (n < k)
        return n;
    return [...new Array(k)]
        .map((_, i) => getKbonacciSource(k)(n - i - 1))
        .reduce((sumAcc, c) => sumAcc + c, 0);
};
const triFibonacciSource = getKbonacciSource(3);
const quadFibonacciSource = getKbonacciSource(4);
const fibonacci = robo({
    base: [0, 1],
    recurrence: ([subcase0, subcase1]) => subcase0 + subcase1
});
const factorial = robo({
    base: [1],
    recurrence: ([subcase], [n]) => n * subcase
});
const sum = arr => arr.reduce((sumAcc, c) => sumAcc + c, 0);
const getKbonacci = k => robo({
    base: [...new Array(k)].map((_, i) => i),
    recurrence: sum
});
const triFibonacci = getKbonacci(3);
const quadFibonacci = getKbonacci(4);
const explicitFibonacci = robo({
    base: [0, 1],
    next: [n => n - 2, n => n - 1],
    recurrence: ([subcase0, subcase1]) => subcase0 + subcase1
});
const numDerangements = robo({
    base: [1, 0],
    recurrence: ([subcase0, subcase1], [previous]) => previous * (subcase0 + subcase1)
});
const makeChange = (coins, target) => robo({
    base: ({ coins, target }) => {
        if (!coins.length)
            return 0;
        if (!target)
            return 1;
        if (target && !coins.length)
            return 0;
    },
    next: ({ coins, target }) => [
        { coins, target: target - coins[0] },
        { coins: coins.slice(1), target }
    ],
    recurrence: sum,
    memoize: [coins => coins.length, target => target]
})({ coins, target });
const binarySearch = (arr, target) => robo({
    base: ({ subArr, displacement }) => {
        if (!subArr.length)
            return -1;
        if (subArr[0] === target)
            return displacement;
    },
    next: ({ subArr, displacement }) => {
        const mid = Math.floor(subArr.length / 2);
        if (target <= subArr[mid])
            return [{ subArr: subArr.slice(0, mid), displacement }];
        return [{ subArr: subArr.slice(mid), displacement: mid + displacement }];
    }
});
const test = () => {
    describe('fibonacci', function () {
        it('base cases', function () {
            expect(fibonacci(0)).toBe(0);
            expect(fibonacci(1)).toBe(1);
        });
        it('rest', function () {
            expect(fibonacci(2)).toBe(1);
            expect(fibonacci(3)).toBe(2);
            expect(fibonacci(4)).toBe(3);
            expect(fibonacci(5)).toBe(5);
            expect(fibonacci(6)).toBe(8);
        });
    });
    describe('test tribonacci', function () {
        it('base cases', function () {
            expect(triFibonacci(0)).toBe(triFibonacciSource(0));
            expect(triFibonacci(1)).toBe(triFibonacciSource(1));
        });
        it('rest', function () {
            expect(triFibonacci(2)).toBe(triFibonacciSource(2));
            expect(triFibonacci(3)).toBe(triFibonacciSource(3));
            expect(triFibonacci(4)).toBe(triFibonacciSource(4));
            expect(triFibonacci(5)).toBe(triFibonacciSource(5));
            expect(triFibonacci(6)).toBe(triFibonacciSource(6));
        });
    });
    describe('test quadbonacci', function () {
        it('base cases', function () {
            expect(quadFibonacci(0)).toBe(quadFibonacciSource(0));
            expect(quadFibonacci(1)).toBe(quadFibonacciSource(1));
        });
        it('rest', function () {
            expect(quadFibonacci(2)).toBe(quadFibonacciSource(2));
            expect(quadFibonacci(3)).toBe(quadFibonacciSource(3));
            expect(quadFibonacci(4)).toBe(quadFibonacciSource(4));
            expect(quadFibonacci(5)).toBe(quadFibonacciSource(5));
            expect(quadFibonacci(6)).toBe(quadFibonacciSource(6));
        });
    });
    describe('factorial', function () {
        it('base cases', function () {
            expect(factorial(0)).toBe(1);
        });
        it('rest', function () {
            expect(factorial(1)).toBe(1);
            expect(factorial(2)).toBe(2);
            expect(factorial(3)).toBe(6);
            expect(factorial(4)).toBe(24);
        });
    });
    describe('derangements', function () {
        it('base cases', function () {
            expect(numDerangements(0)).toBe(1);
            expect(numDerangements(1)).toBe(0);
        });
        it('rest', function () {
            expect(numDerangements(2)).toBe(1);
            expect(numDerangements(3)).toBe(2);
            expect(numDerangements(4)).toBe(9);
            expect(numDerangements(5)).toBe(44);
        });
    });
    describe('single pass optimization with custom ordering works for', function () { });
    describe('double pass optimization works for', function () { });
    describe('double pass optimization with custom ordering works for', function () { });
    describe('double pass time optimization works for', function () { });
    describe('double pass time optimization with custom ordering works for', function () { });
    describe('double pass space optimization works for', function () { });
    describe('double pass space optimization with custom ordering works for', function () { });
    describe('list recursion works for', function () { });
    describe('list recursion with short circuiting works for', function () { });
    describe('divide-and-conqceur works for', function () { });
    describe('divide-and-conqceur implicit single-dimensional memoization works for', function () { });
    describe('divide-and-conqceur explicit multi-dimensional memoization works for', function () { });
};
test();
//# sourceMappingURL=robo.js.map