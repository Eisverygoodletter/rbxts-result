/**
 * A callback that receives type T and returns type R
 */
type TransformCallback<T, R> = (value: T) => R;
/**
 * DO NOT USE THIS CLASS
 * @internal
 * A common base class both `Ok` and `Err` both inherit from
 */
declare abstract class _Result<T, E> {
    /** @returns Whether the Result is Ok or not */
    abstract isOk(): boolean;
    /** @returns Whether the Result is Err or not */
    isErr(): boolean;
    /**
     * Directly returns the value regardless whether it is Ok or Err
     * @returns Contained value which may be T or E
     */
    unsafeUnwrap(): T | E;
    /**
     * Accepts two callbacks which each take the contained value/error
     * and transforms them into the return type.
     * @param okCallback - Callback that takes the success type.
     * @param errCallback - Callback that takes the error type.
     * @returns The specified return type R.
     */
    abstract unwrapFunc<R = T>(okCallback: TransformCallback<T, R>, errCallback: TransformCallback<E, R>): R;
    /**
     * Either directly return the success value or return the alternative given.
     * @param alternative - Alternative value returned when the Result is an Err.
     * @returns The contained value or the given alternative.
     */
    abstract unwrapOr(alternative: T): T;
    /**
     * Value contained by the Ok or Err.
     */
    abstract value: T | E;
}
export declare class Ok<T, E> extends _Result<T, E> {
    isOk(): boolean;
    value: T;
    constructor(value: T);
    unwrapFunc<R = T>(okCallback: TransformCallback<T, R>, errCallback: TransformCallback<E, R>): R;
    unwrapOr(alternative: T): T;
}
export declare class Err<T, E> extends _Result<T, E> {
    isOk(): boolean;
    value: E;
    constructor(value: E);
    unwrapFunc<R = T>(okCallback: TransformCallback<T, R>, errCallback: TransformCallback<E, R>): R;
    unwrapOr(alternative: T): T;
}
export type Result<T, E = string> = Ok<T, E> | Err<T, E>;
export {};
