export function mapAuthorNames(authorIdArray, authorsList) {
	return authorIdArray.map((id) => {
		return authorsList.find((author) => author.id === id).name;
	});
}
