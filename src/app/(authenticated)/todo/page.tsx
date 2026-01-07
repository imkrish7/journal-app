"use client";
import Todo from "@/components/Todo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilterIcon, PlusIcon } from "lucide-react";
import { ITodo } from "@/interface/todo";
import { fetchTodosAction } from "@/app/actions/todo";
import { useState, useEffect, startTransition } from "react";
import { toast } from "sonner";

const Page = () => {
	const [todos, setTodos] = useState<ITodo[]>([]);
	useEffect(() => {
		startTransition(async () => {
			const { data, error } = await fetchTodosAction<ITodo[]>();
			if (!error && data) {
				setTodos(data);
			} else {
				toast.error("Error fetching todos");
			}
		});
	}, []);

	return (
		<div className="flex flex-col w-full items-center justify-center">
			<Card className="shadow-none border-none">
				<CardHeader className="border-b pb-2">
					<CardTitle className="text-2xl">To-Do</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
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
					{todos && todos.length > 0 ? (
						todos.map((todo: ITodo) => <Todo key={todo.id} data={todo} />)
					) : (
						<div className="text-center">No tasks found</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Page;
