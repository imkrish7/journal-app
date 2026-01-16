"use client";
import { createContext, useContext } from "react";

export interface ICalendar {
	nextMonth: () => void; // go to next month
	prevMonth: () => void; // go to prev month
	getDate: () => Date; // it will return a todays date or unless a date selected on calendar
	getDays: Date[];
	getMonth: string;
	todayDate: Date;
	addNewEvent: () => void;
	newEventForm: boolean;
}

export const CalendarContext = createContext<ICalendar | null>(null);

export const useCalendar = () => {
	return useContext(CalendarContext);
};
