import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/registration' element={<Registration />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route
					path='/courses'
					element={
						<Courses
							coursesList={mockedCoursesList}
							authorsList={mockedAuthorsList}
						/>
					}
				></Route>
				<Route
					path='/courses/:id'
					element={
						<CourseInfo
							coursesList={mockedCoursesList}
							authorsList={mockedAuthorsList}
						/>
					}
				></Route>
				<Route
					path='/courses/add'
					element={<CourseForm authorsList={mockedAuthorsList} />}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
