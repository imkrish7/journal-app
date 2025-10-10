export interface IEvent {
	name: string;
	startTime: string;
	endTime: string;
	type: "professional" | "physical" | "casual" | "personal";
}

interface WeakCalender {
	[name: string]: [
		IEvent?,
		IEvent?,
		IEvent?,
		IEvent?,
		IEvent?,
		IEvent?,
		IEvent?
	];
}

const formatHour = (hour: number) => {
	if (hour >= 12) {
		const _hour = hour % 12 == 0 ? hour : hour % 12;
		return `${_hour}:00 pm`;
	} else {
		return `${hour}:00 am`;
	}
};

const events: IEvent[] = [
	{
		name: "Project Task review",
		startTime: "08:00",
		endTime: "08:25",
		type: "professional",
	},
	{
		name: "Doctor's Appointment for Mother",
		startTime: "09:00",
		endTime: "10:45",
		type: "personal",
	},
	{
		name: "Workout and Yoga Session",
		startTime: "09:00",
		endTime: "10:45",
		type: "physical",
	},
	{
		name: "Pickup the grandmother",
		startTime: "06:00",
		endTime: "07:30",
		type: "personal",
	},
	{
		name: "Breakfast with Dhruv Patel",
		startTime: "08:00",
		endTime: "09:00",
		type: "casual",
	},
	{
		name: "Dancing Zumba class",
		startTime: "08:00",
		endTime: "09:00",
		type: "physical",
	},
	{
		name: "Daily standup meeting",
		startTime: "08:00",
		endTime: "09:00",
		type: "professional",
	},
	{
		name: "Meeting with Project Manager",
		startTime: "11:00",
		endTime: "12:30",
		type: "professional",
	},
	{
		name: "School Friend's Birthday party",
		startTime: "10:00",
		endTime: "11:45",
		type: "casual",
	},
];

const getEvent = (day: number, hour: number) => {
	const eventNumber = Math.floor(Math.random() * 9);
	const event = events[eventNumber];
	switch (day % 7) {
		case 0: {
			if (parseInt(event.startTime.split(":")[0]) === hour) {
				return event;
			}
			return;
		}
		case 1: {
			if (parseInt(event.startTime.split(":")[0]) === hour) {
				return event;
			}
			return;
		}
		case 2: {
			if (parseInt(event.startTime.split(":")[0]) === hour) {
				return event;
			}
			return;
		}
		case 3: {
			if (parseInt(event.startTime.split(":")[0]) === hour) {
				return event;
			}
			return;
		}
		case 4: {
			if (parseInt(event.startTime.split(":")[0]) === hour) {
				return event;
			}
			return;
		}
		case 5: {
			if (parseInt(event.startTime.split(":")[0]) === hour) {
				return event;
			}
			return;
		}
		case 6: {
			if (parseInt(event.startTime.split(":")[0]) === hour) {
				return event;
			}
			return;
		}
		default:
			return;
	}
};

const generateData = () => {
	const result: WeakCalender = {};

	for (let i = 0; i < 24; i++) {
		const hourOfDay = formatHour(i);
		for (let j = 0; j < 7; j++) {
			const event = getEvent(j, i);

			if (!result[hourOfDay]) {
				result[hourOfDay] = [];
				result[hourOfDay][j] = event;
			} else {
				result[hourOfDay][j] = event;
			}
		}
	}
	return result;
};

export { generateData };
