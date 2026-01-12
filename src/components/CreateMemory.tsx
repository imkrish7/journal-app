import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { JournalEntry } from "@/interface/jouranal";

const CreateMemory = () => {
	const [entries, setEntries] = useState<JournalEntry[]>(() => {
		const saved = localStorage.getItem("aura_entries");
		return saved ? JSON.parse(saved) : [];
	});
	const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [inspiration, setInspiration] = useState("");

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
		};
		setActiveEntry(newEntry);
		setIsEditing(true);
	};

	const saveEntry = async (entry: JournalEntry) => {
		if (!entry.title && !entry.content) return;

		setIsAnalyzing(true);
		let updatedEntry = { ...entry };

		try {
			if (entry.content.length > 20) {
				const insights = await analyzeJournalEntry(entry.content, entry.title);
				updatedEntry.aiInsight = insights.growthPrompt;
				updatedEntry.aiSummary = insights.summary;
				updatedEntry.tags = insights.keyThemes;
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

	const deleteEntry = (id: string) => {
		if (confirm("Are you sure you want to delete this memory?")) {
			const filtered = entries.filter((e) => e.id !== id);
			setEntries(filtered);
			if (activeEntry?.id === id) setActiveEntry(null);
		}
	};
	return (
		<div className="pt-20 min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden">
			{/* Sidebar */}
			<aside className="w-full md:w-80 border-r border-slate-200 bg-white p-6 flex flex-col h-[calc(100vh-80px)] overflow-y-auto">
				<Button
					onClick={createNewEntry}
					variant="secondary"
					size="lg"
					className="w-full mb-8"
				>
					<i className="fa-solid fa-plus mr-2"></i> New Entry
				</Button>

				<div className="space-y-4">
					<h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
						Past Memories
					</h3>
					{entries.length === 0 ? (
						<div className="text-center py-12 opacity-40">
							<i className="fa-solid fa-feather text-4xl mb-2"></i>
							<p className="text-sm">No entries yet</p>
						</div>
					) : (
						entries.map((entry) => (
							<div
								key={entry.id}
								onClick={() => {
									setActiveEntry(entry);
									setIsEditing(false);
								}}
								className={`p-4 rounded-2xl cursor-pointer transition-all border ${
									activeEntry?.id === entry.id
										? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100"
										: "bg-white border-slate-100 hover:border-slate-300"
								}`}
							>
								<p className="text-[10px] font-bold text-indigo-600 mb-1">
									{entry.date}
								</p>
								<h4 className="font-bold text-slate-800 truncate mb-1">
									{entry.title || "Untitled"}
								</h4>
								<p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
									{entry.content || "No content yet..."}
								</p>
							</div>
						))
					)}
				</div>
			</aside>

			{/* Main Area */}
			<main className="flex-1 p-6 md:p-12 overflow-y-auto h-[calc(100vh-80px)]">
				{activeEntry ? (
					<div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
						{isEditing ? (
							<div className="space-y-6">
								<input
									type="text"
									placeholder="Give your entry a title..."
									className="w-full text-4xl font-serif font-bold bg-transparent border-none outline-none placeholder:text-slate-300 focus:ring-0"
									value={activeEntry.title}
									onChange={(e) =>
										setActiveEntry({ ...activeEntry, title: e.target.value })
									}
								/>
								<div className="flex gap-2 items-center overflow-x-auto pb-2 scrollbar-hide">
									{Object.values(Mood).map((m) => (
										<Button
											key={m}
											onClick={() =>
												setActiveEntry({ ...activeEntry, mood: m })
											}
											variant={activeEntry.mood === m ? "secondary" : "outline"}
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
									value={activeEntry.content}
									onChange={(e) =>
										setActiveEntry({ ...activeEntry, content: e.target.value })
									}
								/>
								<div className="flex gap-4 sticky bottom-0 p-4 glass rounded-3xl border border-white/50 shadow-2xl z-20">
									<Button
										onClick={() => saveEntry(activeEntry)}
										disabled={isAnalyzing}
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
						) : (
							<div className="space-y-12">
								<div className="flex justify-between items-start">
									<div className="space-y-2">
										<p className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
											{activeEntry.date}
										</p>
										<h1 className="text-5xl font-serif font-bold text-slate-900 leading-tight">
											{activeEntry.title || "Untitled"}
										</h1>
										<Badge
											variant="secondary"
											className="mt-2 text-sm px-4 py-1"
										>
											Mood: {activeEntry.mood}
										</Badge>
									</div>
									<div className="flex gap-2">
										<Button
											variant="outline"
											size="icon"
											onClick={() => setIsEditing(true)}
											className="rounded-xl"
										>
											<i className="fa-solid fa-pen-to-square"></i>
										</Button>
										<Button
											variant="outline"
											size="icon"
											onClick={() => deleteEntry(activeEntry.id)}
											className="rounded-xl hover:text-red-600 hover:border-red-200"
										>
											<i className="fa-solid fa-trash"></i>
										</Button>
									</div>
								</div>

								<div className="text-xl text-slate-700 leading-relaxed whitespace-pre-wrap font-light">
									{activeEntry.content}
								</div>

								{(activeEntry.aiInsight || activeEntry.aiSummary) && (
									<Card className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 border-indigo-100 space-y-6">
										<div className="flex items-center gap-2 text-indigo-600">
											<i className="fa-solid fa-sparkles animate-pulse"></i>
											<span className="font-bold uppercase tracking-widest text-xs">
												Aura Reflection
											</span>
										</div>
										{activeEntry.aiSummary && (
											<div className="space-y-2">
												<h4 className="font-bold text-slate-900">
													The Core Narrative
												</h4>
												<p className="text-slate-600 leading-relaxed">
													{activeEntry.aiSummary}
												</p>
											</div>
										)}
										{activeEntry.aiInsight && (
											<div className="space-y-2">
												<h4 className="font-bold text-slate-900">
													Growth Catalyst
												</h4>
												<p className="text-slate-700 italic leading-relaxed border-l-4 border-indigo-200 pl-4 bg-white/40 p-3 rounded-r-xl">
													"{activeEntry.aiInsight}"
												</p>
											</div>
										)}
										{activeEntry.tags && activeEntry.tags.length > 0 && (
											<div className="flex flex-wrap gap-2 pt-2">
												{activeEntry.tags.map((tag) => (
													<Badge
														key={tag}
														variant="outline"
														className="bg-white/50 border-indigo-100 text-indigo-600"
													>
														#{tag}
													</Badge>
												))}
											</div>
										)}
									</Card>
								)}
							</div>
						)}
					</div>
				) : (
					<div className="h-full flex flex-col items-center justify-center text-center space-y-6 max-w-xl mx-auto opacity-80">
						<div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mb-4 transform hover:scale-110 transition-transform">
							<i className="fa-solid fa-feather-pointed text-4xl text-indigo-600"></i>
						</div>
						<h2 className="text-3xl font-serif font-bold text-slate-900">
							Begin Your Reflection
						</h2>
						<Card className="p-6 bg-white border-dashed border-indigo-200 shadow-none">
							<p className="text-slate-600 leading-relaxed italic text-lg">
								"{inspiration}"
							</p>
						</Card>
						<Button
							onClick={createNewEntry}
							variant="secondary"
							size="lg"
							className="mt-4 px-10"
						>
							Write Your First Page
						</Button>
					</div>
				)}
			</main>
		</div>
	);
};

export default CreateMemory;
