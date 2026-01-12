import Todo from "@/components/Todo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilterIcon, PlusIcon } from "lucide-react";
import { ITodo } from "@/interface/todo";
import { fetchTodos } from "@/lib/todoServices";

const page = async () => {
	const { data: todos, error } = await fetchTodos<ITodo[]>();

	return (
		<div className="flex flex-col w-full h-full items-center justify-center py-2">
			<Card className="shadow-none border-none flex flex-col md:min-w-5xl h-full">
				<CardHeader className="border-b pb-2">
					<CardTitle className="text-2xl">To-Do</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col flex-1 gap-2 overflow-hidden">
					<div className="flex gap-2">
						<Button className="bg-indigo-600">
							<PlusIcon />
							<span className="">New Task</span>
						</Button>
						<Button variant="outline">
							<FilterIcon />
							Filter
						</Button>
					</div>
					<div className="flex flex-col flex-1 gap-2 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
						{error && <div>Failed to fetch todos</div>}
						{!error && todos && todos.length > 0 ? (
							todos.map((todo: ITodo) => <Todo key={todo.id} data={todo} />)
						) : (
							<div className="text-center">No tasks found</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default page;
