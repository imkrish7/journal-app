export interface JournalEntry {
	id: string;
	date: string;
	title: string;
	content: string;
	mood: string;
	tags: string[];
	image?: string;
	aiInsight?: string;
	aiSummary?: string;
}

export enum Mood {
	JOY = "Joyful",
	CALM = "Calm",
	SAD = "Reflective",
	ANXIOUS = "Restless",
	ANGRY = "Intense",
	TIRED = "Exhausted",
}

export interface AIInsightResponse {
	summary: string;
	moodAnalysis: string;
	growthPrompt: string;
	keyThemes: string[];
}
