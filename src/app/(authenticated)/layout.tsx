"use client";

import { CSSProperties, ReactNode, Suspense } from "react";
import { AppSidebar } from "./_layout/app-sidebar";

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import Loading from "./loading";
// import { ThemeToggle } from "@/components/theme-option";

interface IProps {
	children: ReactNode;
}

export default function Page({ children }: IProps) {
	return (
		<div className="w-full min-h-screen backdrop-blur-3xl">
			<SidebarProvider
				style={
					{
						"--sidebar-width-icon": "3.5rem",
					} as CSSProperties
				}
			>
				<AppSidebar />
				<SidebarInset className="relative bg-transparent h-screen">
					<header className="[x-2 sticky top-0 flex shrink-0 items-center justify-between gap-2 z-10">
						<SidebarTrigger />
						{/* <ThemeToggle /> */}
					</header>
					<div className="flex flex-1 flex-col gap-4 z-1 w-full h-[calc(100vh-theme(spacing.14))] overflow-y-auto overflow-x-hidden">
						<Suspense fallback={<Loading />}>{children}</Suspense>
					</div>
					<div className="bg-indigo-400 backdrop-blur-xs w-8 h-8 sm:w-40 sm:h-40 rounded-full absolute top-1 opacity-20 left-0  z-0"></div>
					<div className="bg-amber-400 backdrop-blur-xs rounded-md w-8 h-8 sm:w-40 sm:h-40 rotate-45 absolute bottom-30 -left-0 opacity-20 z-0"></div>
					<div className="bg-red-300 backdrop-blur-xs rounded-bl-[100px] w-20 h-20 sm:w-40 sm:h-40 absolute top-0 right-0 opacity-20 z-0"></div>
					<div className="bg-white backdrop-blur-xs w-20 h-20 sm:w-40 sm:h-40 rounded-full absolute bottom-50 opacity-20 right-0 z-0"></div>

					<div className="bg-white backdrop-blur-xs w-20 h-20 sm:w-40 sm:h-40 rounded-full absolute bottom-0 opacity-20 right-0  z-0"></div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
