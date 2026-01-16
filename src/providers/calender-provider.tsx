"use client";
import { CalendarContext } from "@/context/calendarContext";
import {
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	addMonths,
	startOfWeek,
	endOfWeek,
} from "date-fns";
import React, {
	FC,
	ReactNode,
	startTransition,
	useMemo,
	useState,
} from "react";

interface IProps {
	children: ReactNode;
}

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const CalendarProvider: FC<IProps> = ({ children }) => {
	const [addNewEvent, setAddNewEvent] = useState<boolean>(false);
	const [currentDate, setCurrentDate] = useState<Date>(new Date());
	const [todayDate] = useState<Date>(new Date());
	const nextMonth = () => {
		startTransition(() => {
			setCurrentDate(addMonths(currentDate, 1));
		});
	};
	const prevMonth = () => {
		startTransition(() => {
			setCurrentDate(addMonths(currentDate, -1));
		});
	};
	const getDate = () => {
		return currentDate;
	};
	const _start = useMemo(() => {
		return startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
	}, [currentDate]);
	const _end = useMemo(() => {
		return endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 });
	}, [currentDate]);

	const getDays = useMemo(() => {
		return eachDayOfInterval({ start: _start, end: _end });
	}, [_start, _end]);
	const getMonthName = useMemo(() => {
		return months[currentDate.getMonth()];
	}, [currentDate]);

	const handleNewEvent = () => {
		setAddNewEvent((prev) => !prev);
	};

	return (
		<CalendarContext.Provider
			value={{
				nextMonth,
				prevMonth,
				getDate,
				getDays,
				getMonth: getMonthName,
				todayDate,
				addNewEvent: handleNewEvent,
				newEventForm: addNewEvent,
			}}
		>
			{children}
		</CalendarContext.Provider>
	);
};

export default CalendarProvider;
