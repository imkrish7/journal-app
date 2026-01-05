"use client";

import * as React from "react";
import { NavUser } from "./nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import MemoryLottie from "@/components/icons/MemoryLottie";
import TodoLottie from "@/components/icons/TodoLottie";
import ReminderLottie from "@/components/icons/ReminderLottie";
import TrashLottie from "@/components/icons/TrashLottie";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { logoFont } from "@/fonts";
import HomeLottie from "@/components/icons/HomeLottie";

// This is sample data
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar:
			"https://images.pexels.com/photos/9558782/pexels-photo-9558782.jpeg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: HomeLottie,
			isActive: true,
			background: "#8238e830",
			textColor: "#8238e8",
		},
		{
			title: "Todoist",
			url: "/todo",
			icon: TodoLottie,
			isActive: true,
			background: "#56425230",
			textColor: "#565252",
		},
		{
			title: "Memory",
			url: "/memory",
			icon: MemoryLottie,
			isActive: false,
			background: "#5569cc30",
			textColor: "#5569cc",
		},
		{
			title: "Reminders",
			url: "/reminders",
			icon: ReminderLottie,
			isActive: false,
			background: "#fa333330",
			textColor: "#fa3333",
		},
		{
			title: "Trash",
			url: "/trash",
			icon: TrashLottie,
			isActive: false,
			background: "#fa333330",
			textColor: "#fa3333",
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const router = useRouter();
	const { state } = useSidebar();
	const isMobile = useIsMobile();

	return (
		<Sidebar
			collapsible="icon"
			{...props}
			className="border-none has-data[variant=
			'floating']:bg-white/60"
			variant="floating"
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild className="md:h-10 md:p-0">
							<Link href="/dashboard">
								<div
									className={`text-sidebar-secondary flex aspect-square ${
										state === "collapsed" ? "size-10" : "p-2"
									} items-center justify-center rounded-lg`}
								>
									<span className={`font-bold text-2xl ${logoFont.className}`}>
										j{state === "expanded" && <span>ournal</span>}
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{data.navMain.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									onClick={() => {
										router.push(item.url);
									}}
									tooltip={item.title}
									style={{
										backgroundColor: item.background,
									}}
									className={`group-data-[collapsible=icon]:p-0! mt-2`}
								>
									<div className={`w-8 h-8`}>
										<item.icon />
									</div>
									{(state === "expanded" || isMobile) && (
										<span
											style={{
												color: item.textColor,
											}}
											className={`font-bold`}
										>
											{item.title}
										</span>
									)}
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
