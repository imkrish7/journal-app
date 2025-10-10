import { IEvent } from "@/lib/fakeData";
import React, { FC } from "react";

interface IProps {
	hour: string;
	events: [IEvent?, IEvent?, IEvent?, IEvent?, IEvent?, IEvent?, IEvent?];
}

const Activity = {
	physical: "border-green-600 bg-green-50",
	personal: "border-purple-600 bg-purple-50",
	casual: "border-yellow-600 bg-yellow-50",
	professional: "border-blue-600 bg-blue-50",
};

const HourRow: FC<IProps> = ({ hour, events }) => {
	return (
		<>
			<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 flex items-end transition-all hover:bg-stone-100">
				<span className="text-xs font-semibold text-gray-400">{hour}</span>
			</div>
			{events.map((event, index) => {
				if (!event) {
					if (index === 7) {
						return (
							<div
								key={index}
								className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t  border-gray-200 transition-all hover:bg-stone-100"
							></div>
						);
					}
					return (
						<div
							key={index}
							className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"
						></div>
					);
				} else {
					return (
						<div
							key={index}
							className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"
						>
							<div
								className={`rounded p-1.5 border-l-2 ${Activity[event.type]}`}
							>
								<p className="text-xs font-normal text-gray-900 mb-px">
									{event.name}
								</p>
								<p className="text-xs font-semibold text-purple-600">
									{`${event.startTime} - ${event.endTime}`}
								</p>
							</div>
						</div>
					);
				}
			})}
		</>
	);
};

export default HourRow;
