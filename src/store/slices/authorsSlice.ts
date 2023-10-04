import { createSlice, current } from '@reduxjs/toolkit';

import { AuthorsState } from '../../types/store';

const initialState: AuthorsState = [];

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		setAuthors: (state, { payload }) => {
			return [...payload];
		},
		saveAuthor: (state, { payload }) => {
			return [...current(state), payload];
		},
	},
});

// use these actions in your components / thunks
export const { setAuthors, saveAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
