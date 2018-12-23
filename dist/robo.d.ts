declare type Mappable<T, Case = number> = ((o: Case) => T) | T[];
declare type Gener<Case> = () => Iterator<Case>;
declare type Orderable<Case> = Gener<Case>;
declare type Nextable<Case = number> = ((o: Case) => Case)[] | ((o: Case) => Case[]);
declare const identity: (x: any) => any;
declare const MaxIterability = 1000;
declare const MaxBase = 100;
declare const DefaultRecurrence: ([x]: [any], [c]: [any]) => any;
declare const access: <T, Case>(source: Mappable<T, Case>, argument: Case) => T | T[][Case & number];
declare const getIteratedNextFunction: <Case>(next: Nextable<Case>, tuplicity: number) => (x: any) => any;
declare const getDefaultTuplicity: <Case, T>(next: Nextable<Case>, base: Mappable<T, Case>) => number;
declare const getFirstCases: <T>(iterator: IterableIterator<T>, b?: number) => Map<T, number>;
declare const getGetBaseCaseAndFirstCases: <T, Case>(base: T[], ordering: IterableIterator<Case>) => {
    firstCases: Map<Case, number>;
    getBaseCase: (recursiveCase: any) => T;
};
declare const makeRangeGenerator: (start?: number, end?: number, step?: number) => () => IterableIterator<number>;
declare const makeOffsetGenerator: <T>(generator: Gener<T>, offset?: number) => () => IterableIterator<T>;
declare const handleIterationException: (count: any, max: any) => void;
declare const getIsIterable: (obj: any) => boolean;
declare const getIsIterator: (obj: any) => any;
declare const _getBaseCaseResult: <T, Case>(recursiveCase: Case, base: Mappable<T, Case>, next: (o: Case) => Case[], shouldAccumulate?: boolean) => {
    baseCaseResult: T | T[][Case & number];
    accs: any;
};
declare const getBaseCaseResult: <T, Case>(recursiveCase: Case, base: Mappable<T, Case>, next: (o: Case) => Case[]) => T | T[][Case & number];
declare const getBaseCaseResults: <T, Case>(recursiveCase: Case, base: Mappable<T, Case>, next: (o: Case) => Case[]) => any;
declare const DefaultNext: (n: any) => any;
declare const HasIntersection: (x: any, props: any, has: any[]) => any;
declare const DoesntHave: (x: any, doesntHave: any[]) => boolean;
declare type BaseArray<T> = {
    base: T[];
};
declare const BaseArray: (x: any) => boolean;
declare type BaseFunction<T, Case> = {
    base: (o: Case) => T;
};
declare const BaseFunction: (x: any) => boolean;
declare type Ordering<Case> = {
    ordering: Orderable<Case>;
};
declare const Ordering: (x: any) => any;
declare type Next<Case> = {
    next: Nextable<Case>;
};
declare const Next: (x: any) => any;
declare type Memoize<Case> = {
    memoize?: ((o: Case) => string | number) | ((o: any) => string | number)[] | true;
};
declare type Recurrence<T, Case = number> = {
    recurrence: (recursiveCases: T[], ordinals?: Case[]) => T;
};
declare const Recurrence: (x: any) => any;
declare const Props: ((x: any) => any)[];
declare type RoboRest = {
    tuplicity?: number;
    offset?: number;
};
declare type ImplicitLinear<T> = BaseArray<T> & Recurrence<T> & RoboRest;
declare const ImplicitLinear: <T>(x: any) => x is ImplicitLinear<T>;
declare type ExplicitLinear<T, Case> = BaseArray<T> & Ordering<Case> & Next<Case> & Recurrence<T, Case> & RoboRest;
declare const ExplicitLinear: <T, Case = number>(x: any) => x is ExplicitLinear<T, Case>;
declare type NonLinear<T, Case> = BaseFunction<T, Case> & Next<Case> & Memoize<Case> & Recurrence<T, Case> & RoboRest;
declare const NonLinear: <T, Case>(x: any) => x is NonLinear<T, Case>;
declare const getGetBaseCase: <T, Case>(firstCases: Case[], base: T[]) => (recursiveCase: Case) => T;
declare type TailRecursive<T, Case = number> = (BaseArray<T> | BaseFunction<T, Case>) & Next<Case> & RoboRest;
declare const TailRecursive: <T, Case>(x: any) => x is TailRecursive<T, Case>;
declare class Result<T> {
    value: T;
    constructor(value: T);
}
declare const curry: (...args: any[]) => void;
declare const combine: (...args: any[]) => void;
declare const evaluate: <T, Case>(root: Case, { base, next, recurrence }: {
    base: (o: Case) => T;
    next: (o: Case) => Case[];
    recurrence: (results: T[], cases: Case[]) => T;
}) => any;
declare const robo: <T, Case = number>(params: ImplicitLinear<T> | ExplicitLinear<T, Case> | NonLinear<T, Case> | (BaseArray<T> & Next<Case> & RoboRest) | (BaseFunction<T, Case> & Next<Case> & RoboRest)) => (recursiveCase: Case) => T | T[][Case & number];
declare const roboLinear: <T, Case = number>({ base, recurrence, ordering, tuplicity, offset, next }: ExplicitLinear<T, Case>) => (recursiveCase: any) => T;
declare const roboList: <T, Element_1 = any>({ base, recurrence, ...rest }: BaseArray<T> & Recurrence<T, Element_1> & RoboRest) => (list: Element_1[]) => T;
declare let it: any;
declare let expect: any;
declare let describe: any;
declare const getKbonacciSource: (k: any) => (n: any) => any;
declare const triFibonacciSource: (n: any) => any;
declare const quadFibonacciSource: (n: any) => any;
declare const fibonacci: (recursiveCase: number) => number;
declare const factorial: (recursiveCase: number) => number;
declare const numDerangements: (recursiveCase: number) => number;
declare const subsets: (list: number[]) => number[][];
declare const subsetsSource: (l: any) => any;
declare const powerOfTwo: (recursiveCase: number) => number;
declare const fibonacciWithOrdering: (recursiveCase: number) => number;
declare const fibonacciIndefinite: (recursiveCase: number) => number;
declare const fibonacciIndefiniteWithOrdering: (recursiveCase: number) => number;
declare const fibonacciIndefiniteSpaceOptimization: (recursiveCase: number) => number;
declare const fibonacciIndefiniteTimeOptimization: (recursiveCase: number) => number;
declare const fibonacciIndefiniteWithOrderingSpaceOptimization: (recursiveCase: number) => number;
declare const fibonacciIndefiniteWithOrderingTimeOptimization: (recursiveCase: number) => number;
declare const sumList: (list: any[]) => number;
declare const factorialWithOrdering: (recursiveCase: number) => number;
declare const factorialIndefinite: (recursiveCase: number) => number;
declare const factorialIndefiniteWithOrdering: (recursiveCase: number) => number;
declare const factorialIndefiniteSpaceOptimization: (recursiveCase: number) => number;
declare const factorialIndefiniteTimeOptimization: (recursiveCase: number) => number;
declare const factorialIndefiniteWithOrderingSpaceOptimization: (recursiveCase: number) => number;
declare const factorialIndefiniteWithOrderingTimeOptimization: (recursiveCase: number) => number;
declare const factorialOffset: (recursiveCase: number) => number;
declare const sum: (arr: number[]) => number;
declare const getKbonacci: (k: any) => (recursiveCase: number) => number;
declare const getKbonacciWithOrdering: (k: any) => (recursiveCase: number) => number;
declare const getKbonacciIndefinite: (k: any) => (recursiveCase: number) => number;
declare const getKbonacciIndefiniteWithOrdering: (k: any) => (recursiveCase: number) => number;
declare const getKbonacciIndefiniteSpaceOptimization: (k: any) => (recursiveCase: number) => number;
declare const getKbonacciIndefiniteTimeOptimization: (k: any) => (recursiveCase: number) => number;
declare const getKbonacciIndefiniteWithOrderingSpaceOptimization: (k: any) => (recursiveCase: number) => number;
declare const getKbonacciIndefiniteWithOrderingTimeOptimization: (k: any) => (recursiveCase: number) => number;
declare const triFibonacci: (recursiveCase: number) => number;
declare const quadFibonacci: (recursiveCase: number) => number;
declare const triFibonacciIndefinite: (recursiveCase: number) => number;
declare const quadFibonacciIndefinite: (recursiveCase: number) => number;
declare const triFibonacciIndefiniteWithOrdering: (recursiveCase: number) => number;
declare const quadFibonacciIndefiniteWithOrdering: (recursiveCase: number) => number;
declare const triFibonacciIndefiniteWithOrderingSpaceOptimization: (recursiveCase: number) => number;
declare const quadFibonacciIndefiniteWithOrderingTimeOptimization: (recursiveCase: number) => number;
declare const explicitFibonacci: (recursiveCase: number) => number;
declare const numDerangementsList: (list: number[]) => number;
declare const numDerangementsWithOrdering: (recursiveCase: number) => number;
declare const numDerangementsIndefinite: (recursiveCase: number) => number;
declare const numDerangementsWithOrderingIndefinite: (recursiveCase: number) => number;
declare const numDerangementsWithOrderingIndefiniteSpaceOptimization: (recursiveCase: number) => number;
declare const numDerangementsWithOrderingIndefiniteTimeOptimization: (recursiveCase: number) => number;
declare const numDerangementsIndefiniteSpaceOptimization: (recursiveCase: number) => number;
declare const numDerangementsIndefiniteTimeOptimization: (recursiveCase: number) => number;
interface Change {
    coins: number[];
    target: number;
}
declare const makeChange: (recursiveCase: Change) => number;
declare type Choose = {
    n: number;
    k: number;
};
declare const binomialCoefficient: (recursiveCase: Choose) => number;
interface BinarySearch<T> {
    subArr: T[];
    displacement: number;
}
declare const binarySearch: <T>(arr: T[], target: T) => (recursiveCase: BinarySearch<T>) => number;
declare const test: () => void;
