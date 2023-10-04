import { ICourse } from '../../types/course.interface';

import { createCourse, deleteCourse, getCourses } from '../../services';
import { AppDispatch } from '../index';
import { coursesSlice, setCourses } from '../slices/coursesSlice';

export const updateCourseThunk = () => {};

export const deleteCourseThunk = (courseId: string, token: string | null) => {
	return async (dispatch: AppDispatch) => {
		try {
			await deleteCourse(courseId, token);
			dispatch(coursesSlice.actions.deleteCourse(courseId));
		} catch (err) {
			console.error(err);
		}
	};
};

export const createCourseThunk = (course: ICourse, token: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			console.log(+course.duration);
			const { result } = await createCourse(
				{
					...course,
					duration: +course.duration,
				},
				token
			);
			dispatch(coursesSlice.actions.saveCourse(result));
		} catch (err) {
			console.error(err);
		}
	};
};

export const getCoursesThunk = () => {
	return async (dispatch: AppDispatch) => {
		try {
			const { result } = await getCourses();
			dispatch(setCourses(result));
		} catch (err) {
			console.error(err);
		}
	};
};
