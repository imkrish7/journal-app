export enum Mood {
	ECSTATIC = "Ecstatic",
	HAPPY = "Happy",
	NEUTRAL = "Neutral",
	SAD = "Sad",
	ANXIOUS = "Anxious",
	CALM = "Calm",
	JOY = "Joy",
}

export interface JournalEntry {
	id: string;
	title: string;
	content: string;
	date: string;
	mood: Mood;
	createdAt: number;
	tags: string[];
	aiAnalysis?: {
		sentiment: string;
		tags: string[];
		summary: string;
		suggestion: string;
	};
}

export interface LiveTranscription {
	role: "user" | "model";
	text: string;
}

export enum Priority {
	LOW = "Low",
	MEDIUM = "Medium",
	HIGH = "High",
}

export interface SubTask {
	id: string;
	title: string;
	completed: boolean;
}

export interface Task {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	priority: Priority;
	tags: string[];
	subtasks: SubTask[];
	completed: boolean;
	createdAt: number;
}

export interface AIParsedTask {
	title: string;
	description: string;
	dueDate: string;
	priority: Priority;
	suggestedTags: string[];
	suggestedSubtasks: string[];
}

export interface CalendarEvent {
	id: string;
	title: string;
	description: string;
	date: string;
	startTime: string;
	endTime: string;
	color: string;
}
