import z from "zod";

export interface ActionState<T extends z.ZodTypeAny> {
	values: z.infer<T>;
	errors: null | string[] | Partial<Record<keyof z.infer<T>, string[]>>;
	success: boolean;
}
