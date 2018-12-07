declare type Mappable<T, Ordinal> = ((o: Ordinal) => T) | Iterable<T> | Map<Ordinal, T> | T[] | IterableIterator<T>;
declare type Orderable<T> = ((o: number) => T) | Iterable<T> | IterableIterator<T> | IterableIterator<number | T>;
declare type Next<Ordinal> = ((o: Ordinal) => Ordinal)[] | ((o: Ordinal) => Ordinal[]);
declare const recurso: <T, Ordinal>({ base, ordering, next, memoize, recurrence, tuplicity, offset, optimizeRuntime, }: {
    base: Mappable<T, Ordinal>;
    ordering?: Orderable<T>;
    next?: Next<Ordinal>;
    recurrence?: (recursiveCases: T[], o: number | Ordinal) => T;
    tuplicity?: number;
    offset?: number;
    memoize?: true | ((o: Ordinal) => string | number) | ((o: any) => string | number)[];
    optimizeRuntime?: boolean;
}) => (recursiveCase: any) => any;
declare const recursoList: <T>(list: any, { base, recurrence, tuplicity, }?: {
    base?: any;
    recurrence?: (x: any, c: any) => any;
    tuplicity?: number;
}) => (recursiveCase: any) => any;
export { recurso, recursoList };
