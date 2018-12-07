declare type Mappable<T, ImmutableOrdinal> = ((o: ImmutableOrdinal) => T) | Iterable<T> | Map<ImmutableOrdinal, T> | T[] | IterableIterator<T>;
declare type Orderable<T> = ((o: number) => T) | Iterable<T> | IterableIterator<T> | IterableIterator<number | T>;
declare type Next<ImmutableOrdinal> = ((o: ImmutableOrdinal) => ImmutableOrdinal)[] | ((o: ImmutableOrdinal) => ImmutableOrdinal[]);
declare const identity: (x: any) => any;
declare const MaxIterability = 1000;
declare const DefaultRecurrence: (x: any, c: any) => any;
declare const access: (source: any, argument: any) => any;
declare const getIteratedNextFunction: <ImmutableOrdinal>(next: Next<ImmutableOrdinal>, tuplicity: number) => (x: any) => any;
declare const getDefaultTuplicity: <ImmutableOrdinal, T>(next: Next<number | ImmutableOrdinal>, base: Mappable<T, ImmutableOrdinal>) => number;
declare const getFirstCases: <T>(iterator: IterableIterator<T>, n?: number) => any[];
declare const getGetBaseCase: <T, ImmutableOrdinal>(base: Mappable<T, ImmutableOrdinal>, ordering: IterableIterator<T>) => (recursiveCase: any) => any;
declare function makeRangeIterator(start?: number, end?: number, step?: number): IterableIterator<number>;
declare function makeOffsetIterator<T>(orderable: Orderable<T>, offset?: number): IterableIterator<number | T>;
declare function toIterator<T>(orderable: Orderable<T>): IterableIterator<number | T>;
declare const getIsIterable: (obj: any) => boolean;
declare const getIsIterator: (obj: any) => any;
declare const getExplicitBaseFromOrdering: <T, ImmutableOrdinal>({ base, ordering, offset, }: {
    base: Mappable<T, ImmutableOrdinal>;
    ordering: Orderable<T>;
    offset: number;
}) => T[];
declare const getIsSinglePassTailable: <T, ImmutableOrdinal>(base: Mappable<T, ImmutableOrdinal>, ordering: IterableIterator<T>) => true | IterableIterator<T>;
declare const _getBaseCaseResult: (recursiveCase: any, base: any, next: any, shouldAccumulate?: boolean) => {
    baseCaseResult: any;
    accs: any;
};
declare const getBaseCaseResult: (recursiveCase: any, base: any, next: any) => any;
declare const getBaseCaseResults: (recursiveCase: any, base: any, next: any) => any;
declare const DefaultNext: (n: any) => any;
declare const robo: <T, ImmutableOrdinal>({ base, ordering, memoize, next, recurrence, tuplicity, offset, optimizeRuntime, }: {
    base: Mappable<T, ImmutableOrdinal>;
    ordering?: Orderable<T>;
    next?: Next<ImmutableOrdinal>;
    recurrence?: (recursiveCases: T[], o: number | ImmutableOrdinal) => T;
    tuplicity?: number;
    offset?: number;
    memoize?: true | ((o: ImmutableOrdinal) => string | number) | ((o: any) => string | number)[];
    optimizeRuntime?: boolean;
}) => (recursiveCase: any) => any;
declare const roboList: <T>(list: T[], { base, recurrence, tuplicity, }?: {
    base?: any;
    recurrence?: (x: any, c: any) => any;
    tuplicity?: number;
}) => any;
declare let describe: any;
declare let it: any;
declare let expect: any;
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
declare const implicitExplicitFibonacci: (recursiveCase: any) => any;
declare const explicitFactorial: (recursiveCase: any) => any;
declare const numDerangements: (recursiveCase: any) => any;
declare const explicitNumDerangements: (recursiveCase: any) => any;
declare const subsets: (l: any) => any;
declare const and: (l: any) => any;
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
