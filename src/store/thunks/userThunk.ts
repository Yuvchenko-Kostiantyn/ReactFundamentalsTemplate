import { getCurrentUser, logout } from '../../services';
import { AppDispatch } from '../index';
import { removeUserData, setUserData } from '../slices/userSlice';

export const getUserThunk = (token: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			const { result } = await getCurrentUser(token);
			dispatch(setUserData({ ...result, token }));
		} catch (err) {
			console.error(err);
		}
	};
};

export const logoutThunk = (token: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			await logout(token);
			dispatch(removeUserData());
		} catch (err: any) {
			console.error(err);
			dispatch(removeUserData());
		}
	};
};
