import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthorsState, CoursesState } from './types/store';

import {
	CourseForm,
	CourseInfo,
	Courses,
	Header,
	Login,
	PrivateRoute,
	Registration,
} from './components';
import { useAppDispatch } from './store';
import { authorsSelector, coursesSelector } from './store/selectors';
import { getAuthorsThunk } from './store/thunks/authorsThunk';
import { getCoursesThunk } from './store/thunks/coursesThunk';

function App() {
	const dispatch = useAppDispatch();

	const courses: CoursesState = useSelector(coursesSelector);
	const authors: AuthorsState = useSelector(authorsSelector);
	const token = localStorage.getItem('token');

	useEffect(() => {
		dispatch(getCoursesThunk());
		dispatch(getAuthorsThunk());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

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
				<Route
					path='/courses/add'
					element={
						<PrivateRoute>
							<CourseForm />
						</PrivateRoute>
					}
				></Route>
				<Route
					path='/courses/update/:courseId'
					element={
						<PrivateRoute>
							<CourseForm />
						</PrivateRoute>
					}
				></Route>
			</Routes>
		</>
	);
}

export default App;
