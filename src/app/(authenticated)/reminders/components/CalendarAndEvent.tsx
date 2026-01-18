"use client";
import Events from "@/components/EventCalendar/events";
import CalenderDates from "@/components/EventCalendar/calendar-dates";
import { NewEvent } from "@/components/CreateNewEvent";

const EventCalender = () => {
	return (
		<section className="relative p-4 md:p-6 h-full w-full flex flex-col sm:flex-row md:flex-row md:gap-12 animate-in fade-in duration-700 md:overflow-hidden">
			<Events />
			<CalenderDates />
			<NewEvent />
		</section>
	);
};

export default EventCalender;
