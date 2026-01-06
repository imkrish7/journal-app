"use server";

import { loginSchema } from "@/schema/auth";
import { cookies } from "next/headers";
import { z } from "zod";

export async function loginAction(
	userCredentials: z.infer<typeof loginSchema>,
) {
	const { username, password } = userCredentials;

	try {
		const response = await fetch("http://localhost:8000/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			const data = await response.json();
			const cookieStore = await cookies();

			cookieStore.set("auth", data.data.access_token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				path: "/",
				maxAge: 60 * 60 * 24 * 7, // 7 days
			});
			return { success: true };
		} else {
			const error = await response.json();
			console.error(error);
			throw error;
		}
	} catch (error) {
		throw error;
	}
}

export async function logoutAction() {
	const cookieStore = await cookies();
	cookieStore.delete("auth");
	return { success: true };
}
