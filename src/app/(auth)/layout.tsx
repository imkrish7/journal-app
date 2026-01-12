"use client";
import { FC, ReactNode, useState } from "react";
import Navbar from "./_layout/nav-bar";

interface IProps {
	children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
	const [view, setView] = useState<"landing" | "app" | "login" | "signup">(
		"landing"
	);
	return (
		<div className="relative w-full flex flex-col min-h-screen">
			<Navbar onNavigate={(v) => setView(v)} currentPage={view} />

			<main className="min-h-screen relative w-full">{children}</main>
		</div>
	);
};

export default Layout;
