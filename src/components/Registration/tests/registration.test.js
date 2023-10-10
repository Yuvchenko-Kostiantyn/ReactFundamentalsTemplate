import { useState as useStateMock } from 'react';

import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../../../helpers/test';
import { createUser as createUserMock } from '../../../services';
import { Registration } from '../Registration';

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn(),
}));

jest.mock('../../../services', () => ({
	createUser: jest.fn(),
}));

describe('Registration', () => {
	const setState = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		useStateMock.mockImplementation((init) => [init, setState]);
		createUserMock.mockImplementation(jest.fn);
		renderWithProviders(<Registration />);
	});

	it('should submit form with current input states as objects', async () => {
		const button = screen.getByText('LOGIN');
		fireEvent.click(button);

		expect(createUserMock).toHaveBeenCalledWith({
			name: '',
			email: '',
			password: '',
		});
	});

	it('should set value from email field', () => {
		const emailInput = screen.getByLabelText('Email');
		fireEvent.change(emailInput, { target: { value: 'test' } });
		expect(setState).toHaveBeenCalledWith('test');
		expect(true).toBeTruthy();
	});

	it('should set value from password field', () => {
		const passwordInput = screen.getByLabelText('Password');
		fireEvent.change(passwordInput, { target: { value: 'test' } });
		expect(setState).toHaveBeenCalledWith('test');
		expect(true).toBeTruthy();
	});

	it('should set value from name field', () => {
		const nameInput = screen.getByLabelText('Name');
		fireEvent.change(nameInput, { target: { value: 'test' } });
		expect(setState).toHaveBeenCalledWith('test');
		expect(true).toBeTruthy();
	});
});
