import { MoreHorizontal } from "lucide-react";
import { FC } from "react";

interface IProps {
	event: {
		id: number;
		time: string;
		title: string;
		desc: string;
		color: string;
	};
}

const EventCard: FC<IProps> = ({ event }) => {
	return (
		<div
			key={event.id}
			className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 flex items-start justify-between group hover:shadow-xl hover:shadow-slate-100 transition-all"
		>
			<div className="space-y-3">
				<div className="flex items-center space-x-3">
					<div className={`w-3 h-3 rounded-full ${event.color}`}></div>
					<span className="text-sm font-medium text-slate-500 tracking-tight">
						{event.time}
					</span>
				</div>
				<h3 className="text-2xl font-bold text-slate-800">{event.title}</h3>
				<p className="text-slate-400">{event.desc}</p>
			</div>
			<button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
				<MoreHorizontal size={20} />
			</button>
		</div>
	);
};

export default EventCard;
