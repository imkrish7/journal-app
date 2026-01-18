"use server";
import { HttpError } from "./http-error";

export const http = async <T>(
	url: string,
	options?: RequestInit,
): Promise<T> => {
	const response = await fetch(url, options);
	if (!response.ok) {
		throw new HttpError(`${response.statusText}`, response.status);
	}
	if (response.status === 204) {
		return true as T;
	}
	const result = await response.json();
	return result.data as T;
};
