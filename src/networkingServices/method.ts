import { AxiosRequestConfig, AxiosResponse } from "axios";
import { client } from "./client";

export interface APIResponse<T> {
	success: boolean;
	data: T;
	message?: string;
}

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
	try {
		// Access - Control - Allow - Origin;
		const response = await client<AxiosResponse<T>>(config);
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

export const get = async <T, P = null>(url: string, params: P) => {
	return await apiRequest<T>({ method: "GET", url, params });
};

export const post = async <T, P extends null>(url: string, params: P) => {
	return await apiRequest<T>({ method: "POST", url, data: params });
};

export const put = async <T, P>(url: string, params: P) => {
	return await apiRequest<T>({ method: "PUT", url, params });
};

export const remove = async <T, P>(url: string, params: P) => {
	return await apiRequest<T>({ method: "DELETE", url, params });
};
