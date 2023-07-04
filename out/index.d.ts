/**
 * A callback that receives type {@link T} and returns type {@link R}
 */
type TransformCallback<T, R> = (value: T) => R;
/**
 * DO NOT USE THIS CLASS
 * @internal
 * A common base class both {@link Ok} and {@link Err} both inherit from
 */
declare abstract class _Result<T, E> {
    /** @returns Whether the Result is {@link Ok} or not */
    abstract is_ok(): boolean;
    /** @returns Whether the Result is {@link Err} or not */
    is_err(): boolean;
    /**
     * Directly returns the value regardless whether it is {@link Ok} or {@link Err}
     * @returns Contained value which may be {@link T} or {@link E}
     */
    unsafe_unwrap(): T | E;
    /**
     * Accepts two callbacks which each take the contained value/error
     * and transforms them into the return type.
     * @param okCallback - Callback that takes the success type.
     * @param errCallback - Callback that takes the error type.
     * @returns The specified return type {@link R}.
     */
    abstract unwrap_func<R = T>(okCallback: TransformCallback<T, R>, errCallback: TransformCallback<E, R>): R;
    /**
     * Either directly return the success value or return the alternative given.
     * @param alternative - Alternative value returned when the {@link Result} is an {@link Err()}.
     * @returns The contained value or the given alternative.
     */
    abstract unwrap_or(alternative: T): T;
    /**
     * Unwraps the value as {@link T}. Throws an error if the {@link Result} is an {@link Err()}.
     * If {@link msg} is provided, it will be the message thrown in the error.
    */
    unwrap_ok(msg?: string): T;
    /**
     * Unwraps the value as {@link E}. Throws an error if the {@link Result} is an {@link Ok()}
     * If {@link msg} is provided, it will be the message thrown in the error.
     */
    unwrap_err(msg?: string): E;
    /**
     * Value contained by the {@link Ok} or {@link Err}.
     */
    abstract value: T | E;
}
export declare class Ok<T, E> extends _Result<T, E> {
    is_ok(): boolean;
    value: T;
    constructor(value: T);
    unwrap_func<R = T>(okCallback: TransformCallback<T, R>, errCallback: TransformCallback<E, R>): R;
    unwrap_or(alternative: T): T;
}
export declare class Err<T, E> extends _Result<T, E> {
    is_ok(): boolean;
    value: E;
    constructor(value: E);
    unwrap_func<R = T>(okCallback: TransformCallback<T, R>, errCallback: TransformCallback<E, R>): R;
    unwrap_or(alternative: T): T;
}
export type Result<T, E = string> = Ok<T, E> | Err<T, E>;
export {};
