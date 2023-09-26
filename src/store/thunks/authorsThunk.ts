import { getCourses } from '../../services';
import { setAuthors } from '../slices/authorsSlice';
import { ThunkDispatch } from "redux-thunk";

export const createAuthorThunk = () => {};

export const getAuthorsThunk = () => {
	return async (dispatch: ThunkDispatch<any, any, any>, state: any) => {
		console.log();
		const { result } = await getCourses();
		console.log(result);
		dispatch(setAuthors(state))
		// dispatch(setAuthors(getState, { payload: result }));
	};
};
