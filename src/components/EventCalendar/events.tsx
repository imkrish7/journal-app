import EventCard from "./event-card";

const Events = () => {
	const events = [
		{
			id: 1,
			time: "Jan 10,2020 - 10:00 - 11:00",
			title: "Meeting with a friends",
			desc: "Meet-Up for Travel Destination Discussion",
			color: "bg-purple-500",
		},
		{
			id: 2,
			time: "Jan 12,2020 - 14:00 - 15:30",
			title: "Project Sync",
			desc: "Reviewing current progress and blockers",
			color: "bg-blue-500",
		},
		{
			id: 3,
			time: "Jan 12,2020 - 14:00 - 15:30",
			title: "Project Sync",
			desc: "Reviewing current progress and blockers",
			color: "bg-blue-500",
		},
		{
			id: 4,
			time: "Jan 12,2020 - 14:00 - 15:30",
			title: "Project Sync",
			desc: "Reviewing current progress and blockers",
			color: "bg-blue-500",
		},
	];
	return (
		<div className="flex-grow space-y-8 h-full flex flex-col">
			<div>
				<h1 className="text-4xl font-bold text-slate-900 mb-2">
					Upcoming Events
				</h1>
				<p className="text-slate-400">Don&apos;t miss schedule</p>
			</div>

			<div className="space-y-4 flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
				{events.map((event) => (
					<EventCard key={event.id} event={event} />
				))}
			</div>
		</div>
	);
};

export default Events;
