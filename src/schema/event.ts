import z from "zod";
// if date is current day then startTime start by currentTime and not is past
// startime if event is for same day it should be future time not past time
// endTime should greater than startTime but max diffrence would 24 hours and

export const eventSchema = z
	.object({
		title: z.string().min(6),
		date: z.coerce.date().refine(
			(val) => {
				const currentDate = new Date();
				console.log(val.toDateString(), currentDate);
				return val.getTime() >= currentDate.getTime();
			},
			{
				message: "You can't create events to past dates",
			},
		),
		startTime: z.string(),
		endTime: z.string(),
		description: z.string(),
	})
	.superRefine((val, ctx) => {
		const userDate = new Date(val.date).getDate();
		const currentDate = new Date().getDate();
		const startTimeHour = parseInt(val.startTime.split(":")[0]);
		const startTimeMinute = parseInt(val.startTime.split(":")[1]);

		if (currentDate === userDate) {
			const currentHours = new Date().getTime();
			const currentMinute = new Date().getMinutes();
			if (
				!(currentHours >= startTimeHour && currentMinute >= startTimeMinute - 1)
			) {
				ctx.addIssue({
					code: "custom",
					message: "An Event should not start in past ",
					input: val.startTime,
					inclusive: true,
					path: ["startTime"],
				});
			}

			if (val.startTime > val.endTime) {
				ctx.addIssue({
					code: "custom",
					message: "Endtime should be in future",
					input: val.endTime,
					inclusive: true,
					path: ["endTime"],
				});
			}
		}
	});
