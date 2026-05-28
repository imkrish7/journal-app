import { MoreHorizontal } from "lucide-react";
import { FC, memo } from "react";
import { Event } from "@/interface/events";
import { eventSchema } from "@/schema/event";
import { z } from "zod";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTransition } from "react";
import { deleteCalendarEventById } from "@/lib/calendarService";
import { toast } from "sonner";
import Link from "next/link";

interface IProps {
	event: Event | z.infer<typeof eventSchema>;
	eventSource?: "google" | "local";
	handleEventDelete?: (eventId: string, eventSource: "google" | "local") => void;
}

const EventCard: FC<IProps> = ({ event, eventSource, handleEventDelete }) => {

	const [isPending, startTransition] = useTransition();

	const handleDelete = ()=>{
		startTransition(async ()=>{
			try {
				if(eventSource === "local"){
					if(event.id) {
						await deleteCalendarEventById(event.id!);
						toast.success("Event deleted successfully.");
						if(handleEventDelete){
							handleEventDelete(event.id, "local");
						}
					}else{
						toast.error("Event ID is missing. Cannot delete event.");
					}
					// Call local API to delete event
				
				}else if(eventSource === "google" && event.id){
					toast.warning("Deleting event from Google Calendar not implemented yet.");
					// if(handleEventDelete){
					// 	handleEventDelete(event.id, "google");
					// }
				}
				
			} catch (error) {
				console.error("Error deleting calendar event:", error);
				toast.error("Failed to delete event. Please try again.");
			}
		});
	};

	return (
		<div
			key={event.id}
			className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 flex items-start justify-between group hover:shadow-xl hover:shadow-slate-100 transition-all"
		>
			<div className="space-y-3">
				<div className="flex items-center space-x-3">
					{/* <div className={`w-3 h-3 rounded-full ${event.color}`}></div> */}
					<span className="text-sm font-medium text-slate-500 tracking-tight">
						{event.startTime} - {event.endTime}
					</span>
				</div>
				<h3 className="text-2xl font-bold text-slate-800">{event.title}</h3>
				<p className="text-slate-400">{event.description}</p>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
						<MoreHorizontal size={20} />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-40" align="start">
					<DropdownMenuItem onClick={handleDelete} disabled={!event.id || isPending}>
						Delete
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href={`/reminders/${event.id}/edit`}>
						Edit
						</Link>
						</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

		</div>
	);
};

export default memo(EventCard);
