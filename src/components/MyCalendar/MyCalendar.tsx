import React from "react";
import CalendarHeader from "./calendar-header";
import DateHeaderRow from "./date-header-row";
// import HourColumn from "./hour-column";
import { generateData } from "@/lib/fakeData";
import HourRow from "./hour-row";

const MyCalendar = () => {
	const events = generateData();

	return (
		<section className="relative bg-stone-50">
			<div className="w-full relative max-w-7xl mx-auto px-6 lg:px-8 overflow-x-auto">
				<div className="sticky top-0 right-0 left-0 w-full bg-gray-600">
					<CalendarHeader />
					<DateHeaderRow />
				</div>
				<div className="relative">
					<div className="hidden grid-cols-8 sm:grid w-full overflow-x-auto">
						{Object.keys(events).map((eventKey, index) => {
							return (
								<HourRow
									key={index}
									hour={eventKey}
									events={events[eventKey]}
								/>
							);
						})}
					</div>
					{/* <div className="hidden grid-cols-8 sm:grid w-full overflow-x-auto">
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 flex items-end transition-all hover:bg-stone-100">
							<span className="text-xs font-semibold text-gray-400">
								08:00 am
							</span>
						</div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 flex items-end transition-all hover:bg-stone-100">
							<div className="rounded p-1.5 border-l-2 border-blue-600 bg-blue-50">
								<p className="text-xs font-normal text-gray-900 mb-px">
									Project Task Review
								</p>
								<p className="text-xs font-semibold text-blue-600">
									08:00 - 08:25
								</p>
							</div>
						</div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-gray-200 transition-all hover:bg-stone-100"></div>

						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 flex items-end transition-all hover:bg-stone-100">
							<span className="text-xs font-semibold text-gray-400">
								09:00 am
							</span>
						</div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100">
							<div className="rounded p-1.5 border-l-2 border-yellow-600 bg-yellow-50">
								<p className="text-xs font-normal text-gray-900 mb-px">
									Breakfast with Dhruv Patel
								</p>
								<p className="text-xs font-semibold text-yellow-600">
									08:00 - 09:00
								</p>
							</div>
						</div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-gray-200 transition-all hover:bg-stone-100"></div>

						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 flex items-end transition-all hover:bg-stone-100">
							<span className="text-xs font-semibold text-gray-400">
								10:00 am
							</span>
						</div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100">
							<div className="rounded p-1.5 border-l-2 border-green-600 bg-green-50">
								<p className="text-xs font-normal text-gray-900 mb-px">
									Dancing Zumba class
								</p>
								<p className="text-xs font-semibold text-green-600">
									09:30 - 10:00
								</p>
							</div>
						</div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-gray-200 transition-all hover:bg-stone-100">
							<div className="rounded p-1.5 border-l-2 border-purple-600 bg-purple-50">
								<p className="text-xs font-normal text-gray-900 mb-px">
									Doctor’s Appointment for Mother
								</p>
								<p className="text-xs font-semibold text-purple-600">
									09:00 - 10:45
								</p>
							</div>
						</div>

						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 flex items-end transition-all hover:bg-stone-100">
							<span className="text-xs font-semibold text-gray-400">
								11:00 am
							</span>
						</div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100">
							<div className="rounded p-1.5 border-l-2 border-blue-600 bg-blue-50">
								<p className="text-xs font-normal text-gray-900 mb-px">
									Daily Standup Meeting
								</p>
								<p className="text-xs font-semibold text-blue-600">
									10:00 - 11:00
								</p>
							</div>
						</div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100">
							<div className="rounded p-1.5 border-l-2 border-yellow-600 bg-yellow-50">
								<p className="text-xs font-normal text-gray-900 mb-px">
									School Friend’s Birthday Party
								</p>
								<p className="text-xs font-semibold text-yellow-600">
									10:00 - 11:45
								</p>
							</div>
						</div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-gray-200 transition-all hover:bg-stone-100"></div>

						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 flex items-end transition-all hover:bg-stone-100">
							<span className="text-xs font-semibold text-gray-400">
								12:00 pm
							</span>
						</div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100">
							<div className="rounded p-1.5 border-l-2 border-blue-600 bg-blue-50">
								<p className="text-xs font-normal text-gray-900 mb-px">
									Meeting with Project Manager{" "}
								</p>
								<p className="text-xs font-semibold text-blue-600">
									11:00 - 12:30
								</p>
							</div>
						</div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-r border-gray-200 transition-all hover:bg-stone-100"></div>
						<div className="h-32 lg:h-28 p-0.5 md:p-3.5   border-t border-gray-200 transition-all hover:bg-stone-100"></div>
					</div>
					<div className="flex sm:hidden border-t border-gray-200 items-center w-full">
						<HourColumn />
						<div className="grid grid-cols-1 w-full">
							<div className="w-full h-20 border-b border-gray-200 p-1.5">
								<div className="w-full h-full rounded p-1.5 border-l-2 border-purple-600 bg-purple-50">
									<p className="text-xs font-normal text-gray-900 mb-px">
										Pickup the grandmother
									</p>
									<p className="text-xs font-semibold text-purple-600">
										06:00 - 07:30
									</p>
								</div>
							</div>
							<div className="w-full h-20 border-b border-gray-200 p-1.5"></div>
							<div className="w-full h-20 border-b border-gray-200 p-1.5"></div>
							<div className="w-full h-20 border-b border-gray-200 p-1.5"></div>
							<div className="w-full h-20 border-b border-gray-200 p-1.5"></div>
							<div className="w-full h-20 border-b border-gray-200 p-1.5">
								<div className="w-full h-full rounded p-1.5 border-l-2 border-blue-600 bg-blue-50">
									<p className="text-xs font-normal text-gray-900 mb-px">
										Meeting with Project Manager{" "}
									</p>
									<p className="text-xs font-semibold text-blue-600">
										11:00 - 12:30
									</p>
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</section>
	);
};

export default MyCalendar;
