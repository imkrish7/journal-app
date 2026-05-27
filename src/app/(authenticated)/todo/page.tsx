import { TodoList } from "@/app/(authenticated)/todo/components/todo-list";

import TodoPage from "./components/TodoPage";
import { TodoProvider } from "@/providers/todo-provider";

const page = async () => {
	return (
		<TodoProvider>
			<TodoPage>
				<TodoList />
			</TodoPage>
		</TodoProvider>
	);
};

export default page;
