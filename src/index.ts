/**
 * A callback that receives type T and returns type R
 */
type TransformCallback<T, R> = (value: T) => R;
/**
 * DO NOT USE THIS CLASS
 * @internal
 * A common base class both `Ok` and `Err` both inherit from
 */
abstract class _Result<T, E> {
	/** @returns Whether the Result is Ok or not */
	abstract isOk(): boolean;
	/** @returns Whether the Result is Err or not */
	public isErr(): boolean {
		return !this.isOk();
	}
	/**
	 * Directly returns the value regardless whether it is Ok or Err
	 * @returns Contained value which may be T or E
	 */
	public unsafeUnwrap(): T | E {
		return this.value;
	}
	/**
	 * Accepts two callbacks which each take the contained value/error
	 * and transforms them into the return type.
	 * @param okCallback - Callback that takes the success type.
	 * @param errCallback - Callback that takes the error type.
	 * @returns The specified return type R.
	 */
	public abstract unwrapFunc<R = T>(okCallback: TransformCallback<T, R>, errCallback: TransformCallback<E, R>): R;
	/**
	 * Either directly return the success value or return the alternative given.
	 * @param alternative - Alternative value returned when the Result is an Err.
	 * @returns The contained value or the given alternative.
	 */
	public abstract unwrapOr(alternative: T): T;
	/**
	 * Value contained by the Ok or Err.
	 */
	abstract value: T | E;
}
export class Ok<T, E> extends _Result<T, E> {
	public isOk(): boolean {
		return true;
	}
	value: T;
	constructor(value: T) {
		super();
		this.value = value;
	}
	public unwrapFunc<R = T>(okCallback: TransformCallback<T, R>, errCallback: TransformCallback<E, R>): R {
		return okCallback(this.value);
	}
	public unwrapOr(alternative: T): T {
		return this.value;
	}
}
export class Err<T, E> extends _Result<T, E> {
	public isOk(): boolean {
		return false;
	}
	value: E;
	constructor(value: E) {
		super();
		this.value = value;
	}
	public unwrapFunc<R = T>(okCallback: TransformCallback<T, R>, errCallback: TransformCallback<E, R>): R {
		return errCallback(this.value);
	}
	public unwrapOr(alternative: T): T {
		return alternative;
	}
}

export type Result<T, E = string> = Ok<T, E> | Err<T, E>;
