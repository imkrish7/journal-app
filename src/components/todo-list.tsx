import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Todo from "@/components/Todo";
import { fetchTodos } from "@/lib/todoServices";
import { ITodo } from "@/interface/todo";

export const TodoList = async () => {
	const { data: todos, error } = await fetchTodos<ITodo[]>();

	return (
		<Card className=" bg-transparent border-none shadow-none flex flex-col flex-1 w-full sm:min-w-xl h-full overflow-hidden ">
			<CardContent className="flex flex-col gap-2 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
				<div className="flex flex-col flex-1 gap-2 ">
					{error && <div>Failed to fetch todos</div>}
					{!error && todos && todos.length > 0 ? (
						todos.map((todo: ITodo) => <Todo key={todo.id} data={todo} />)
					) : (
						<div className="mt-24 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
							<div className="w-20 h-20 bg-indigo-50 rounded-3xl mx-auto flex items-center justify-center text-indigo-200">
								<CheckCircle2 className="w-10 h-10" />
							</div>
							<div>
								<h3 className="text-2xl font-serif italic text-gray-400">
									No tasks found
								</h3>
								<p className="text-gray-300 font-medium">
									Your canvas is clear. What&apos;s next?
								</p>
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
