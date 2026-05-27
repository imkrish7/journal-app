import z from "zod";

export const Breakpoint = z.object({
	title: z.string().min(10),
	completion_date: z.string(),
	completed: z.boolean(),
});

export const todoSchema = z.object({
	task: z.string().min(5),
	description: z.string().min(4).optional(),
	tags: z.array(z.string()).optional(),
	deadline: z.string().optional(),
	prioriy: z.enum(["Low", "High", "Medium"]).optional(),
	breakpoints: z.array(Breakpoint).optional(),
});

export const deleteTodoSchema = z.object({
	todoId: z.string().min(10),
});
