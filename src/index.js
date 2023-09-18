import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import {
	CourseForm,
	CourseInfo,
	Courses,
	Login,
	Registration,
} from './components';
import { mockedAuthorsList, mockedCoursesList } from './constants';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />}>
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
			</Route>
		</Routes>
	</BrowserRouter>
);
