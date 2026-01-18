import { Brain, CheckSquare, LayoutDashboard, Trash2 } from "lucide-react";
export const data = {
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
			icon: { component: LayoutDashboard, tag: null },
			isActive: true,
			background: "bg-purple-100",
			textColor: "text-purple-600",
		},
		{
			title: "Todoist",
			url: "/todo",
			icon: { component: CheckSquare, tag: null },
			isActive: true,
			background: "bg-slate-100 ",
			textColor: "text-slate-600",
		},
		{
			title: "Memory",
			url: "/memory",
			icon: { component: Brain, tag: null },
			isActive: false,
			background: "bg-blue-100",
			textColor: "text-blue-600",
		},
		{
			title: "Events",
			url: "/reminders",
			icon: {
				component: null,
				tag: "fa-solid fa-calendar-day",
			},
			isActive: false,
			background: "bg-amber-50",
			textColor: "text-amber-500",
		},
		{
			title: "Trash",
			url: "/trash",
			icon: { component: Trash2, tag: null },
			isActive: false,
			background: "bg-red-50",
			textColor: "text-red-500",
		},
	],
};
