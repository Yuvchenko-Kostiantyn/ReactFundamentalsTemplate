import {
	getCurrentUser as mockGetCurrentUser,
	logout as mockLogout,
} from '../../../services';
import { removeUserData, setUserData } from '../../slices/userSlice';
import { getUserThunk, logoutThunk } from '../userThunk';

jest.mock('../../../services');
jest.mock('../../slices/userSlice');

describe('userThunk', () => {
	const mockDispatch = jest.fn();
	let consoleErrorSpy;
	beforeEach(() => {
		jest.restoreAllMocks();
		consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getUserThunk', () => {
		it('should call getCurrentUser and dispatch setUserData action', async () => {
			const mockToken = 'sampleToken';
			const mockUser = {
				id: '1',
				name: 'John Doe',
				email: 'john.doe@example.com',
			};

			mockGetCurrentUser.mockResolvedValueOnce({ result: mockUser });

			const thunk = getUserThunk(mockToken);
			await thunk(mockDispatch);

			expect(mockGetCurrentUser).toHaveBeenCalledWith(mockToken);
			expect(mockDispatch).toHaveBeenCalledWith(
				setUserData({ ...mockUser, token: mockToken })
			);
		});

		it('should handle errors from getCurrentUser', async () => {
			const mockToken = 'sampleToken';

			// Mock an error for the getCurrentUser call
			mockGetCurrentUser.mockRejectedValueOnce(new Error('Test Error'));

			const thunk = getUserThunk(mockToken);

			await thunk(mockDispatch);
			expect(mockDispatch).not.toHaveBeenCalled();
			expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Test Error'));
		});
	});

	describe('logoutThunk', () => {
		afterEach(() => {
			jest.clearAllMocks();
		});

		it('should call logout and dispatch removeUserData action', async () => {
			const mockToken = 'sampleToken';

			mockLogout.mockResolvedValueOnce();

			const thunk = logoutThunk(mockToken);
			await thunk(mockDispatch);

			expect(mockLogout).toHaveBeenCalledWith(mockToken);
			expect(mockDispatch).toHaveBeenCalledWith(removeUserData());
		});

		it('should still dispatch removeUserData even if logout fails', async () => {
			const mockToken = 'token';

			mockLogout.mockRejectedValueOnce(new Error('Test Error'));

			const thunk = logoutThunk(mockToken);
			await thunk(mockDispatch);

			expect(mockLogout).toHaveBeenCalledWith(mockToken);
			expect(mockDispatch).toHaveBeenCalledWith(removeUserData());
			expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Test Error'));
		});
	});
});
