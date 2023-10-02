import { EnhancedStore, configureStore } from '@reduxjs/toolkit';

import authorsSlice from './slices/authorsSlice';
import coursesSlice from './slices/coursesSlice';
import userSlice from './slices/userSlice';

const store: EnhancedStore = configureStore({
	reducer: {
		user: userSlice,
		courses: coursesSlice,
		authors: authorsSlice,
	},
});

export type rootState = ReturnType<typeof store.getState>;

export default store;
