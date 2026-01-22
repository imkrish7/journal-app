"use client";
import { useActionState, useEffect, useMemo, useState } from "react";
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
import moment from "moment";
import { getTimeLeft } from "@/lib/newEventUtils";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";

export const NewEvent = () => {
	const today = moment().format("YYYY-MM-DD");
	const [startDate, setStartDate] = useState<string>(new Date().toDateString());
	const [endDate, setEndDate] = useState<string>(new Date().toDateString());
	const [startTime, setStartTime] = useState<string>();
	const [endTime, setEndTime] = useState<string>();
	const [date, setDate] = useState<string>("");
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

	const calenderWidget = useCalendar();

	useEffect(() => {
		if (state.errors) {
			toast.error("Failed to create an event!");
		}
	}, [state]);

	const timePeriod = useMemo(() => {
		if (startTime && startTime?.length > 0 && endTime && endTime?.length > 0) {
			const [startTimeHour, startTimeMinute] = startTime.split(":");
			const [endTimeHour, endTimeMinute] = endTime.split(":");
			if (startTimeHour <= endTimeHour) {
				const hours = parseInt(endTimeHour) - parseInt(startTimeHour);
				const minutes = Math.abs(
					parseInt(startTimeMinute) - parseInt(endTimeMinute),
				);
				return `${hours > 9 ? hours : "0" + hours.toString()}:${minutes > 9 ? minutes : "0" + minutes.toString()} hrs`;
			} else {
				const hours = parseInt(endTimeHour) + 24 - parseInt(startTime);
				const minutes = Math.abs(
					parseInt(startTimeMinute) - parseInt(endTimeMinute),
				);
				return `${hours > 9 ? hours : "0" + hours.toString()}:${minutes > 9 ? minutes : "0" + minutes.toString()} hrs`;
			}
		} else {
			return "";
		}
	}, [startTime, endTime]);

	const currentTime = useMemo(() => {
		return moment(date);
	}, [date]);

	const startTimes = useMemo(() => {
		return getTimeLeft(new Date(startDate).getDate());
	}, [startDate]);
	const endTimes = useMemo(() => {
		return getTimeLeft(new Date(endDate).getDate(), "end");
	}, [endDate]);

	const startDateMin = new Date(startDate);
	const endDateMax = new Date(endDate);

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

					<div className="grid grid-cols-1 gap-8">
						<div className="space-y-2">
							<label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex flex-row items-center gap-2">
								<Clock className="w-4 h-4" /> Start Time
							</label>
							<div className="flex items-center gap-2">
								<input
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
									type="date"
									name="startDate"
									min={`${startDateMin.getFullYear()}-${startDateMin.getMonth() > 9 ? "" : "0"}${startDateMin.getMonth() + 1}-${startDateMin.getDate() > 9 ? "" : "0"}${startDateMin.getDate()}`}
									className="w-full bg-gray-50 rounded-2xl invalid:text-red-500 px-3 py-4 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-100"
								/>
								<span className="text-gray-300">-</span>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select time" />
									</SelectTrigger>
									<SelectContent>
										{startTimes.map((startTime, idx) => {
											return (
												<SelectItem
													key={`s-${idx}-${startTime}`}
													value={startTime}
												>
													{startTime}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
							</div>
							{timePeriod.length > 0 && (
								<span className="text-xs font-bold text-gray-400 ">
									{timePeriod}
								</span>
							)}
							{state.errors && (
								<div className="text-red-200">
									{getErrors("endTime", state) || getErrors("startTime", state)}
								</div>
							)}
						</div>
						<div className="space-y-2">
							<label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex flex-row items-center gap-2">
								<Clock className="w-4 h-4" /> End Time
							</label>
							<div className="flex items-center gap-2">
								<input
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
									type="date"
									name="endDate"
									max={`${endDateMax.getFullYear()}-${endDateMax.getMonth() > 9 ? "" : "0"}${endDateMax.getMonth() + 1}-${endDateMax.getDate() > 9 ? "" : "0"}${endDateMax.getDate() + 1}`}
									className="w-full bg-gray-50 rounded-2xl invalid:text-red-500 px-3 py-4 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-100"
								/>
								<span className="text-gray-300">-</span>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select time" />
									</SelectTrigger>
									<SelectContent>
										{endTimes.map((endTime, idx) => {
											return (
												<SelectItem key={`e-${idx}-${endTime}`} value={endTime}>
													{endTime}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
							</div>
							{timePeriod.length > 0 && (
								<span className="text-xs font-bold text-gray-400 ">
									{timePeriod}
								</span>
							)}
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
