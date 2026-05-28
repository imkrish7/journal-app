"use client";
import EventCalender from "./components/CalendarAndEvent";
import ConnectGoogleCalender from "@/components/connect-google-calender";
import { useCalendar } from "@/context/calendarContext";

const Page = () => {
	const 	calender = useCalendar()
	return (
		<div className="w-full h-full overflow-y-auto">
			{calender?.isCalendarSynced ? <EventCalender /> : <ConnectGoogleCalender />}
		</div>
	);
};

export default Page;
