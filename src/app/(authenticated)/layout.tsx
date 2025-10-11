"use client";

import { ReactNode, Suspense } from "react";
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
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4 z-10">
					<SidebarTrigger />
				</header>
				<div className="flex flex-1 flex-col gap-4">
					<Suspense fallback={<RobotLottie />}>{children}</Suspense>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
