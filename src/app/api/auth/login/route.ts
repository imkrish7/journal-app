import { ILoginResponse } from "@/interface/auth";
import { APIResponse } from "@/networkingServices/method";
import { loginSchema } from "@/schema/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const clonedRequest = await request.clone();
	const requestPayload = await clonedRequest.json();
	const validatedPayload = loginSchema.safeParse(requestPayload);

	if (validatedPayload.error) {
		return new Response("Invalid request", { status: 401 });
	}

	const proxyURL = new URL("/auth/login", "http://localhost:8000");

	const proxyRequest = new NextRequest(proxyURL, request);

	try {
		const result = await fetch(proxyRequest);

		if (!result.ok) {
			return new NextResponse("Bad request", { status: 401 });
		}
		const responsePayload =
			(await result.json()) as APIResponse<ILoginResponse>;
		const response = NextResponse.json({ success: true });

		response.cookies.set("JOURNAL_AUTH", responsePayload.data.access_token, {
			httpOnly: true,
			path: "/",
			secure: true,
			sameSite: "lax",
		});

		return response;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unexpected error";
		return new NextResponse(message, { status: 500 });
	}
}
