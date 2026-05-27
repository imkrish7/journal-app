"use client";

import { createContext, useContext } from "react";

interface ITodoContext {
	toggleTodoWidget: () => void;
	isWidgetOpen: boolean;
}

export const TodoContext = createContext<ITodoContext | null>(null);

export const useTodoWidget = () => {
	return useContext(TodoContext);
};
