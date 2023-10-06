export function mapAuthorNames(authorIdArray, authorsList = []) {
	if (!authorIdArray) {
		return [];
	}

	return authorIdArray.map((id) => {
		return authorsList.find((author) => author.id === id)?.name;
	});
}
