export interface ITodo {
	name: string;
	description: string;
	deadline: string;
	priority: string;
	_id: string;
}

export interface IEvent {
	name: string;
	arguments: ITodo;
}
