/**
 * Simple extension to Promise that allows resolving the promise from outside the point of creation.
 */
export class Deferred<T> extends Promise<T> {
	public resolve: (result?: T|PromiseLike<T>) => void;
	public reject: (reason?: any) => void;

	constructor() {
		let outerResolve, outerReject
		super((resolve, reject) => {
			outerResolve = resolve;
			outerReject = reject;
		});
		this.resolve = outerResolve;
		this.reject = outerReject;
	}
}
