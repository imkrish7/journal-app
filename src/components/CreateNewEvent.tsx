import React, { useState } from "react";
import {
	Sparkles,
	Calendar,
	Clock,
	CheckCircle2,
	Loader2,
	Plus,
} from "lucide-react";
import { CalendarEvent } from "@/interface/jouranal";
import {
	DialogHeader,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogFooter,
} from "./ui/dialog";
import { useCalendar } from "@/context/calendarContext";

export const NewEvent = () => {
	const calenderWidget = useCalendar();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [isRefining, setIsRefining] = useState(false);

	const handleRefine = async () => {
		if (!title) return;
		setIsRefining(true);
		// const parsed = await smartParseEvent(title + " " + description);
		// if (parsed) {
		// 	setTitle(parsed.title);
		// 	setDescription(parsed.description || description);
		// 	setDate(parsed.date);
		// 	setStartTime(parsed.startTime);
		// 	setEndTime(parsed.endTime);
		// }
		setIsRefining(false);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title || !date) return;

		const newEvent: CalendarEvent = {
			id: Math.random().toString(36).substr(2, 9),
			title,
			description,
			date,
			startTime,
			endTime,
			color: ["#A855F7", "#3B82F6", "#10B981"][Math.floor(Math.random() * 3)],
		};
		// onSave(newEvent);
		console.log(newEvent);
		calenderWidget?.addNewEvent();
	};

	return (
		<Dialog
			open={calenderWidget?.newEventForm}
			onOpenChange={calenderWidget?.addNewEvent}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
								<Plus className="w-6 h-6" />
							</div>
							<h2 className="text-2xl font-bold text-gray-900">New Event</h2>
						</div>
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="p-10 space-y-8">
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
								Event Name
							</label>
							<button
								type="button"
								onClick={handleRefine}
								disabled={!title || isRefining}
								className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
							>
								{isRefining ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<Sparkles className="w-4 h-4" />
								)}
								Smart Parse
							</button>
						</div>
						<input
							autoFocus
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="What's happening?"
							className="w-full text-2xl font-serif italic text-gray-800 bg-transparent border-none focus:ring-0 placeholder:text-gray-200"
						/>
					</div>

					<div className="grid grid-cols-2 gap-8">
						<div className="space-y-2">
							<label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
								<Calendar className="w-4 h-4" /> Date
							</label>
							<input
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-100"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
								<Clock className="w-4 h-4" /> Time Range
							</label>
							<div className="flex items-center gap-2">
								<input
									type="time"
									value={startTime}
									onChange={(e) => setStartTime(e.target.value)}
									className="w-full bg-gray-50 border-none rounded-2xl px-3 py-4 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-100"
								/>
								<span className="text-gray-300">-</span>
								<input
									type="time"
									value={endTime}
									onChange={(e) => setEndTime(e.target.value)}
									className="w-full bg-gray-50 border-none rounded-2xl px-3 py-4 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-100"
								/>
							</div>
						</div>
					</div>

					<div className="space-y-2">
						<label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
							Notes
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Any additional details..."
							rows={3}
							className="w-full text-gray-600 bg-gray-50 border-none rounded-2xl p-5 focus:ring-2 focus:ring-indigo-100 resize-none"
						/>
					</div>
					<DialogFooter>
						<div className="pt-4 flex justify-end gap-4">
							<button
								type="button"
								onClick={calenderWidget?.addNewEvent}
								className="px-8 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-bold shadow-xl shadow-indigo-200 transition-all flex items-center gap-2 active:scale-95"
							>
								<CheckCircle2 className="w-5 h-5" />
								Schedule Event
							</button>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
