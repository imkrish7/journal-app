"use server";
import { http } from "@/http-service/http";
import { HttpError } from "@/http-service/http-error";
import { ActionState } from "@/interface/actions";
import { eventSchema } from "@/schema/event";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createEventAction = async (
	_prevState: ActionState<typeof eventSchema>,
	payload: FormData,
) => {
	const requestPayload = {
		title: payload.get("title") || "",
		date: payload.get("date") || "",
		startTime: payload.get("startTime") || "",
		endTime: payload.get("endTime") || "",
		description: payload.get("description") || "",
	};

	console.log(requestPayload);

	const validatedPayload = eventSchema.safeParse(requestPayload);

	if (validatedPayload.error) {
		return {
			values: {
				title: "",
				description: "",
				startTime: "",
				endTime: "",
				date: new Date(),
			},
			success: false,
			errors: validatedPayload.error.flatten().fieldErrors,
		};
	}

	try {
		console.log(process.env.API_ENDPOINT);
		const cookieStore = await cookies();
		const response = http(`${process.env.API_ENDPOINT}/events/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify(requestPayload),
		});

		console.log(response);

		return {
			values: {
				title: "",
				description: "",
				startTime: "",
				endTime: "",
				date: new Date(),
			},
			success: true,
			errors: null,
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
			values: {
				title: "",
				description: "",
				startTime: "",
				endTime: "",
				date: new Date(),
			},
			success: false,
			errors: ["Failed to create event!"],
		};
	}
};
