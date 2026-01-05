import { ITodo } from "@/interface/todo";
import { APIResponse } from "@/networkingServices/method";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(request: NextRequest) {
	const proxyURL = new URL("/todo/all", "http://localhost:8000");

	const proxyRequest = new NextRequest(proxyURL, request);

	try {
		const result = await fetch(proxyRequest);
		if (!result.ok) {
			return new NextResponse("Bad request", { status: 401 });
		}
		const response = (await result.json()) as APIResponse<ITodo[]>;
		return response;
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "An unknown error occurred";
		return new NextResponse(message, { status: 500 });
	}
}
