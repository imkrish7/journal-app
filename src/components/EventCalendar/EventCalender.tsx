import CalendarProvider from "@/providers/CalendarProvider";
import React from "react";
import Events from "./events";
import CalenderDates from "./calendar-dates";

const EventCalender = () => {
	return (
		<CalendarProvider>
			<section className="relative bg-stone-50 rounded-md">
				<div className="bg-sky-400 w-full sm:w-40 h-40 rounded-full absolute top-1 opacity-20 max-sm:right-0 sm:left-56 z-0"></div>
				<div className="bg-emerald-500 rounded-md w-full sm:w-40 h-24 absolute top-0 -left-0 opacity-20 z-0"></div>
				<div className="bg-purple-600 rounded-md w-full sm:w-40 h-24 absolute top-40 -left-0 opacity-20 z-0"></div>
				<div className="w-full relative backdrop-blur-3xl">
					<div className="w-full max-w-7xl px-2 lg:px-8">
						<div className="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full">
							<Events />

							<CalenderDates />
						</div>
					</div>
				</div>
			</section>
		</CalendarProvider>
	);
};

export default EventCalender;
