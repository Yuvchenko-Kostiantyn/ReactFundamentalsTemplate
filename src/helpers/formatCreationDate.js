export const formatCreationDate = (date) => {
	const [day, month, year] = date.split('/');
	return `${day}.${month}.${year}`;
};
