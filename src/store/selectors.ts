import { AuthorsState, CoursesState, UserState } from '../types/store';

import { RootState } from './index';

export const authorsSelector = (state: RootState): AuthorsState =>
	state.authors;

export const userSelector = (state: RootState): UserState => state.user;

export const isUserAdminSelector = (state: RootState): boolean =>
	state.user.role === 'admin';

export const coursesSelector = (state: RootState): CoursesState =>
	state.courses;
