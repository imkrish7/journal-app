export enum Mood {
	ECSTATIC = "Ecstatic",
	HAPPY = "Happy",
	NEUTRAL = "Neutral",
	SAD = "Sad",
	ANXIOUS = "Anxious",
	CALM = "Calm",
}

export interface JournalEntry {
	id: string;
	title: string;
	content: string;
	mood: Mood;
	createdAt: number;
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
