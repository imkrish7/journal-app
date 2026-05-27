import z from "zod";
// if date is current day then startTime start by currentTime and not is past
// startime if event is for same day it should be future time not past time
// endTime should greater than startTime but max diffrence would 24 hours and

export const eventSchema = z
	.object({
		id: z.string().optional(),
		title: z.string().min(6),
		startDate: z.string(),
		endDate: z.string(),
		startTime: z.string(),
		endTime: z.string(),
		description: z.string(),
	}).superRefine((val, ctx) => {
		const startDate = new Date(val.startDate).getDate();
		const endDate = new Date(val.endDate).getDate();
		const [, startMeridian] = val.startTime.split(" ");
		const [, endMeridian] = val.endTime.split(" ");

		if (startDate > endDate && startMeridian === endMeridian) {
			ctx.addIssue({
				code: "custom",
				message: "End date should be greater than start date",
				input: val.endDate,
				inclusive: true,
			})
		}

		if(startDate === endDate && val.startTime > val.endTime && startMeridian === endMeridian) {
			ctx.addIssue({
				code: "custom",
				message: "End time should be in future",
				input: val.endTime,
				inclusive: true,
				path: ["endTime"],
			});
		}
		
	});
