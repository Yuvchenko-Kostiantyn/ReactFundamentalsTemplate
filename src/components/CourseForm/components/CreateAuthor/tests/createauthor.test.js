import { useState as useStateMock } from 'react';

import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../../../../../helpers/test';
import { CreateAuthor } from '../CreateAuhtor';

const mockDispatch = jest.fn();

jest.mock('../../../../../store', () => ({
	useAppDispatch: () => mockDispatch,
}));

const mockAuthorThunk = jest.fn();

jest.mock('../../../../../store/thunks/authorsThunk', () => ({
	createAuthorThunk: () => mockAuthorThunk,
}));

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn(),
}));

describe('CreateAuthor', () => {
	const setState = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		useStateMock.mockImplementation((init) => [init, setState]);
		renderWithProviders(<CreateAuthor />);
	});

	it('should dispatch action on submit', () => {
		const button = screen.getByTestId('createAuthorButton');

		fireEvent.click(button);
		expect(mockDispatch).toHaveBeenCalledWith(mockAuthorThunk);
	});

	it('should set state on input', () => {
		const input = screen.getByTestId('createAuthorInput');
		fireEvent.change(input, { target: { value: 'test' } });
		expect(setState).toHaveBeenCalledWith('test');
	});
});
