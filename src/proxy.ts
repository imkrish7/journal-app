import { NextRequest, NextResponse } from "next/server";

const privateRoutes = [
	"/todo",
	"/trash",
	"/memory",
	"/reminders",
	"/dashboard",
];

export const config = {
	matcher: ["/todo", "/trash", "/memory", "/reminders", "/dashboard"],
};

export default async function proxy(request: NextRequest) {
	const hasCookie = request.cookies.get("auth");
	if (!hasCookie && privateRoutes.includes(request.nextUrl.pathname)) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}
