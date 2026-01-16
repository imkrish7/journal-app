import { TodoList } from "@/components/todo-list";

import TodoPage from "./components/TodoPage";

const page = async () => {
	return (
		<TodoPage>
			<TodoList />
		</TodoPage>
	);
};

export default page;
