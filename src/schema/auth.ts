import { z } from "zod";

export const loginSchema = z.object({
	email: z.email(),
	password: z.string(),
});

export const signupSchema = z.object({
	name: z.string().min(2),
	email: z.email(),
	password: z.string(),
});
