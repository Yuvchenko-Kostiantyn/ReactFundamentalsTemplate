import { useState as useStateMock } from 'react';

import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../../../helpers/test';
import { CourseForm } from '../CourseForm';

const mockDispatch = jest.fn();

jest.mock('../../../store', () => ({
	useAppDispatch: () => mockDispatch,
}));

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn(),
}));

const mockCreateCourseThunk = jest.fn();

jest.mock('../../../store/thunks/coursesThunk', () => ({
	createCourseThunk: () => mockCreateCourseThunk,
}));

describe('CourseForm', () => {
	const authorsList = [
		{ id: '10', name: 'Author 1' },
		{ id: '11', name: 'Author 2' },
	];
	const mockCreateCourse = jest.fn();
	const mockCreateAuthor = jest.fn();

	const setState = jest.fn();

	beforeEach(() => {
		jest.resetAllMocks();
		useStateMock.mockImplementation((init) => [init, setState]);
		renderWithProviders(
			<CourseForm
				authorsList={authorsList}
				createAuthor={mockCreateAuthor}
				createCourse={mockCreateCourse}
			/>
		);
	});

	it('should set empty course', () => {
		const emptyCourse = {
			title: '',
			description: '',
			duration: 0,
			creationDate: '',
			authors: [],
		};

		expect(useStateMock).toHaveBeenCalledWith(emptyCourse);
	});

	it('should submit form data', () => {
		const submitButton = screen.getByTestId('createCourseButton');
		fireEvent.click(submitButton);

		expect(mockDispatch).toHaveBeenCalledWith(mockCreateCourseThunk);
	});

	it('should set state for the selected property', () => {
		const titleInput = screen.getByTestId('titleInput');
		fireEvent.change(titleInput, {
			target: { value: 'Test Title', name: 'title' },
		});

		expect(setState).toHaveBeenCalled();
	});
});
