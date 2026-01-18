import { ActionState } from "@/interface/actions";
import z from "zod";

export const getErrors = <T extends z.ZodTypeAny>(
	name: keyof z.output<T>,
	state: ActionState<T>,
) => {
	if (state.errors && Array.isArray(state.errors)) {
		return state.errors.join();
	} else if (state.errors && state.errors[name]) {
		return state.errors[name];
	}
	return;
};
