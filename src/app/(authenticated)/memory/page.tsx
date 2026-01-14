"use client";
import React, { useState } from "react";
import { JournalEntry, Mood } from "@/interface/jouranal";
import {
	Search,
	Calendar,
	ArrowRight,
	Heart,
	Cloud,
	Sun,
	Zap,
	LucideProps,
} from "lucide-react";

const MemoryGallery = () => {
	const [entries, setEntries] = useState<JournalEntry[]>([]);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeMood, setActiveMood] = useState<Mood | "All">("All");

	const handleNewEntry = () => {
		const newEntry: JournalEntry = {
			id: Math.random().toString(36).substr(2, 9),
			title: "",
			content: "",
			mood: Mood.NEUTRAL,
			createdAt: Date.now(),
		};
		setEntries((prev) => [newEntry, ...prev]);
		setSelectedId(newEntry.id);
	};

	const moodConfig: Record<
		string,
		{
			icon: React.ForwardRefExoticComponent<
				Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
			>;
			color: string;
			bg: string;
		}
	> = {
		[Mood.HAPPY]: { icon: Sun, color: "text-yellow-600", bg: "bg-yellow-50" },
		[Mood.ECSTATIC]: {
			icon: Zap,
			color: "text-indigo-600",
			bg: "bg-indigo-50",
		},
		[Mood.NEUTRAL]: { icon: Cloud, color: "text-slate-600", bg: "bg-slate-50" },
		[Mood.CALM]: { icon: Heart, color: "text-teal-600", bg: "bg-teal-50" },
		[Mood.SAD]: { icon: Cloud, color: "text-blue-600", bg: "bg-blue-50" },
		[Mood.ANXIOUS]: { icon: Zap, color: "text-rose-600", bg: "bg-rose-50" },
	};

	const filteredEntries = entries.filter((entry) => {
		const matchesSearch = (entry.title + entry.content)
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesMood = activeMood === "All" || entry.mood === activeMood;
		return matchesSearch && matchesMood;
	});

	return (
		<div className="p-6 space-y-10 animate-in fade-in duration-500 h-full">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
				<div>
					<h1 className="text-4xl font-bold text-slate-900 mb-2">
						Your Memories
					</h1>
					<p className="text-slate-400">Revisit the chapters of your story</p>
				</div>

				<div className="flex items-center space-x-3">
					<div className="relative">
						<Search
							className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
							size={18}
						/>
						<input
							type="text"
							placeholder="Search memories..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
						/>
					</div>
					<button
						onClick={handleNewEntry}
						className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
					>
						New Memory
					</button>
				</div>
			</div>

			<div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
				<button
					onClick={() => setActiveMood("All")}
					className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
						activeMood === "All"
							? "bg-indigo-600 text-white shadow-md"
							: "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
					}`}
				>
					All Moods
				</button>
				{Object.values(Mood).map((mood) => (
					<button
						key={mood}
						onClick={() => setActiveMood(mood)}
						className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 flex items-center space-x-2 ${
							activeMood === mood
								? "bg-indigo-600 text-white shadow-md"
								: "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
						}`}
					>
						<span>{mood}</span>
					</button>
				))}
			</div>

			{/* Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredEntries.map((entry, index) => {
					const config = moodConfig[entry.mood] || moodConfig[Mood.NEUTRAL];
					return (
						<div
							key={entry.id}
							onClick={() => setSelectedId(entry.id)}
							className="group bg-white rounded-[32px] p-6 border border-slate-50 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all cursor-pointer flex flex-col h-full animate-in slide-in-from-bottom-4 duration-500"
							style={{ animationDelay: `${index * 50}ms` }}
						>
							<div className="flex items-center justify-between mb-4">
								<div
									className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl ${config.bg} ${config.color}`}
								>
									<config.icon size={14} />
									<span className="text-[10px] font-bold uppercase tracking-wider">
										{entry.mood}
									</span>
								</div>
								<div className="flex items-center space-x-1 text-slate-300">
									<Calendar size={12} />
									<span className="text-[10px] font-medium">
										{new Date(entry.createdAt).toLocaleDateString()}
									</span>
								</div>
							</div>

							<h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1 serif italic">
								{entry.title || "Untitled Moment"}
							</h3>

							<p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-light">
								{entry.aiAnalysis?.summary ||
									entry.content ||
									"No content yet..."}
							</p>

							<div className="pt-4 border-t border-slate-50 flex items-center justify-between">
								<div className="flex gap-1">
									{entry.aiAnalysis?.tags.slice(0, 2).map((tag) => (
										<span
											key={tag}
											className="text-[9px] font-bold px-2 py-1 bg-slate-50 text-slate-400 rounded-md"
										>
											#{tag}
										</span>
									))}
								</div>
								<div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
									<ArrowRight size={14} />
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{filteredEntries.length === 0 && (
				<div className="flex flex-col items-center justify-center text-center space-y-4">
					<div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
						<Search size={40} />
					</div>
					<div className="space-y-1">
						<h3 className="text-xl font-bold text-slate-800">
							No memories found
						</h3>
						<p className="text-slate-400 max-w-xs">
							Try adjusting your filters or search terms to find what
							you&apos;re looking for.
						</p>
					</div>
					<button
						onClick={() => {
							setSearchTerm("");
							setActiveMood("All");
						}}
						className="text-indigo-600 font-bold text-sm hover:underline"
					>
						Clear all filters
					</button>
				</div>
			)}
		</div>
	);
};

export default MemoryGallery;
