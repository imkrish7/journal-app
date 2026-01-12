"use server";
import { http } from "@/http-service/http";
import { cookies } from "next/headers";
import { IHttpServiceResponse } from "@/interface/http";

export const fetchTodos = async <T>(): Promise<IHttpServiceResponse<T>> => {
	try {
		const cookieStore = await cookies();
		const response = await http<T>("http://localhost:8000/todo/all", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Cookie: cookieStore.toString(),
			},
			cache: "no-store",
		});

		return { error: false, data: response, success: true };
	} catch (error) {
		console.error(error);
		return {
			data: null,
			error: true,
			success: false,
		};
	}
};
