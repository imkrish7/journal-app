import { AxiosRequestConfig } from "axios";
import { client } from "./client";

export interface APIResponse<T> {
	success: boolean;
	data: T;
	message?: string;
}

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
	try {
		const response = await client.request<APIResponse<T>>(config);
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

export const get = <T, P>(url: string, params: P) => {
	return apiRequest<T>({ method: "GET", url, params });
};

export const post = <T, P>(url: string, params: P) => {
	return apiRequest<T>({ method: "POST", url, params });
};

export const put = <T, P>(url: string, params: P) => {
	return apiRequest<T>({ method: "PUT", url, params });
};

export const remove = <T, P>(url: string, params: P) => {
	return apiRequest<T>({ method: "DELETE", url, params });
};
