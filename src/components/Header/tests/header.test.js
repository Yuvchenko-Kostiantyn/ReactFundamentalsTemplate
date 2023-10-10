import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../helpers/test';
import { Header } from '../Header';

describe('Header', () => {
	const initialState = {
		user: { token: 'test token' },
	};

	it('should render logo', () => {
		renderWithProviders(<Header />, { initialState, route: '/courses' });
		expect(screen.getByAltText('logo')).toBeDefined();
	});

	it('should show login button if user token is not present', () => {
		renderWithProviders(<Header />, {
			initialState: { user: { token: null } },
			route: '/courses',
		});

		expect(screen.getByText('LOGIN')).toBeDefined();
	});
});
