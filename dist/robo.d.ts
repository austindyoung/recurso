declare type Mappable<T, Ordinal = number> = ((o: Ordinal) => T) | T[];
declare type Gener<Ordinal> = () => Iterator<Ordinal>;
declare type Orderable<Ordinal> = Gener<Ordinal>;
declare type Nextable<Ordinal = number> = ((o: Ordinal) => Ordinal)[] | ((o: Ordinal) => Ordinal[]);
declare const identity: (x: any) => any;
declare const MaxIterability = 1000;
declare const MaxBase = 100;
declare const DefaultRecurrence: ([x]: [any], [c]: [any]) => any;
declare const access: <T, Ordinal>(source: Mappable<T, Ordinal>, argument: Ordinal) => T | T[][Ordinal & number];
declare const getIteratedNextFunction: <Ordinal>(next: Nextable<Ordinal>, tuplicity: number) => (x: any) => any;
declare const getDefaultTuplicity: <Ordinal, T>(next: Nextable<Ordinal>, base: Mappable<T, Ordinal>) => number;
declare const getFirstCases: <T>(iterator: IterableIterator<T>, b?: number) => Map<T, number>;
declare const getGetBaseCaseAndFirstCases: <T, Ordinal>(base: T[], ordering: IterableIterator<Ordinal>) => {
    firstCases: Map<Ordinal, number>;
    getBaseCase: (recursiveCase: any) => T;
};
declare const makeRangeGenerator: (start?: number, end?: number, step?: number) => () => IterableIterator<number>;
declare const makeOffsetGenerator: <T>(generator: Gener<T>, offset?: number) => () => IterableIterator<T>;
declare const handleIterationException: (count: any, max: any) => void;
declare const getIsIterable: (obj: any) => boolean;
declare const getIsIterator: (obj: any) => any;
declare const _getBaseCaseResult: <T, Ordinal>(recursiveCase: Ordinal, base: Mappable<T, Ordinal>, next: (o: Ordinal) => Ordinal[], shouldAccumulate?: boolean) => {
    baseCaseResult: T | T[][Ordinal & number];
    accs: (T | T[][Ordinal & number])[];
};
declare const getBaseCaseResult: <T, Ordinal>(recursiveCase: Ordinal, base: Mappable<T, Ordinal>, next: (o: Ordinal) => Ordinal[]) => T | T[][Ordinal & number];
declare const getBaseCaseResults: <T, Ordinal>(recursiveCase: Ordinal, base: Mappable<T, Ordinal>, next: (o: Ordinal) => Ordinal[]) => (T | T[][Ordinal & number])[];
declare const DefaultNext: (n: any) => any;
declare const HasIntersection: (x: any, props: any, has: any[]) => any;
declare const DoesntHave: (x: any, doesntHave: any[]) => boolean;
declare type BaseArray<T> = {
    base: T[];
};
declare const BaseArray: (x: any) => boolean;
declare type BaseFunction<T, Ordinal> = {
    base: (o: Ordinal) => T;
};
declare const BaseFunction: (x: any) => boolean;
declare type Ordering<Ordinal> = {
    ordering: Orderable<Ordinal>;
};
declare const Ordering: (x: any) => any;
declare type Next<Ordinal> = {
    next: Nextable<Ordinal>;
};
declare const Next: (x: any) => any;
declare type Memoize<Ordinal> = {
    memoize?: ((o: Ordinal) => string | number) | ((o: any) => string | number)[] | true;
};
declare type Recurrence<T, Ordinal = number> = {
    recurrence: (recursiveCases: T[], ordinals?: Ordinal[]) => T;
};
declare const Recurrence: (x: any) => any;
declare const Props: ((x: any) => any)[];
declare type RoboRest = {
    tuplicity?: number;
    offset?: number;
};
declare type ImplicitLinear<T> = BaseArray<T> & Recurrence<T> & RoboRest;
declare const ImplicitLinear: <T>(x: any) => x is ImplicitLinear<T>;
declare type ExplicitLinear<T, Ordinal> = BaseArray<T> & Ordering<Ordinal> & Next<Ordinal> & Recurrence<T, Ordinal> & RoboRest;
declare const ExplicitLinear: <T, Ordinal = number>(x: any) => x is ExplicitLinear<T, Ordinal>;
declare type NonLinear<T, Ordinal> = BaseFunction<T, Ordinal> & Next<Ordinal> & Memoize<Ordinal> & Recurrence<T, Ordinal> & RoboRest;
declare const NonLinear: <T, Ordinal>(x: any) => x is NonLinear<T, Ordinal>;
declare const getGetBaseCase: <T, Ordinal>(firstCases: Ordinal[], base: T[]) => (recursiveCase: Ordinal) => T;
declare type TailRecursive<T, Ordinal = number> = (BaseArray<T> | BaseFunction<T, Ordinal>) & Next<Ordinal> & RoboRest;
declare const TailRecursive: <T, Ordinal>(x: any) => x is TailRecursive<T, Ordinal>;
declare const postorderTraversal: <Ordinal>(root: Ordinal, base: any, next: any) => any[];
declare const robo: <T, Ordinal = number>(params: ImplicitLinear<T> | ExplicitLinear<T, Ordinal> | NonLinear<T, Ordinal> | (BaseArray<T> & Next<Ordinal> & RoboRest) | (BaseFunction<T, Ordinal> & Next<Ordinal> & RoboRest)) => (recursiveCase: Ordinal) => T | T[][Ordinal & number];
declare const roboLinear: <T, Ordinal = number>({ base, recurrence, ordering, tuplicity, offset, next }: ExplicitLinear<T, Ordinal>) => (recursiveCase: any) => T;
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
