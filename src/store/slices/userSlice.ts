import { Draft, createSlice } from '@reduxjs/toolkit';

import { UserState } from '../../types/store';

const initialState: UserState = {
	isAuth: false,
	name: '',
	email: '',
	token: localStorage.getItem('token'),
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData: (state: Draft<UserState>, { payload }) => {
			state.isAuth = true;
			state.email = payload.email;
			state.name = payload.name;
			state.token = payload.result;
		},
		removeUserData: (state: Draft<UserState>) => {
			state.isAuth = false;
			state.email = '';
			state.name = '';
			state.token = null;
		},
	},
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
