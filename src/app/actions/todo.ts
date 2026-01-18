"use server";
import { http } from "@/http-service/http";
import { HttpError } from "@/http-service/http-error";
import { ActionState } from "@/interface/actions";
import { Priority } from "@/interface/jouranal";
import { deleteTodoSchema, todoSchema } from "@/schema/todo";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createTodoAction = async (
	_prevState: ActionState<typeof todoSchema>,
	actionPayload: FormData,
) => {
	const payload = {
		task: actionPayload.get("task"),
		description: actionPayload.get("description"),
		deadline: actionPayload.get("deadline"),
		priority: actionPayload.get("priority"),
		tags: actionPayload.getAll("tags") || [],
		breakpoints: actionPayload.get("breakpoints") || [],
	};

	const validatePayload = todoSchema.safeParse(payload);

	if (!validatePayload.success) {
		return {
			values: {
				task: "",
				description: "",
				tags: [],
				deadline: "",
				prioriy: Priority.LOW,
				breakpoints: [],
			},
			errors: validatePayload.error.flatten().fieldErrors,
			success: false,
		};
	}
	const cookieStore = await cookies();
	try {
		await http(`${process.env.API_ENDPOINT}/todo/create`, {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
		});
		revalidatePath("/todo");
		return {
			errors: null,
			success: true,
			values: {
				task: "",
				description: "",
				tags: [],
				deadline: "",
				prioriy: Priority.LOW,
				breakpoints: [],
			},
		};
	} catch (error) {
		if (error instanceof HttpError) {
			console.log(error);
			if (error.statusCode === 401) {
				cookieStore.delete("auth");
				redirect("/login");
			}
		}
		return {
			errors: ["Something went wrong"],
			success: false,
			values: {
				task: "",
				description: "",
				tags: [],
				deadline: "",
				prioriy: Priority.LOW,
				breakpoints: [],
			},
		};
	}
};

export const deleteTodoAction = async (
	_prevState: ActionState<typeof deleteTodoSchema>,
	paylaod: FormData,
) => {
	const requestPayload = {
		todoId: paylaod.get("todoId"),
	};

	const validatePayload = deleteTodoSchema.safeParse(requestPayload);

	if (!validatePayload.success) {
		return {
			values: {
				todoId: "",
			},
			errors: validatePayload.error.flatten().fieldErrors,
			success: false,
		};
	}
	const cookieStore = await cookies();
	try {
		await http<boolean>(
			`${process.env.API_ENDPOINT}/todo/${validatePayload.data.todoId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},
			},
		);
		revalidatePath("/todo");
		return {
			errors: null,
			success: true,
			values: {
				todoId: "",
			},
		};
	} catch (error) {
		console.log(error);
		if (error instanceof HttpError) {
			if (error.statusCode === 401) {
				cookieStore.delete("auth");
				redirect("/login");
			}
		}
		return {
			errors: ["Something went wrong"],
			success: false,
			values: {
				todoId: "",
			},
		};
	}
};
