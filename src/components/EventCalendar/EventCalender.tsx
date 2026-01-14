import CalendarProvider from "@/providers/calender-provider";
import React from "react";
import Events from "./events";
import CalenderDates from "./calendar-dates";

const EventCalender = () => {
	return (
		<CalendarProvider>
			<section className="p-8 md:p-12 h-full w-full flex flex-col sm:flex-row md:gap-12 animate-in fade-in duration-700 md:overflow-hidden">
				<Events />
				<CalenderDates />
			</section>
		</CalendarProvider>
	);
};

export default EventCalender;
