
export const mouseMove = (day, hours, startDay, startHours) => ({
	type: 'MOUSE MOVE',
	day: day, 
	hours: hours,
	startDay: startDay,
	startHours: startHours 
});

export const mouseUp = () => ({
	type: 'MOUSE UP'
});

export const toggleHours = (day, hours) => ({
	type: 'TOGGLE HOURS',
	day: day, 
	hours: hours
});

export const toggleDay = (day) => ({
	type: 'TOGGLE DAY',
	day: day
});

export const clearAll = () => ({
	type: 'CLEAR ALL'
});






