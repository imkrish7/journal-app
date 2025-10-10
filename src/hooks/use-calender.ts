// import {
// 	startOfMonth,
// 	endOfMonth,
// 	eachDayOfInterval,
// 	startOfWeek,
// 	addDays,
// } from "date-fns";
// export const useCalendar = (currentDate: Date) => {
// 	const _start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
// 	const _end = endOfMonth(currentDate);

// 	const monthDays = eachDayOfInterval({
// 		start: _start,
// 		end: addDays(_end, 6),
// 	});
// 	return monthDays;
// };
