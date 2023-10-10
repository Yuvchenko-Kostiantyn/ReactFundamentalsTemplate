import {
	createCourse as mockCreateCourse,
	deleteCourse as mockDeleteCourse,
	getCourses as mockGetCourses,
	updateCourse as mockUpdateCourse,
} from '../../../services';
import { coursesSlice, setCourses } from '../../slices/coursesSlice';
import {
	createCourseThunk,
	deleteCourseThunk,
	getCoursesThunk,
	updateCourseThunk,
} from '../coursesThunk';

// Mock the updateCourse function
jest.mock('../../../services');

describe('coursesThunk', () => {
	const mockDispatch = jest.fn();
	let consoleErrorSpy;
	beforeEach(() => {
		jest.restoreAllMocks();
		consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('updateCourseThunk', () => {
		it('should dispatch the updateCourse action with result on success', async () => {
			const mockCourseData = { id: 1, title: 'Test Course' };
			const mockResult = { id: 1, title: 'Updated Test Course' };

			mockUpdateCourse.mockResolvedValueOnce({ result: mockResult });

			const mockDispatch = jest.fn();
			coursesSlice.actions.updateCourse = jest
				.fn()
				.mockReturnValue({ type: 'updateCourse', payload: mockResult });

			const thunk = updateCourseThunk(mockCourseData, 'token');
			await thunk(mockDispatch);

			expect(mockUpdateCourse).toHaveBeenCalledWith(mockCourseData, 'token');
			expect(mockDispatch).toHaveBeenCalledWith({
				type: 'updateCourse',
				payload: mockResult,
			});
		});

		it('should log error to console', async () => {
			const mockCourseData = { id: 1, title: 'Test Course' };

			mockUpdateCourse.mockRejectedValueOnce(new Error('Test Error'));

			const mockDispatch = jest.fn();

			const thunk = updateCourseThunk(mockCourseData, 'token');
			await thunk(mockDispatch);

			expect(mockUpdateCourse).toHaveBeenCalledWith(mockCourseData, 'token');
			expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Test Error'));
		});
	});

	describe('deleteCourseThunk', () => {
		it('shoulc dispatch the deleteCourse action with result on success', async () => {
			const mockCourseData = { id: 1, title: 'Test Course' };
			const mockResult = { id: 1, title: 'Test Course' };

			mockDeleteCourse.mockResolvedValueOnce({ result: mockResult });

			coursesSlice.actions.deleteCourse = jest
				.fn()
				.mockReturnValue({ type: 'courses/deleteCourse', payload: mockResult });

			const thunk = deleteCourseThunk(mockCourseData, 'token');
			await thunk(mockDispatch);

			expect(mockDeleteCourse).toHaveBeenCalledWith(mockCourseData, 'token');
			expect(mockDispatch).toHaveBeenCalledWith({
				type: 'courses/deleteCourse',
				payload: mockResult,
			});
		});

		it('should log error to console', async () => {
			const mockCourseId = '1234';

			mockDeleteCourse.mockRejectedValueOnce(new Error('Test Error'));
			const thunk = deleteCourseThunk(mockCourseId, 'test_token');
			await thunk(mockDispatch);

			expect(mockDeleteCourse).toHaveBeenCalledWith(mockCourseId, 'test_token');
			expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Test Error'));
		});
	});

	describe('createCourseThunk', () => {
		it('should call createCourse and dispatch saveCourse action', async () => {
			const mockCourse = {
				title: 'Test Course',
				duration: '10',
			};
			const mockToken = 'test-token';

			const mockResultCourse = {
				...mockCourse,
				id: '1',
				duration: 10,
			};

			mockCreateCourse.mockResolvedValueOnce({ result: mockResultCourse });

			const thunk = createCourseThunk(mockCourse, mockToken);

			await thunk(mockDispatch);

			expect(mockCreateCourse).toHaveBeenCalledWith(
				{
					...mockCourse,
					duration: 10,
				},
				mockToken
			);

			expect(mockDispatch).toHaveBeenCalledWith(
				coursesSlice.actions.saveCourse(mockResultCourse)
			);
		});

		it('should log error to console', async () => {
			const mockCourse = {
				title: 'Test Course',
				duration: '10',
			};
			const mockToken = 'test-token';

			mockCreateCourse.mockRejectedValueOnce(new Error('Test Error'));
			const thunk = createCourseThunk(mockCourse, mockToken);
			await thunk(mockDispatch);
			expect(mockDispatch).not.toHaveBeenCalled();
			expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Test Error'));
		});
	});

	describe('getCoursesThunk', () => {
		afterEach(() => {
			jest.clearAllMocks();
		});

		it('should call getCourses and dispatch setCourses action', async () => {
			const mockCourses = [
				{ id: '1', title: 'Course 1' },
				{ id: '2', title: 'Course 2' },
			];

			mockGetCourses.mockResolvedValueOnce({ result: mockCourses });

			const thunk = getCoursesThunk();
			await thunk(mockDispatch);

			expect(mockGetCourses).toHaveBeenCalled();
			expect(mockDispatch).toHaveBeenCalledWith(setCourses(mockCourses));
		});

		it('should log error to console', async () => {
			mockGetCourses.mockRejectedValueOnce(new Error('Test Error'));

			const thunk = getCoursesThunk();
			await thunk(mockDispatch);

			expect(mockDispatch).not.toHaveBeenCalled();
			expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Test Error'));
		});
	});
});
