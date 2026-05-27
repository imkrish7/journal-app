"use server";
import { cookies } from "next/headers";
import { HttpError } from "./http-error";

export const http = async <T>(
	url: string,
	options?: RequestInit,
): Promise<T> => {
	console.log(`Making HTTP request to ${url} with options:`, options);
	const cookieStore = await cookies()
	console.log("Current cookies:", cookieStore.toString());
	const response = await fetch(url, {
		...options,
		headers: {
			...options?.headers,
			credentials: "include",
			Cookie: cookieStore.toString(),
		}
	});
	if (!response.ok) {
		throw new HttpError(`${response.statusText}`, response.status);
	}
	if (response.status === 204) {
		return true as T;
	}
	const result = await response.json();
	return result.data as T;
};
