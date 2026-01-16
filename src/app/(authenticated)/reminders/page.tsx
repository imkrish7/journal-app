import CalendarProvider from "@/providers/calender-provider";
import EventCalender from "./components/CalendarAndEvent";

const page = async () => {
	return (
		<div className="w-full h-full overflow-y-auto">
			<CalendarProvider>
				<EventCalender />
			</CalendarProvider>
		</div>
	);
};

export default page;
