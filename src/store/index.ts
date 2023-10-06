import { useDispatch } from 'react-redux';

import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';

import authorsSlice from './slices/authorsSlice';
import coursesSlice from './slices/coursesSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
	reducer: {
		user: userSlice,
		courses: coursesSlice,
		authors: authorsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
