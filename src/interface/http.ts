export interface IHttpServiceResponse<T> {
	data: T | null;
	error: Error | null | unknown;
}
