import { useEffect, useState, useTransition } from "react";
import EventCard from "./event-card";
import { toast } from "sonner";
import { getCalendarEvents } from "@/lib/calendarService";
import { Event } from "@/interface/events";
import Loading from "@/app/(authenticated)/loading";
import { eventSchema } from "@/schema/event";
import { z } from "zod";

const Events = () => {
    const [isPending, startTransition] = useTransition()
	const [events, setEvents] = useState<Event[]>([]);
	const [localEvents, setLocalEvents] = useState<z.infer<typeof eventSchema>[]>([]);

	useEffect(() => {
		// Fetch calendar events from backend
		startTransition(async () => {
			try {
				const response = await getCalendarEvents();
				setEvents(response.google_events);
				setLocalEvents(response.local_events);
			} catch (error) {
				console.error("Error fetching calendar events:", error);
				toast.error("Failed to fetch calendar events. Please try again.");
			}
		})
	},[]);

	const handleEventDelete = (eventId: string, eventSource: "google" | "local") => {
		if(eventSource === "local"){
			setLocalEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
		}else if(eventSource === "google"){
			setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
		}		
	}

	return (
		<div className="flex-grow space-y-8 h-full flex flex-col">
			<div>
				<h1 className="text-4xl font-bold text-slate-900 mb-2">
					Upcoming Events
				</h1>
				<p className="text-slate-400">Don&apos;t miss schedule</p>
			</div>

			<div className="space-y-4 flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
				{isPending ? <Loading /> : <>{
				events.length || localEvents.length ? <>
					{events.map((event) => (
						<EventCard handleEventDelete={handleEventDelete} key={event.id} event={event} eventSource="google" />
					)) }
					{
						localEvents.length ? 
					localEvents.map((event) => (
						<EventCard handleEventDelete={handleEventDelete} key={event.id} event={event} eventSource="local" />
					)) : null
					}
				</>
					: (
					<p className="text-slate-400">No upcoming events.</p>
				)}
				</>}
				
			</div>
		</div>
	);
};

export default Events;
