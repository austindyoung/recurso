declare const identity: (x: any) => any;
declare const MaxIterability = 1000;
declare const DefaultRecurrence: (x: any, c: any) => any;
declare const DefaultNext: ((x: any) => number)[];
declare const access: (source: any, argument: any) => any;
declare const getIteratedNextFunction: (next: any, tuplicity: any) => (x: any) => any;
declare const getDefaultTuplicity: (next: any, base: any) => number;
declare const getFirstCases: (iterator: any, n?: number) => any[];
declare const getGetBaseCase: <T>(base: (...args: any[]) => T | T[], ordering: any) => (recursiveCase: any) => any;
declare function makeRangeIterator(start?: number, end?: number, step?: number): IterableIterator<number>;
declare function makeOffsetIterator(iterator: any, offset?: number): IterableIterator<any>;
declare const toIterator: (x: any) => any;
declare const getIsIterable: (obj: any) => boolean;
declare const getIsIterator: (obj: any) => any;
declare const getExplicitBaseFromOrdering: ({ base, ordering, offset }?: {
    base: any;
    ordering?: IterableIterator<number>;
    offset?: number;
}) => any[];
declare const getIsSinglePassTailable: (base: any, ordering: any) => any;
declare const recurso: ({ base, ordering, next, recurrence, tuplicity, offset, }?: {
    base?: (...args: any[]) => any;
    ordering?: any;
    next?: any;
    recurrence?: (x: any, c: any) => any;
    tuplicity?: number;
    offset?: number;
}) => (recursiveCase: any) => any;
declare const recursoList: (list: any, { base, recurrence, tuplicity, }?: {
    base?: any;
    recurrence?: (x: any, c: any) => any;
    tuplicity?: number;
}) => (recursiveCase: any) => any;
