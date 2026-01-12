"use client";

import { CSSProperties, ReactNode, Suspense } from "react";
import { AppSidebar } from "./_layout/app-sidebar";

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import RobotLottie from "@/components/icons/RobotLottie";

interface IProps {
	children: ReactNode;
}

export default function Page({ children }: IProps) {
	return (
		<div className="w-full min-h-screen bg-slate-50 backdrop-blur-3xl">
			<SidebarProvider
				style={
					{
						"--sidebar-width-icon": "3.5rem",
					} as CSSProperties
				}
			>
				<AppSidebar />
				<SidebarInset className="relative bg-transparent h-screen">
					<header className="sticky top-0 flex shrink-0 items-center gap-2 z-10">
						<SidebarTrigger />
					</header>
					<div className="flex flex-1 flex-col gap-4 z-1 w-full h-[calc(100vh-theme(spacing.14))] ">
						<Suspense fallback={<RobotLottie />}>{children}</Suspense>
					</div>
					<div className="bg-indigo-400 backdrop-blur-xs w-8 h-8 sm:w-40 sm:h-40 rounded-full absolute top-1 opacity-20 left-0  z-0"></div>
					<div className="bg-amber-400 backdrop-blur-xs rounded-md w-8 h-8 sm:w-40 sm:h-40 rotate-45 absolute bottom-30 -left-0 opacity-20 z-0"></div>
					<div className="bg-red-300 backdrop-blur-xs rounded-bl-[100px] w-20 h-20 sm:w-40 sm:h-40 absolute top-0 right-0 opacity-20 z-0"></div>
					<div className="bg-white backdrop-blur-xs w-20 h-20 sm:w-40 sm:h-40 rounded-full absolute bottom-50 opacity-20 right-0 z-0"></div>

					{/* <div className="bg-white backdrop-blur-xs w-full sm:w-40 h-40 rounded-tr-[100px] rounded-bl-[100px] origin-top-left absolute bottom-50 opacity-20 right-130  z-0"></div>
					<div className="bg-white backdrop-blur-xs w-full sm:w-40 h-40 rounded-tr-[100px] rounded-bl-[100px] absolute origin-top-left -rotate-180 bottom-50 opacity-20 right-130  z-0"></div>
					<div className="bg-white backdrop-blur-xs w-full sm:w-40 h-40 rounded-tr-[100px] rounded-bl-[100px] absolute bottom-50 -rotate-90 origin-top-left opacity-20 right-130  z-0"></div>
					<div className="bg-white backdrop-blur-xs w-full sm:w-40 h-40 rounded-tr-[100px] rounded-bl-[100px] absolute bottom-50 origin-top-left -rotate-270 opacity-20 right-130  z-0"></div> */}
					<div className="bg-white backdrop-blur-xs w-20 h-20 sm:w-40 sm:h-40 rounded-full absolute bottom-0 opacity-20 right-0  z-0"></div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
