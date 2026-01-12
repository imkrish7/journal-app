import { NextRequest } from "next/server";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
	const proxyURL = "http://localhost:8000/agent/interaction";

	// 1. Get cookies from the Next.js store
	const cookieStore = await cookies();
	const allCookies = cookieStore.toString(); // This gets all cookies in "key=value; key2=value2" format

	// 2. Call Python Backend
	const response = await fetch(proxyURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			// Inject the cookies here
			Cookie: allCookies,
			// Also forward the Authorization header if you use Bearer tokens
			Authorization: req.headers.get("Authorization") || "",
		},
		// Pass the stream directly to avoid "disturbed body" errors
		body: req.body,
		// Crucial: Tells Node not to buffer or cache the response
		cache: "no-store",
		// duplex: "half",
	});

	console.log(response);

	if (!response.body) return new Response("No body", { status: 500 });

	// 2. Return the stream directly with 'no-transform'
	return new Response(response.body, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache, no-transform", // 'no-transform' stops Gzip buffering
			"X-Accel-Buffering": "no", // Specifically for Nginx/Proxies
			Connection: "keep-alive",
		},
	});
}
