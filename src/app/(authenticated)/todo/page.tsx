import Todo from "@/components/Todo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilterIcon, PlusIcon } from "lucide-react";
import React from "react";

const page = () => {
	return (
		<div className="flex flex-col w-full items-center justify-center">
			<Card className="shadow-none border-none">
				<CardHeader className="border-b-1 pb-2">
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
					{/* <Todo /> */}
				</CardContent>
			</Card>
		</div>
	);
};

export default page;
