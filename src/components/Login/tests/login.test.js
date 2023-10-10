import { useState as useStateMock } from 'react';

import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../../../helpers/test';
import { login as loginMock } from '../../../services';
import { Login } from '../Login';

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn(),
}));

jest.mock('../../../services', () => ({
	login: jest.fn(),
}));

const mockDispatch = jest.fn();

jest.mock('../../../store', () => ({
	useAppDispatch: () => mockDispatch,
}));

const mockGetUserThunk = jest.fn();

jest.mock('../../../store/thunks/userThunk', () => ({
	getUserThunk: () => mockGetUserThunk,
}));

describe('Login', () => {
	const mockSetState = jest.fn();
	beforeEach(() => {
		jest.clearAllMocks();
		useStateMock.mockImplementation((init) => [init, mockSetState]);
		renderWithProviders(<Login />);
	});

	it('should submit form with current input states as objects', async () => {
		jest.spyOn(Storage.prototype, 'setItem');
		localStorage.setItem = jest.fn();
		loginMock.mockResolvedValue({ result: 'test' });
		const button = await screen.findByText('LOGIN');
		fireEvent.click(button);

		expect(loginMock).toHaveBeenCalledWith({
			email: '',
			password: '',
		});
		await loginMock();

		expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test');
		expect(mockDispatch).toHaveBeenCalled(mockGetUserThunk());
	});

	it('should set value from email field', () => {
		const emailInput = screen.getByLabelText('Email');
		fireEvent.change(emailInput, { target: { value: 'test' } });
		expect(mockSetState).toHaveBeenCalledWith('test');
		expect(true).toBeTruthy();
	});

	it('should set value from password field', () => {
		const passwordInput = screen.getByLabelText('Password');
		fireEvent.change(passwordInput, { target: { value: 'test' } });
		expect(mockSetState).toHaveBeenCalledWith('test');
		expect(true).toBeTruthy();
	});
});
