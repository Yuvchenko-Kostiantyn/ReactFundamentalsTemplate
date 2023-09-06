export const getCourseDuration = (duration) => {
	const minutes = duration % 60;
	const hours = Math.floor(duration / 60);

	return `${hours}:${minutes} ${hours > 1 ? 'hours' : 'hour'}`;
};
