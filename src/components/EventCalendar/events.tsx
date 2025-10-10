import React from "react";
import EventCard from "./event-card";

const Events = () => {
	return (
		<div className="col-span-12 xl:col-span-5">
			<h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">
				Upcoming Events
			</h2>
			<p className="text-lg font-normal text-gray-600 mb-8">
				Don’t miss schedule
			</p>
			<div className="flex gap-5 flex-col">
				<EventCard />
			</div>
		</div>
	);
};

export default Events;
