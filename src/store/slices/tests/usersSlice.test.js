import { userSlice } from '../userSlice';

jest.spyOn(Storage.prototype, 'getItem');
localStorage.getItem = jest.fn();

describe('userSlice', () => {
	afterEach(() => {
		localStorage.getItem.mockClear();
	});

	describe('setUserData reducer', () => {
		it('should update the user data and set isAuth to true', () => {
			const initialState = {
				isAuth: false,
				name: '',
				email: '',
				role: '',
				token: localStorage.getItem('token'),
			};
			const newUserData = {
				name: 'John Doe',
				email: 'john@example.com',
				role: 'user',
			};

			const action = {
				type: userSlice.actions.setUserData.type,
				payload: newUserData,
			};

			const newState = userSlice.reducer(initialState, action);

			expect(newState).toEqual({
				...initialState,
				...newUserData,
				isAuth: true,
			});
		});
	});

	describe('removeUserData reducer', () => {
		it('should reset the user data and set token to null', () => {
			const initialState = {
				isAuth: true,
				name: 'John Doe',
				email: 'john@example.com',
				role: 'user',
				token: 'some-token',
			};

			const action = {
				type: userSlice.actions.removeUserData.type,
			};

			const newState = userSlice.reducer(initialState, action);

			expect(newState).toEqual({
				isAuth: false,
				name: '',
				email: '',
				role: '',
				token: null,
			});
		});
	});
});
