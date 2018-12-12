declare type Mappable<T, Ordinal> = ((o: Ordinal) => T) | T[];
declare type Orderable<T> = ((o: number) => T) | Iterable<T> | IterableIterator<T> | IterableIterator<number | T>;
declare type Nextable<Ordinal> = ((o: Ordinal) => Ordinal)[] | ((o: Ordinal) => Ordinal[]);
declare const identity: (x: any) => any;
declare const MaxIterability = 1000;
declare const MaxBase = 100;
declare const DefaultRecurrence: ([x]: [any], [c]: [any]) => any;
declare const access: (source: any, argument: any) => any;
declare const getIteratedNextFunction: <Ordinal>(next: Nextable<Ordinal>, tuplicity: number) => (x: any) => any;
declare const getDefaultTuplicity: <Ordinal, T>(next: Nextable<Ordinal>, base: Mappable<T, Ordinal>) => number;
declare const getFirstCases: <T>(iterator: IterableIterator<T>, n?: number) => any[];
declare const getGetBaseCaseAndFirstCases: <T, Ordinal>(base: T[], ordering: IterableIterator<Ordinal>) => {
    firstCases: any[];
    getBaseCase: (recursiveCase: any) => T;
};
declare function makeRangeIterator(start?: number, end?: number, step?: number): IterableIterator<number>;
declare function makeOffsetIterator<T>(orderable: Orderable<T>, offset?: number): IterableIterator<T>;
declare function toIterator<T>(orderable: Orderable<T>, max?: number): IterableIterator<number | T>;
declare const getIsIterable: (obj: any) => boolean;
declare const getIsIterator: (obj: any) => any;
declare const getExplicitBaseFromOrdering: <T, Ordinal>({ base, ordering, offset }: {
    base: Mappable<T, Ordinal>;
    ordering: Orderable<Ordinal>;
    offset: number;
}) => T[];
declare const _getBaseCaseResult: (recursiveCase: any, base: any, next: any, shouldAccumulate?: boolean) => {
    baseCaseResult: any;
    accs: any;
};
declare const getBaseCaseResult: (recursiveCase: any, base: any, next: any) => any;
declare const getBaseCaseResults: (recursiveCase: any, base: any, next: any) => any;
declare const DefaultNext: (n: any) => any;
declare const _robo: <T, Ordinal>({ base, memoize, ordering, next, recurrence, tuplicity, offset, optimizeRuntime }: {
    base: Mappable<T, Ordinal>;
    ordering?: Orderable<Ordinal>;
    next?: Nextable<Ordinal>;
    recurrence?: (recursiveCases: T[], ordinals?: Ordinal[]) => T;
    tuplicity?: number;
    offset?: number;
    memoize?: true | ((o: Ordinal) => string | number) | ((o: any) => string | number)[];
    optimizeRuntime?: boolean;
}) => (recursiveCase: Ordinal) => any;
declare const Has: (x: any, props: any, has: any[]) => any;
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
declare type RoboRest<T, Ordinal> = {
    recurrence?: (recursiveCases: T[], ordinals?: Ordinal[]) => T;
    tuplicity?: number;
    offset?: number;
};
declare type ImplicitLinear<T, Ordinal> = BaseArray<T> & RoboRest<T, Ordinal>;
declare const ImplicitLinear: (x: any) => any;
declare type ExplicitLinear<T, Ordinal> = BaseArray<T> & Ordering<Ordinal> & Next<Ordinal> & RoboRest<T, Ordinal>;
declare const ExplicitLinear: (x: any) => (x: any) => any;
declare type ExplicitIndefiniteLinear<T, Ordinal> = BaseFunction<T, Ordinal> & Ordering<Ordinal> & Next<Ordinal> & RoboRest<T, Ordinal>;
declare const ExplicitIndefiniteLinear: (x: any) => any;
declare type NonLinear<T, Ordinal> = BaseFunction<T, Ordinal> & Next<Ordinal> & Memoize<Ordinal> & RoboRest<T, Ordinal>;
declare const NonLinear: (x: any) => any;
declare const roboLinear: <T, Ordinal>({ base, recurrence, ordering, tuplicity, offset, next }: ExplicitLinear<T, Ordinal>) => (recursiveCase: any) => any;
declare const robo: <T, Ordinal>(params: ImplicitLinear<T, number> | ExplicitLinear<T, Ordinal> | ExplicitIndefiniteLinear<T, Ordinal> | NonLinear<T, Ordinal>) => (recursiveCase: any) => any;
declare let it: any;
declare let expect: any;
declare let describe: any;
declare const getKbonacciSource: (k: any) => (n: any) => any;
declare const triFibonacciSource: (n: any) => any;
declare const quadFibonacciSource: (n: any) => any;
declare const fibonacci: (recursiveCase: any) => any;
declare const factorial: (recursiveCase: any) => any;
declare const sum: (arr: any) => any;
declare const getKbonacci: (k: any) => (recursiveCase: any) => any;
declare const triFibonacci: (recursiveCase: any) => any;
declare const quadFibonacci: (recursiveCase: any) => any;
declare const explicitFibonacci: (recursiveCase: any) => any;
declare const numDerangements: (recursiveCase: any) => any;
interface Change {
    coins: number[];
    target: number;
}
declare const makeChange: (coins: any, target: any) => any;
interface BinarySearch<T> {
    subArr: T[];
    displacement: number;
}
declare const binarySearch: <T>(arr: T[], target: T) => (recursiveCase: any) => any;
declare const test: () => void;
