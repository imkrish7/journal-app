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
	useSidebar,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { data } from "@/lib/navUtils";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const router = useRouter();
	const pathname = usePathname();
	const { state } = useSidebar();
	// const isMobile = useIsMobile();

	const isActive = React.useCallback(
		(path: string) => {
			return pathname === path;
		},
		[pathname],
	);

	console.log(state);

	return (
		<Sidebar
			collapsible="none"
			{...props}
			// className="border-none has-data[variant=
			// 'floating']:bg-white/60"
			className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
			variant="floating"
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem className="">
						<SidebarMenuButton size="lg" asChild className={`md:h-10`}>
							<Link href="/dashboard" className="">
								<div
									className={`text-sidebar-secondary w-8 h-8 flex aspect-square items-center justify-center`}
								>
									<div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
										<i className="fa-solid fa-feather-pointed text-white text-sm"></i>
									</div>
									{/* {isMobile && (
										<span className="text-2xl font-serif font-bold italic tracking-tight text-slate-800">
											Aura
										</span>
									)} */}
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{data.navMain.map((item) => {
								return (
									<button
										key={item.title}
										onClick={() => {
											router.push(item.url);
										}}
										className={`w-full cursor-pointer flex items-center justify-between ${"p-1 rounded-lg"} transition-all group ${
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
												{item.icon.component ? (
													<item.icon.component size={18} />
												) : (
													<i className={item.icon.tag} />
												)}
											</div>
											{/* {isMobile && <span>{item.title}</span>} */}
										</div>
									</button>
								);
							})}
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
