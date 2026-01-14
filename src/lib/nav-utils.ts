import {
	Bell,
	Brain,
	CheckSquare,
	LayoutDashboard,
	Trash2,
} from "lucide-react";
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
			icon: LayoutDashboard,
			isActive: true,
			background: "bg-purple-100",
			textColor: "text-purple-600",
		},
		{
			title: "Todoist",
			url: "/todo",
			icon: CheckSquare,
			isActive: true,
			background: "bg-slate-100 ",
			textColor: "text-slate-600",
		},
		{
			title: "Memory",
			url: "/memory",
			icon: Brain,
			isActive: false,
			background: "bg-blue-100",
			textColor: "text-blue-600",
		},
		{
			title: "Reminders",
			url: "/reminders",
			icon: Bell,
			isActive: false,
			background: "bg-amber-50",
			textColor: "text-amber-500",
		},
		{
			title: "Trash",
			url: "/trash",
			icon: Trash2,
			isActive: false,
			background: "bg-red-50",
			textColor: "text-red-500",
		},
	],
};
