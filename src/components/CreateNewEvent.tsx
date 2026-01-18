"use client";
import { useActionState, useEffect } from "react";
import { Calendar, Clock, CheckCircle2, Plus } from "lucide-react";

import {
	DialogHeader,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogFooter,
} from "./ui/dialog";
import { useCalendar } from "@/context/calendarContext";
import { createEventAction } from "@/app/actions/event";
import { ActionState } from "@/interface/actions";
import { eventSchema } from "@/schema/event";
import { toast } from "sonner";
import { getErrors } from "@/lib/formErrorUtiles";

export const NewEvent = () => {
	const [state, formAction, isPending] = useActionState<
		ActionState<typeof eventSchema>,
		FormData
	>(createEventAction, {
		values: {
			title: "",
			description: "",
			startTime: "",
			endTime: "",
			date: new Date(),
		},
		success: false,
		errors: null,
	});
	const currentTime = new Date().getTime();
	const calenderWidget = useCalendar();

	useEffect(() => {
		if (state.errors) {
			toast.error("Failed to create an event!");
		}
	}, [state]);

	console.log(state);

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
				<form action={formAction} className="p-10 space-y-8">
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
								Event Name
							</label>
						</div>
						<input
							autoFocus
							name="title"
							placeholder="What's happening?"
							className="w-full text-2xl font-serif italic text-gray-800 bg-transparent border-none focus:ring-0 placeholder:text-gray-200"
						/>
						{state.errors && (
							<div className="text-red-200">{getErrors("title", state)}</div>
						)}
					</div>

					<div className="grid grid-cols-2 gap-8">
						<div className="space-y-2">
							<label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
								<Calendar className="w-4 h-4" /> Date
							</label>
							<input
								type="date"
								name="date"
								className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-100"
							/>
							{state.errors && (
								<div className="text-red-200">{getErrors("date", state)}</div>
							)}
						</div>
						<div className="space-y-2">
							<label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
								<Clock className="w-4 h-4" /> Time Range
							</label>
							<div className="flex items-center gap-2">
								<input
									type="time"
									name="startTime"
									min={currentTime}
									className="w-full bg-gray-50 border-none rounded-2xl px-3 py-4 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-100"
								/>
								<span className="text-gray-300">-</span>
								<input
									type="time"
									name="endTime"
									className="w-full bg-gray-50 border-none rounded-2xl px-3 py-4 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-100"
								/>
							</div>
							{state.errors && (
								<div className="text-red-200">
									{getErrors("endTime", state) || getErrors("startTime", state)}
								</div>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
							Notes
						</label>
						<textarea
							placeholder="Any additional details..."
							rows={3}
							name="description"
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
								disabled={isPending}
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
