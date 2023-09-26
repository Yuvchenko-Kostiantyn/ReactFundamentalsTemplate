import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { IAuthor } from './types/author.interface';
import { ICourse } from './types/course.interface';
import { AuthorsState, CoursesState, UserState } from './types/store';

import {
	CourseForm,
	CourseInfo,
	Courses,
	Header,
	Login,
	Registration,
} from './components';
import { getAuthors, getCourses } from './services';
import {
	authorsSelector,
	coursesSelector,
	userSelector,
} from './store/selectors';
import { authorsSlice } from './store/slices/authorsSlice';
import { coursesSlice } from './store/slices/coursesSlice';

// Task 2 and 3 - wrap your App with redux Provider and BrowserRouter in src/index.js
function App() {
	const dispatch = useDispatch();

	const courses: CoursesState = useSelector(coursesSelector);
	const authors: AuthorsState = useSelector(authorsSelector);
	const user: UserState = useSelector(userSelector);

	const addCourse = (course: ICourse) => {
		dispatch(coursesSlice.actions.saveCourse(course));
	};

	const addAuthor = (author: IAuthor) => {
		dispatch(authorsSlice.actions.saveAuthor(author));
	};

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
						user.isAuth ? <Navigate to='/courses' /> : <Navigate to='/login' />
					}
				></Route>
				<Route path='/registration' element={<Registration />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route
					path='/courses'
					element={<Courses coursesList={courses} authorsList={authors} />}
				></Route>
				<Route
					path='/courses/:id'
					element={<CourseInfo coursesList={courses} authorsList={authors} />}
				></Route>
				<Route
					path='/courses/add'
					element={
						<CourseForm
							authorsList={authors}
							createCourse={(course: ICourse) => addCourse(course)}
							createAuthor={(author: IAuthor) => addAuthor(author)}
						/>
					}
				></Route>
			</Routes>
		</>
	);
}

export default App;
