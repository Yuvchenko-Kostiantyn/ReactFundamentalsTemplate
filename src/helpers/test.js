import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';

import authorsSlice from '../store/slices/authorsSlice';
import coursesSlice from '../store/slices/coursesSlice';
import userSlice from '../store/slices/userSlice';

export function renderWithProviders(
	ui,
	{ route = '/', initialState = {} } = {}
) {
	const store = configureStore({
		reducer: {
			user: userSlice,
			courses: coursesSlice,
			authors: authorsSlice,
		},
		initialState,
	});

	return {
		...render(
			<Provider store={store}>
				<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
			</Provider>
		),
		store,
	};
}
