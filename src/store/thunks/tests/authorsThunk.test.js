import {
	createAuthor as mockCreateAuthor,
	getAuthors as mockGetAuthors,
} from '../../../services';
import { saveAuthor, setAuthors } from '../../slices/authorsSlice';
import { createAuthorThunk, getAuthorsThunk } from '../authorsThunk';

jest.mock('./../../../services');

describe('authorsThunk', () => {
	describe('createAuthorThunk', () => {
		it('dispatches the saveAuthor action with result on success', async () => {
			const mockResult = { id: 1, name: 'Test Author' };

			mockCreateAuthor.mockResolvedValueOnce({ result: mockResult });

			const mockDispatch = jest.fn();

			const thunk = createAuthorThunk('Test Author', 'token');
			await thunk(mockDispatch);

			expect(mockCreateAuthor).toHaveBeenCalledWith('Test Author', 'token');
			expect(mockDispatch).toHaveBeenCalledWith(saveAuthor(mockResult));
		});

		it('should log error to console', async () => {
			mockCreateAuthor.mockRejectedValueOnce(new Error('An error occurred'));

			const mockDispatch = jest.fn();
			const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

			const thunk = createAuthorThunk('Test Author', 'token');
			await thunk(mockDispatch);

			expect(mockCreateAuthor).toHaveBeenCalledWith('Test Author', 'token');
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				new Error('An error occurred')
			);
		});
	});

	describe('getAuthorsThunk', () => {
		it('dispatches the setAuthors action with result on success', async () => {
			const mockResult = [
				{ id: 1, name: 'Author 1' },
				{ id: 2, name: 'Author 2' },
			];

			mockGetAuthors.mockResolvedValueOnce({ result: mockResult });

			const mockDispatch = jest.fn();

			const thunk = getAuthorsThunk();
			await thunk(mockDispatch);

			expect(mockGetAuthors).toHaveBeenCalled();
			expect(mockDispatch).toHaveBeenCalledWith(setAuthors(mockResult));
		});

		it('should log error to console', async () => {
			mockGetAuthors.mockRejectedValueOnce(new Error('An error occurred'));

			const mockDispatch = jest.fn();
			const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

			const thunk = getAuthorsThunk();
			await thunk(mockDispatch);

			expect(mockGetAuthors).toHaveBeenCalled();
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				new Error('An error occurred')
			);
		});
	});
});
