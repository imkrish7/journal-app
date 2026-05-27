"use server";
import { z } from "zod";
import { MemorySchema } from "@/schema/memory";
import { cookies } from "next/headers";

export const createMemory = async (data: z.infer<typeof MemorySchema>) => {
	try {
		const cookieStore = await cookies();
		const response = await fetch("http://localhost:8000/memory/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error("Failed to create memory");
		}
		const result = await response.json();
		return result;
	} catch (error) {
		console.error("Error creating memory:", error);
		throw error;
	}
};

export const getMemories = async () => {
	try {
		const cookieStore = await cookies();
		const response = await fetch("http://localhost:8000/memory/all", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Cookie: cookieStore.toString(),
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch memories");
		}
		const result = await response.json();
		return result;
	} catch (error) {
		console.error("Error creating memory:", error);
		throw error;
	}
};
