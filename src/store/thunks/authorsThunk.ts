import { createAuthor, getAuthors } from '../../services';
import { AppDispatch } from '../index';
import { saveAuthor, setAuthors } from '../slices/authorsSlice';

export const createAuthorThunk = (
	newAuthorName: string,
	token: string | null
) => {
	return async (dispatch: AppDispatch) => {
		try {
			const response = await createAuthor(newAuthorName, token);
			dispatch(saveAuthor(response.result));
		} catch (err) {
			console.error(err);
		}
	};
};

export const getAuthorsThunk = () => {
	return async (dispatch: AppDispatch) => {
		try {
			const { result } = await getAuthors();
			dispatch(setAuthors(result));
		} catch (err) {
			console.error(err);
		}
	};
};
