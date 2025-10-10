"use client";

import * as React from "react";
import { NavUser } from "./nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { logoFont } from "@/app/layout";
import MemoryLottie from "@/components/icons/MemoryLottie";
import TodoLottie from "@/components/icons/TodoLottie";
import ReminderLottie from "@/components/icons/ReminderLottie";
import TrashLottie from "@/components/icons/TrashLottie";

import Link from "next/link";

// This is sample data
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Todoist",
			url: "/todo",
			icon: TodoLottie,
			isActive: true,
		},
		{
			title: "Memory",
			url: "/memory",
			icon: MemoryLottie,
			isActive: false,
		},
		{
			title: "Reminders",
			url: "/reminders",
			icon: ReminderLottie,
			isActive: false,
		},
		{
			title: "Trash",
			url: "/trash",
			icon: TrashLottie,
			isActive: false,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			collapsible="icon"
			variant="sidebar"
			className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
							<Link href="/dashboard">
								<div className="text-sidebar-secondary flex aspect-square size-10 items-center justify-center rounded-lg">
									<span className={`font-bold text-3xl ${logoFont.className}`}>
										j
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup className="p-1">
					<SidebarGroupContent>
						<SidebarMenu>
							{data.navMain.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										tooltip={{
											children: item.title,
											hidden: false,
										}}
										className="size-12 hover:bg-gray-200 mt-1"
									>
										<Link className="h-full w-full" href={item.url}>
											<item.icon />
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
