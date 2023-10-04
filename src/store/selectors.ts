import { AuthorsState, CoursesState, UserState } from '../types/store';

import { RootState } from './index';

export const authorsSelector = (state: RootState): AuthorsState =>
	state.authors;

export const userSelector = (state: RootState): UserState => state.user;

export const userRoleSelector = (state: RootState): string => state.user.role;

export const coursesSelector = (state: RootState): CoursesState =>
	state.courses;
