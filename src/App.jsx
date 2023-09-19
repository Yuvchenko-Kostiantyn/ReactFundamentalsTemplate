import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import {
	CourseForm,
	CourseInfo,
	Courses,
	Header,
	Login,
	Registration,
} from './components';
import { mockedAuthorsList, mockedCoursesList } from './constants';

// Task 2 and 3 - wrap your App with redux Provider and BrowserRouter in src/index.js
function App() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);

	const createCourse = (newCourse) => {
		const courseWithId = {
			id: `${Math.floor(Math.random() * 100)}`,
			...newCourse,
		};

		setCourses((prevValue) => [...prevValue, courseWithId]);
	};

	const createAuthor = (newAuthor) => {
		setAuthors((prevValue) => [...prevValue, newAuthor]);
	};

	const token = localStorage.getItem('token');
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route
					path='/'
					element={
						token ? <Navigate to='/courses' /> : <Navigate to='/login' />
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
							createCourse={createCourse}
							createAuthor={createAuthor}
						/>
					}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
