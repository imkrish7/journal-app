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

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { data } from "@/lib/nav-utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const router = useRouter();
	const pathname = usePathname();
	const { state } = useSidebar();
	const isMobile = useIsMobile();

	const isActive = React.useCallback(
		(path: string) => {
			return pathname === path;
		},
		[pathname]
	);

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
					<SidebarMenuItem className="flex justify-center">
						<SidebarMenuButton size="lg" asChild className={`md:h-10 md:p-0`}>
							<Link href="/dashboard" className="">
								<div
									className={`text-sidebar-secondary flex aspect-square ${
										state === "collapsed" ? "h-8 w-8" : "gap-3"
									} items-center justify-center`}
								>
									<div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
										<i className="fa-solid fa-feather-pointed text-white text-sm"></i>
									</div>
									{(state === "expanded" || isMobile) && (
										<span className="text-2xl font-serif font-bold italic tracking-tight text-slate-800">
											Aura
										</span>
									)}
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{data.navMain.map((item) => {
							return (
								<button
									key={item.title}
									onClick={() => {
										router.push(item.url);
									}}
									className={`w-full cursor-pointer flex items-center justify-between ${
										state === "expanded"
											? "p-3 rounded-2xl "
											: "p-1 rounded-lg "
									} transition-all group ${
										isActive(item.url)
											? `${item.background} ${item.textColor} font-semibold`
											: "text-slate-500 hover:bg-slate-50"
									}`}
								>
									<div className="flex items-center space-x-3">
										<div
											className={`p-2 rounded-lg transition-colors ${
												isActive(item.url)
													? `${item.background} ${item.textColor}`
													: "bg-slate-100 hover:bg-slate-200"
											}`}
										>
											<item.icon size={18} />
										</div>
										{state === "expanded" && <span>{item.title}</span>}
									</div>
								</button>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
