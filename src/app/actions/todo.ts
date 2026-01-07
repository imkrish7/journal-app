"use server";
import { http } from "@/http-service/http";
import { cookies } from "next/headers";
import { IHttpServiceResponse } from "@/interface/http";
import { redirect } from "next/navigation";
import { HttpError } from "@/http-service/http-error";

export const fetchTodosAction = async <T>(): Promise<
	IHttpServiceResponse<T>
> => {
	try {
		const cookieStore = await cookies();
		const response = await http<T>("http://localhost:8000/todo/all", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Cookie: cookieStore.toString(),
			},
		});

		return { error: null, data: response };
	} catch (error) {
		if (error instanceof HttpError && error.statusCode === 401) {
			const cookieStore = await cookies();
			cookieStore.delete("auth");
			redirect("/login");
		}
		return {
			data: null,
			error,
		};
	}
};
