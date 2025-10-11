"use client";
import { useCalendar } from "@/context/calendarContext";
import React from "react";

const CalenderDates = () => {
	const calendar = useCalendar();
	const today = (date: Date) => {
		return (
			calendar?.todayDate.getDate() === date.getDate() &&
			calendar?.todayDate.getMonth() === date.getMonth()
		);
	};
	return (
		<div className="col-span-12 xl:col-span-7 px-2.5 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
			<div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
				<div className="flex items-center gap-4">
					<h5 className="text-xl leading-8 font-semibold text-gray-900">
						{`${calendar?.getMonth}`}
					</h5>
					<div className="flex items-center">
						<button
							onClick={() => calendar?.prevMonth()}
							className="text-indigo-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-indigo-600"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
							>
								<path
									d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
									stroke="currentcolor"
									strokeWidth="1.3"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
							</svg>
						</button>
						<button
							onClick={() => calendar?.nextMonth()}
							className="text-indigo-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-indigo-600"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
							>
								<path
									d="M6.00236 3.99707L10.0025 7.99723L6 11.9998"
									stroke="currentcolor"
									strokeWidth="1.3"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className="border border-indigo-200 rounded-xl">
				<div className="grid grid-cols-7 rounded-t-3xl border-b border-indigo-200">
					<div className="py-3.5 border-r rounded-tl-xl border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
						Sun
					</div>
					<div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
						Mon
					</div>
					<div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
						Tue
					</div>
					<div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
						Wed
					</div>
					<div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
						Thu
					</div>
					<div className="py-3.5 border-r border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
						Fri
					</div>
					<div className="py-3.5 rounded-tr-xl bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600">
						Sat
					</div>
				</div>
				<div className="grid grid-cols-7 rounded-b-xl">
					{calendar?.getDays.map((date, index) => {
						return (
							<div
								key={index}
								className={`flex xl:aspect-square max-xl:min-h-[60px] p-3.5 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-indigo-50 cursor-pointer`}
							>
								<span
									className={`text-xs ${
										today(date)
											? "bg-indigo-500 rounded-full w-7 h-7 flex items-center justify-center text-gray-200"
											: ""
									} font-semibold text-gray-400`}
								>
									{new Date(date).getDate()}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CalenderDates;
