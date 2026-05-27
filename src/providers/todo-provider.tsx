"use client";
import { TodoContext } from "@/context/todoContext";
import { FC, ReactNode, useState } from "react";

interface IProps {
	children: ReactNode;
}

export const TodoProvider: FC<IProps> = ({ children }) => {
	const [toggleWidget, setToggleWiget] = useState<boolean>(false);
	const handleToggle = () => {
		setToggleWiget((prev) => !prev);
	};
	return (
		<TodoContext
			value={{ toggleTodoWidget: handleToggle, isWidgetOpen: toggleWidget }}
		>
			{children}
		</TodoContext>
	);
};
