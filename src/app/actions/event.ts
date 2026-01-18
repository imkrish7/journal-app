import { ActionState } from "@/interface/actions";
import { eventSchema } from "@/schema/event";

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
};
