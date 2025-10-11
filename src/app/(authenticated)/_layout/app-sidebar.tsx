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
import { logoFont } from "@/app/layout";
import MemoryLottie from "@/components/icons/MemoryLottie";
import TodoLottie from "@/components/icons/TodoLottie";
import ReminderLottie from "@/components/icons/ReminderLottie";
import TrashLottie from "@/components/icons/TrashLottie";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import HomeLottie from "@/components/icons/HomeLottie";

// This is sample data
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: HomeLottie,
			isActive: true,
		},
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
	// const [activeItem, setActiveItem] = useState(data.navMain[0]);
	const router = useRouter();
	const { state } = useSidebar();
	const isMobile = useIsMobile();
	console.log(state);
	return (
		<Sidebar collapsible="icon" {...props}>
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
				<SidebarGroup>
					<SidebarMenu>
						{data.navMain.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									onClick={() => {
										router.push(item.url);
									}}
									tooltip={item.title}
									className={`${
										state === "collapsed" ? "size-12" : "p-1"
									} mt-2`}
								>
									<div className={`w-5 h-5`}>
										<item.icon />
									</div>
									{(state === "expanded" || isMobile) && (
										<span>{item.title}</span>
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
