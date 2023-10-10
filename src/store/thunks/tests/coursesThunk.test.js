import { updateCourse as mockUpdateCourse } from '../../../services';
import { coursesSlice } from '../../slices/coursesSlice';
import { updateCourseThunk } from '../coursesThunk';

// Mock the updateCourse function
jest.mock('../../../services');

describe('coursesThunk', () => {
	describe('updateCourseThunk', () => {
		it('dispatches the updateCourse action with result on success', async () => {
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

			mockUpdateCourse.mockRejectedValueOnce(new Error('An error occurred'));

			const mockDispatch = jest.fn();
			const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

			const thunk = updateCourseThunk(mockCourseData, 'token');
			await thunk(mockDispatch);

			expect(mockUpdateCourse).toHaveBeenCalledWith(mockCourseData, 'token');
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				new Error('An error occurred')
			);
		});
	});
});
