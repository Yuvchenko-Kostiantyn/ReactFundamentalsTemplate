import { authorsSlice } from '../authorsSlice';

describe('authorsSlice', () => {
	describe('setAuthors reducer', () => {
		it('should set the state to the provided payload', () => {
			const initialState = [];
			const newAuthors = [
				{ id: 1, name: 'Author 1' },
				{ id: 2, name: 'Author 2' },
			];

			const action = {
				type: authorsSlice.actions.setAuthors.type,
				payload: newAuthors,
			};

			const newState = authorsSlice.reducer(initialState, action);

			expect(newState).toEqual(newAuthors);
		});
	});

	describe('saveAuthor reducer', () => {
		it('should add the new author to the current state', () => {
			const initialState = [{ id: 1, name: 'Author 1' }];
			const newAuthor = { id: 2, name: 'Author 2' };

			const action = {
				type: authorsSlice.actions.saveAuthor.type,
				payload: newAuthor,
			};

			const newState = authorsSlice.reducer(initialState, action);

			expect(newState).toEqual([...initialState, newAuthor]);
		});
	});
});
