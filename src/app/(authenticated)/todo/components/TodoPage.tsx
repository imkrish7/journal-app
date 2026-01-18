"use client";
import { NewTaskModal } from "@/components/CreateNewTask";
import { Button } from "@/components/ui/button";
import { useTodoWidget } from "@/context/todoContext";
import { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode;
}
const TodoPage: FC<IProps> = ({ children }) => {
	const todoWidget = useTodoWidget();
	return (
		<div className="px-6 relative flex flex-col h-full w-full space-y-10 animate-fade-in">
			<header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
				<div>
					<h1 className="text-5xl font-serif font-bold text-slate-900 mb-2">
						To-Do
					</h1>
					<p className="text-slate-500 font-medium">
						Capture your intentions for today
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Button
						onClick={todoWidget?.toggleTodoWidget}
						className="rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-100 flex items-center gap-2 px-6"
					>
						<i className="fa-solid fa-plus"></i> New Task
					</Button>
					<Button
						variant="outline"
						className="rounded-2xl flex items-center gap-2 px-6"
					>
						<i className="fa-solid fa-filter"></i> Filter
					</Button>
				</div>
			</header>
			{children}
			{todoWidget?.isWidgetOpen && (
				<NewTaskModal
					isOpen={todoWidget.isWidgetOpen}
					handleClose={todoWidget.toggleTodoWidget}
				/>
			)}
		</div>
	);
};

export default TodoPage;
