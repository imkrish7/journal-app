"use client";
import { FC, useActionState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { EllipsisIcon, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Item, ItemContent, ItemTitle } from "./ui/item";
import { ITodo } from "@/interface/todo";
import Link from "next/link";
import { deleteTodoAction } from "@/app/actions/todo";
import { ActionState } from "@/interface/actions";
import { deleteTodoSchema } from "@/schema/todo";
import { toast } from "sonner";

interface IProps {
	data: ITodo;
}

const Todo: FC<IProps> = ({ data }) => {
	const [deleteState, deleteAction, deletePending] = useActionState<
		ActionState<typeof deleteTodoSchema>,
		FormData
	>(deleteTodoAction, {
		values: {
			todoId: "",
		},
		success: false,
		errors: null,
	});

	useEffect(() => {
		if (deleteState.errors) {
			toast.error("Failed to delete task!");
		}
	}, [deleteState]);

	return (
		<Card className="relative shadow-none">
			<div className="absolute right-5 top-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							size="sm"
							className="w-fit cursor-pointer"
						>
							<EllipsisIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-36 [--radius:0.65rem]" align="end">
						<DropdownMenuItem className="p-0">
							<Item size="sm" className="w-full p-2">
								<ItemContent className="gap-0.5">
									<ItemTitle>Edit</ItemTitle>
								</ItemContent>
							</Item>
						</DropdownMenuItem>
						<DropdownMenuItem className="p-0">
							<Item size="sm" className="w-full p-2">
								<ItemContent className="py-0!">
									<form action={deleteAction} className="w-full">
										<input
											name="todoId"
											value={data.id}
											readOnly
											className="invisible p-0 w-0 h-0 select-none"
										/>
										<button
											disabled={deletePending}
											type="submit"
											className="border-none font-semibold inline-flex justify-start! p-0! hover:bg-transparent w-full hover:shadow-none"
										>
											Delete
										</button>
									</form>
								</ItemContent>
							</Item>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<CardContent className="flex flex-col">
				<div className="flex items-start gap-3">
					<Checkbox id="terms-2" defaultChecked />
					<div className="grid gap-2">
						<Link href={`/todo/${data.id}`}>
							<Label className="cursor-pointer">{data.task}</Label>
						</Link>
						<p className="text-muted-foreground text-sm">{data.description}</p>
						<div className="flex gap-2 items-center">
							<span className="text-xs text-gray-400">
								{new Date().toDateString()}
							</span>
							<div className="flex items-center gap-2 text-gray-400">
								<MessageCircle className="size-4" />
								<span>{0}</span>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Todo;
