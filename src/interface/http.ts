export interface IHttpServiceResponse<T> {
	data: T | null;
	error: boolean;
	success: boolean;
}
