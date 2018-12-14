declare type Mappable<T, Ordinal = number> = ((o: Ordinal) => T) | T[];
declare type Gener<Ordinal> = () => Iterator<Ordinal>;
declare type Orderable<Ordinal> = Gener<Ordinal>;
declare type Nextable<Ordinal = number> = ((o: Ordinal) => Ordinal)[] | ((o: Ordinal) => Ordinal[]);
declare const identity: (x: any) => any;
declare const MaxIterability = 1000;
declare const MaxBase = 100;
declare const DefaultRecurrence: ([x]: [any], [c]: [any]) => any;
declare const access: (source: any, argument: any) => any;
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
declare const _getBaseCaseResult: (recursiveCase: any, base: any, next: any, shouldAccumulate?: boolean) => {
    baseCaseResult: any;
    accs: any;
};
declare const getBaseCaseResult: (recursiveCase: any, base: any, next: any) => any;
declare const getBaseCaseResults: (recursiveCase: any, base: any, next: any) => any;
declare const DefaultNext: (n: any) => any;
declare const HasIntersection: (x: any, props: any, has: any[]) => any;
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
declare const Props: ((x: any) => any)[];
declare type Memoize<Ordinal> = {
    memoize?: ((o: Ordinal) => string | number) | ((o: any) => string | number)[] | true;
};
declare type Recurrence<T, Ordinal = number> = {
    recurrence: (recursiveCases: T[], ordinals?: Ordinal[]) => T;
};
declare type RoboRest = {
    tuplicity?: number;
    offset?: number;
};
declare type ImplicitLinear<T> = BaseArray<T> & Recurrence<T> & RoboRest;
declare const ImplicitLinear: <T>(x: any) => x is ImplicitLinear<T>;
declare type ExplicitLinear<T, Ordinal> = BaseArray<T> & Ordering<Ordinal> & Next<Ordinal> & Recurrence<T, Ordinal> & RoboRest;
declare const ExplicitLinear: <T, Ordinal = number>(x: any) => x is ExplicitLinear<T, Ordinal>;
declare type ExplicitIndefiniteLinear<T, Ordinal = number> = BaseFunction<T, Ordinal> & Ordering<Ordinal> & Next<Ordinal> & Recurrence<T, Ordinal> & RoboRest;
declare const ExplicitIndefiniteLinear: <T, Ordinal = number>(x: any) => x is ExplicitIndefiniteLinear<T, Ordinal>;
declare type NonLinear<T, Ordinal> = BaseFunction<T, Ordinal> & Next<Ordinal> & Memoize<Ordinal> & Recurrence<T, Ordinal> & RoboRest;
declare const NonLinear: <T, Ordinal>(x: any) => x is NonLinear<T, Ordinal>;
declare const getGetBaseCase: <T, Ordinal>(firstCases: Ordinal[], base: T[]) => (recursiveCase: Ordinal) => T;
declare type TailRecursive<T, Ordinal = number> = (BaseArray<T> | BaseFunction<T, Ordinal>) & Next<Ordinal> & RoboRest;
declare const TailRecursive: <T, Ordinal>(x: any) => x is TailRecursive<T, Ordinal>;
declare const roboLinear: <T, Ordinal = number>({ base, recurrence, ordering, tuplicity, offset, next }: ExplicitLinear<T, Ordinal>) => (recursiveCase: any) => any;
declare const robo: <T, Ordinal = number>(params: ImplicitLinear<T> | ExplicitLinear<T, Ordinal> | ExplicitIndefiniteLinear<T, Ordinal> | NonLinear<T, Ordinal> | (BaseArray<T> & Next<Ordinal> & RoboRest) | (BaseFunction<T, Ordinal> & Next<Ordinal> & RoboRest)) => any;
declare let it: any;
declare let expect: any;
declare let describe: any;
declare const getKbonacciSource: (k: any) => (n: any) => any;
declare const triFibonacciSource: (n: any) => any;
declare const quadFibonacciSource: (n: any) => any;
declare const fibonacci: any;
declare const factorial: any;
declare const sum: (arr: any) => any;
declare const getKbonacci: (k: any) => any;
declare const triFibonacci: any;
declare const quadFibonacci: any;
declare const explicitFibonacci: any;
declare const numDerangements: any;
interface Change {
    coins: number[];
    target: number;
}
declare const makeChange: (coins: any, target: any) => any;
interface BinarySearch<T> {
    subArr: T[];
    displacement: number;
}
declare const binarySearch: <T>(arr: T[], target: T) => any;
declare const test: () => void;
