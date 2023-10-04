import { deleteCourse, getCourses } from '../../services';
import { AppDispatch } from '../index';
import { coursesSlice, setCourses } from '../slices/coursesSlice';

export const updateCourseThunk = () => {};

export const deleteCourseThunk = (courseId: string, token: string) => {
	return async (dispatch: AppDispatch) => {
		try {
			const course = await deleteCourse(courseId, token);
			dispatch(coursesSlice.actions.deleteCourse(course));
		} catch (err) {
			console.error(err);
		}
	};
};

export const createCourseThunk = () => {};

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
