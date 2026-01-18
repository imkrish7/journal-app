"use client";
import { useCalendar } from "@/context/calendarContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const CalenderDates = () => {
	const calendar = useCalendar();
	const isMobile = useIsMobile();
	const today = (date: Date) => {
		return (
			calendar?.todayDate.getDate() === date.getDate() &&
			calendar?.todayDate.getMonth() === date.getMonth()
		);
	};
	return (
		<div className="col-span-12 xl:col-span-7 px-2.5 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1 relative">
			<div className="w-full md:w-[450px] shrink-0">
				<div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
					<div className="flex w-full items-center justify-between mb-8 px-2">
						<h2 className="text-2xl font-bold text-slate-900">
							{calendar?.getMonth}
						</h2>
						<div className="flex items-center space-x-4">
							<button
								onClick={() => calendar?.prevMonth()}
								className="p-2 text-indigo-400 hover:bg-indigo-50 rounded-full transition-colors"
							>
								<ChevronLeft size={20} />
							</button>
							<button
								onClick={() => calendar?.nextMonth()}
								className="p-2 text-indigo-400 hover:bg-indigo-50 rounded-full transition-colors"
							>
								<ChevronRight size={20} />
							</button>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-50 h-full">
					<div className="grid grid-cols-7 text-center mb-4">
						{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
							<span
								key={day}
								className="text-sm font-semibold text-indigo-500 py-4 border-b border-indigo-50/50"
							>
								{day}
							</span>
						))}
					</div>
					<div className="grid grid-cols-7 rounded-b-xl">
						{calendar?.getDays.map((date, index) => {
							return (
								<div
									key={`day_${index}_${date.getDay()}`}
									className={`h-16 flex items-center justify-center text-sm border border-slate-50/50 transition-all cursor-pointer hover:bg-indigo-50/30 ${
										today(date) ? "text-white" : "text-slate-600"
									}`}
								>
									<span
										className={`w-10 h-10 flex items-center justify-center rounded-full ${
											today(date)
												? "bg-indigo-600 shadow-lg shadow-indigo-100"
												: ""
										}`}
									>
										{new Date(date).getDate()}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<button
				onClick={calendar?.addNewEvent}
				className="fixed bottom-3 cursor-pointer right-10 border-red-200 glass rounded-full p-8 mt-2 md:p-8 border-2 inset-shadow-sm shadow-gray-900/50 shadow-2xl bg-indigo-500 border-gray-100 sn:rounded-[40px] text-gray-300 hover:text-indigo-400 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-3 font-bold"
			>
				<Plus className="w-6 h-6" />
				{!isMobile && "Add Event to Schedule"}
			</button>
		</div>
	);
};

export default CalenderDates;
