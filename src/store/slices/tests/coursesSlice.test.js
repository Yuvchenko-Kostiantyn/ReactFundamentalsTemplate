import { coursesSlice } from '../coursesSlice';

describe('coursesSlice', () => {
	describe('setCourses reducer', () => {
		it('should set the state to the provided payload', () => {
			const initialState = [];
			const newCourses = [
				{ id: '1', title: 'Course A' },
				{ id: '2', title: 'Course B' },
			];

			const action = {
				type: coursesSlice.actions.setCourses.type,
				payload: newCourses,
			};

			const newState = coursesSlice.reducer(initialState, action);

			expect(newState).toEqual(newCourses);
		});
	});

	describe('saveCourse reducer', () => {
		it('should add the new course to the current state', () => {
			const initialState = [{ id: '1', title: 'Course A' }];
			const newCourse = { id: '2', title: 'Course B' };

			const action = {
				type: coursesSlice.actions.saveCourse.type,
				payload: newCourse,
			};

			const newState = coursesSlice.reducer(initialState, action);

			expect(newState).toEqual([...initialState, newCourse]);
		});
	});

	describe('deleteCourse reducer', () => {
		it('should remove the specified course from the state', () => {
			const initialState = [
				{ id: '1', title: 'Course A' },
				{ id: '2', title: 'Course B' },
			];

			const action = {
				type: coursesSlice.actions.deleteCourse.type,
				payload: '1',
			};

			const newState = coursesSlice.reducer(initialState, action);

			expect(newState).toEqual([{ id: '2', title: 'Course B' }]);
		});
	});

	describe('updateCourse reducer', () => {
		it('should update the specified course in the state', () => {
			const initialState = [
				{ id: '1', title: 'Course A' },
				{ id: '2', title: 'Course B' },
			];

			const updatedCourse = { id: '1', title: 'Updated Course A' };

			const action = {
				type: coursesSlice.actions.updateCourse.type,
				payload: updatedCourse,
			};

			const newState = coursesSlice.reducer(initialState, action);

			expect(newState).toContainEqual(updatedCourse);
			expect(newState.length).toEqual(2);
		});
	});
});
