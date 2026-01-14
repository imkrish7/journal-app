export const dynamic = "force-dynamic";

import Todo from "@/components/Todo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ITodo } from "@/interface/todo";
import { fetchTodos } from "@/lib/todoServices";

const page = async () => {
	const { data: todos, error } = await fetchTodos<ITodo[]>();

	return (
		<div className="px-6 flex flex-col h-full w-ful space-y-10 animate-fade-in">
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
					<Button className="rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-100 flex items-center gap-2 px-6">
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
			<Card className=" bg-transparent border-none shadow-none flex flex-col flex-1 w-full sm:min-w-xl h-full overflow-hidden ">
				<CardContent className="flex flex-col gap-2 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
					<div className="flex flex-col flex-1 gap-2 ">
						{error && <div>Failed to fetch todos</div>}
						{!error && todos && todos.length > 0 ? (
							todos.map((todo: ITodo) => <Todo key={todo.id} data={todo} />)
						) : (
							<div className="text-center">No tasks found</div>
						)}
					</div>
				</CardContent>
			</Card>
			{/* <div className="h-2" /> */}
		</div>
	);
};

export default page;
