import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { JournalEntry, Mood } from "@/interface/jouranal";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent } from "./ui/dialog";

const CreateMemory = () => {
	const [entries, setEntries] = useState<JournalEntry[]>(() => {
		const saved = localStorage.getItem("aura_entries");
		return saved ? JSON.parse(saved) : [];
	});
	const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [inspiration, setInspiration] = useState("");

	console.log(setInspiration);

	useEffect(() => {
		localStorage.setItem("aura_entries", JSON.stringify(entries));
	}, [entries]);

	useEffect(() => {
		// getDailyInspiration().then(setInspiration);
	}, []);

	const createNewEntry = () => {
		const newEntry: JournalEntry = {
			id: Date.now().toString(),
			date: new Date().toLocaleDateString("en-US", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
			title: "",
			content: "",
			mood: Mood.JOY,
			tags: [],
			createdAt: new Date().getDate(),
		};
		setActiveEntry(newEntry);
		setIsEditing(true);
	};

	const saveEntry = async (entry: JournalEntry) => {
		if (!entry.title && !entry.content) return;

		setIsAnalyzing(true);
		const updatedEntry = { ...entry };

		try {
			if (entry.content.length > 20) {
				// const insights = await analyzeJournalEntry(entry.content, entry.title);
				// updatedEntry.aiInsight = insights.growthPrompt;
				// updatedEntry.aiSummary = insights.summary;
				// updatedEntry.tags = insights.keyThemes;
			}
		} catch (e) {
			console.error(e);
		}

		const index = entries.findIndex((e) => e.id === entry.id);
		if (index > -1) {
			const newEntries = [...entries];
			newEntries[index] = updatedEntry;
			setEntries(newEntries);
		} else {
			setEntries([updatedEntry, ...entries]);
		}

		setActiveEntry(updatedEntry);
		setIsEditing(false);
		setIsAnalyzing(false);
	};

	return (
		<Dialog defaultOpen={true}>
			<DialogContent className="h-full min-w-4xl">
				<div className="h-full bg-slate-50 flex flex-col md:flex-row relative">
					<main className="flex-1 p-6 md:p-12 overflow-y-auto h-full">
						<div className="relative h-full max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
							<div className="space-y-6 relative h-full">
								<input
									type="text"
									placeholder="Give your entry a title..."
									className="w-full text-4xl font-serif font-bold bg-transparent border-none outline-none placeholder:text-slate-300 focus:ring-0"
									// value={activeEntry.title}
									// onChange={(e) =>
									// 	setActiveEntry({
									// 		...activeEntry,
									// 		title: e.target.value,
									// 	})
									// }
								/>
								<div className="flex gap-2 items-center overflow-x-auto pb-2 scrollbar-hide">
									{Object.values(Mood).map((m) => (
										<Button
											key={m}
											// onClick={() =>
											// 	setActiveEntry({ ...activeEntry, mood: m })
											// }
											// variant={activeEntry.mood === m ? "secondary" : "outline"}
											size="sm"
											className="whitespace-nowrap rounded-full"
										>
											{m}
										</Button>
									))}
								</div>
								<Textarea
									placeholder="How are you really feeling today?"
									className="w-full min-h-[400px] text-lg bg-transparent border-none outline-none resize-none placeholder:text-slate-300 focus:ring-0 leading-relaxed shadow-none"
									// value={activeEntry.content}
									// onChange={(e) =>
									// 	setActiveEntry({
									// 		...activeEntry,
									// 		content: e.target.value,
									// 	})
									// }
								/>
								<div className="flex gap-4 sticky bottom-0 p-4 glass rounded-3xl border border-white/50 shadow-2xl z-20">
									<Button
										// onClick={() => saveEntry(activeEntry)}
										// disabled={isAnalyzing}
										className="flex-1"
										size="lg"
										variant="secondary"
									>
										{isAnalyzing ? (
											<>
												<i className="fa-solid fa-spinner animate-spin mr-2"></i>{" "}
												Reflecting...
											</>
										) : (
											"Save Entry"
										)}
									</Button>
									<Button
										onClick={() => setIsEditing(false)}
										variant="outline"
										size="lg"
									>
										Cancel
									</Button>
								</div>
							</div>
						</div>
					</main>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CreateMemory;
