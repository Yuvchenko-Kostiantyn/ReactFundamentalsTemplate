import { Draft, createSlice } from '@reduxjs/toolkit';

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
			console.log(payload);
			state.isAuth = true;
			state.email = payload.user.email;
			state.name = payload.user.name;
			state.token = payload.result;
			state.role = payload.user.role;
		},
		removeUserData: (state: Draft<UserState>) => {
			state.isAuth = false;
			state.email = '';
			state.name = '';
			state.role = '';
			state.token = null;
		},
	},
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
