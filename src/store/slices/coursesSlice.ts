import { Draft, createSlice, current } from '@reduxjs/toolkit';

import { ICourse } from '../../types/course.interface';
import { CoursesState } from '../../types/store';

const initialState: CoursesState = [];

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		setCourses: (state: Draft<CoursesState>, { payload }) => {
			return [...current(state), ...payload];
		},
		saveCourse: (state: Draft<CoursesState>, { payload }) => {
			return [...current(state), payload];
		},
		deleteCourse: (state: Draft<CoursesState>, { payload }) => {
			return current(state).filter((course: ICourse) => course.id !== payload);
		},
		updateCourse: () => {},
	},
});

// use these actions in your components / thunks
export const { setCourses, saveCourse, deleteCourse, updateCourse } =
	coursesSlice.actions;

export default coursesSlice.reducer;
