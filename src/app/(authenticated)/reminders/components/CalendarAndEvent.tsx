"use client";
import Events from "@/components/EventCalendar/events";
import CalenderDates from "@/components/EventCalendar/calendar-dates";
import { NewEvent } from "@/components/CreateNewEvent";
import { useCalendar } from "@/context/calendarContext";

const EventCalender = () => {
	const calendar = useCalendar();

	return (
		<section className="relative md:p-6 h-full w-full flex flex-col sm:flex-row md:gap-12 animate-in fade-in duration-700 md:overflow-hidden">
			<Events />
			<CalenderDates />
			{calendar?.newEventForm && (
				<NewEvent
					isOpen={calendar?.newEventForm}
					onClose={calendar?.addNewEvent}
				/>
			)}
		</section>
	);
};

export default EventCalender;
