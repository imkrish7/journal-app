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
	console.log("Received payload:", Object.fromEntries(payload.entries()));
	const requestPayload = {
		title: payload.get("title") || "",
		startDate: payload.get("startDate") || "",
		endDate: payload.get("endDate") || "",
		startTime: payload.get("startTime") || "",
		endTime: payload.get("endTime") || "",
		description: payload.get("description") || "",
	};

	const validatedPayload = eventSchema.safeParse(requestPayload);

	if (validatedPayload.error) {
		return {
			values: {
				title: "",
				description: "",
				startTime: "",
				endTime: "",
				startDate: "",
				endDate: "",
			},
			success: false,
			errors: validatedPayload.error.flatten().fieldErrors,
		};
	}
	const cookieStore = await cookies();
	try {
		
		await http(`${process.env.API_ENDPOINT}/events/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify(requestPayload),
		});

		return {
			values: {
				title: "",
				description: "",
				startTime: "",
				endTime: "",
				startDate: "",
				endDate: "",
			},
			success: true,
			errors: null,
		};
	} catch (error) {
		if (error instanceof HttpError) {
			console.log("HTTP Error:", error);
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
				startDate: "",
				endDate: "",
			},
			success: false,
			errors: ["Failed to create event!"],
		};
	}
};
