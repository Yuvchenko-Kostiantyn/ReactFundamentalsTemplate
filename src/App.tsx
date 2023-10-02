import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { IAuthor } from './types/author.interface';
import { ICourse } from './types/course.interface';
import { AuthorsState, CoursesState } from './types/store';

import {
	CourseForm,
	CourseInfo,
	Courses,
	Header,
	Login,
	Registration,
} from './components';
import { getAuthors, getCourses } from './services';
import { authorsSelector, coursesSelector } from './store/selectors';
import { authorsSlice } from './store/slices/authorsSlice';
import { coursesSlice } from './store/slices/coursesSlice';

function App() {
	const dispatch = useDispatch();

	const courses: CoursesState = useSelector(coursesSelector);
	const authors: AuthorsState = useSelector(authorsSelector);
	const token = localStorage.getItem('token');

	const dispatchSetItems = (courses: ICourse[], authors: IAuthor[]) => {
		dispatch(coursesSlice.actions.setCourses(courses));
		dispatch(authorsSlice.actions.setAuthors(authors));
	};

	useEffect(() => {
		(async () => {
			const courses = await getCourses();
			const authors = await getAuthors();
			dispatchSetItems(courses.result, authors.result);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
			<Routes>
				<Route
					path='/'
					element={
						token ? <Navigate to='/courses' /> : <Navigate to='/login' />
					}
				/>
				<Route path='/registration' element={<Registration />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route
					path='/courses'
					element={<Courses coursesList={courses} authorsList={authors} />}
				></Route>
				<Route path='/courses/:courseId' element={<CourseInfo />}></Route>
				<Route path='/courses/add' element={<CourseForm />}></Route>
			</Routes>
		</>
	);
}

export default App;
