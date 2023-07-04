/**
 * A callback that receives type {@link T} and returns type {@link R}
 */
type TransformCallback<T, R> = (value: T) => R;
/**
 * DO NOT USE THIS CLASS
 * @internal
 * A common base class both {@link Ok} and {@link Err} both inherit from
 */
abstract class _Result<T, E> {
	/** @returns Whether the Result is {@link Ok} or not */
	abstract is_ok(): boolean;
	/** @returns Whether the Result is {@link Err} or not */
	public is_err(): boolean {
		return !this.is_ok();
	}
	/**
	 * Directly returns the value regardless whether it is {@link Ok} or {@link Err}
	 * @returns Contained value which may be {@link T} or {@link E}
	 */
	public unsafe_unwrap(): T | E {
		return this.value;
	}
	/**
	 * Accepts two callbacks which each take the contained value/error
	 * and transforms them into the return type.
	 * @param okCallback - Callback that takes the success type.
	 * @param errCallback - Callback that takes the error type.
	 * @returns The specified return type {@link R}.
	 */
	public abstract unwrap_func<R = T>(okCallback: TransformCallback<T, R>, errCallback: TransformCallback<E, R>): R;
	/**
	 * Either directly return the success value or return the alternative given.
	 * @param alternative - Alternative value returned when the {@link Result} is an {@link Err()}.
	 * @returns The contained value or the given alternative.
	 */
	public abstract unwrap_or(alternative: T): T;
	/**
	 * Unwraps the value as {@link T}. Throws an error if the {@link Result} is an {@link Err()}.
	 * If {@link msg} is provided, it will be the message thrown in the error.
	*/
	public unwrap_ok(msg?: string): T {
		if (this.is_ok()) {
			return this.unsafe_unwrap() as T;
		}
		if (msg === undefined) {
			error(["Attempted to unwrap Err() as Ok()", this]);
		}
		error(msg);
	}
	/**
	 * Unwraps the value as {@link E}. Throws an error if the {@link Result} is an {@link Ok()}
	 * If {@link msg} is provided, it will be the message thrown in the error.
	 */
	public unwrap_err(msg?: string): E {
		if (this.is_err()) {
			return this.unsafe_unwrap() as E;
		}
		if (msg === undefined) {
			error(["Attempted to unwrap Ok() as Err()", this]);
		}
		error(msg);
	}
	/**
	 * Value contained by the {@link Ok} or {@link Err}.
	 */
	abstract value: T | E;
}
export class Ok<T, E> extends _Result<T, E> {
	public is_ok(): boolean {
		return true;
	}
	value: T;
	constructor(value: T) {
		super();
		this.value = value;
	}
	public unwrap_func<R = T>(okCallback: TransformCallback<T, R>, errCallback: TransformCallback<E, R>): R {
		return okCallback(this.value);
	}
	public unwrap_or(alternative: T): T {
		return this.value;
	}
}
export class Err<T, E> extends _Result<T, E> {
	public is_ok(): boolean {
		return false;
	}
	value: E;
	constructor(value: E) {
		super();
		this.value = value;
	}
	public unwrap_func<R = T>(okCallback: TransformCallback<T, R>, errCallback: TransformCallback<E, R>): R {
		return errCallback(this.value);
	}
	public unwrap_or(alternative: T): T {
		return alternative;
	}
}

export type Result<T, E = string> = Ok<T, E> | Err<T, E>;
