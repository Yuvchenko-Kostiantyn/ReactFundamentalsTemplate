import React from 'react';

import { Courses, Header } from './components';
import { mockedAuthorsList, mockedCoursesList } from './constants';

import styles from './App.module.css';

// Task 2 and 3 - wrap your App with redux Provider and BrowserRouter in src/index.js

function App() {
	return (
		<>
			<Header></Header>
			<div className={styles.container}>
				<Courses
					coursesList={mockedCoursesList}
					authorsList={mockedAuthorsList}
				></Courses>
			</div>
		</>
	);
}

export default App;
