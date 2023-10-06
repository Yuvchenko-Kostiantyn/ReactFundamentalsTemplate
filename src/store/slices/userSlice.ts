import { Draft, createSlice, current } from '@reduxjs/toolkit';

import { UserState } from '../../types/store';

const initialState: UserState = {
	isAuth: false,
	name: '',
	email: '',
	role: '',
	token: localStorage.getItem('token'),
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData: (state: Draft<UserState>, { payload }) => {
			return { ...current(state), ...payload, isAuth: true };
		},
		removeUserData: () => {
			return { ...initialState, token: null };
		},
	},
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
