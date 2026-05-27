"use server";
import { http } from "@/http-service/http";
import { cookies } from "next/headers";
import { IHttpServiceResponse } from "@/interface/http";
import { HttpError } from "@/http-service/http-error";
import { redirect } from "next/navigation";

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
		if (error instanceof HttpError) {
			console.log(error);
			if (error.statusCode === 401) {
				redirect("/login");
			}
		}
		return {
			data: null,
			error: true,
			success: false,
		};
	}
};
