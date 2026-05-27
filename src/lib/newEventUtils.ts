const getTimeList = (hours: number, minutes: number, type: string) => {
	const result = [];

	for (let t = hours; t < 24; t++) {
		while (minutes < 60) {
			const isMorning = t > 12 ? "pm" : "am";
			const hour = t >= 10 ? (t % 12 >= 10 ? t : `0${t % 12}`) : `0${t}`;
			const minute = minutes >= 10 ? minutes : `0${minutes}`;
			result.push(`${hour}:${minute} ${isMorning}`);
			minutes += 15;
		}
		minutes = 0;
	}
	if (type === "end") {
		minutes = 0;
		for (let t = 0; t < hours; t++) {
			while (minutes < 60) {
				const isMorning = t > 12 ? "pm" : "am";
				const hour = t >= 10 ? (t % 12 >= 10 ? t : `0${t % 12}`) : `0${t}`;
				const minute = minutes >= 10 ? minutes : `0${minutes}`;
				result.push(`${hour}:${minute} ${isMorning} (next day)`);
				minutes += 15;
			}
			minutes = 0;
		}
	}
	return result;
};

export const getTimeLeft = (date: number, type: string = "start") => {
	const today = new Date();
	let currentTimeHours = today.getHours();
	const currentTimeMinutes = today.getMinutes();
	let nextQuadrant;

	if (today.getDate() == date) {
		nextQuadrant = Math.floor(currentTimeMinutes / 15) * 15 + 15;
	} else {
		nextQuadrant = 15;
		currentTimeHours = 0;
	}

	return getTimeList(
		currentTimeHours,
		nextQuadrant == 60 ? 0 : nextQuadrant,
		type,
	);
};
