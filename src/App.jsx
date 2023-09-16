import React, { useState } from 'react';

import { CourseInfo, Courses, Header } from './components';
import { mockedAuthorsList, mockedCoursesList } from './constants';

import styles from './App.module.css';

// Task 2 and 3 - wrap your App with redux Provider and BrowserRouter in src/index.js

function App() {
	const [showCourse, setShowCourse] = useState('');

	const handleShowCourse = (courseId) => {
		setShowCourse(courseId);
	};

	const onBack = () => {
		setShowCourse('');
	};

	return (
		<>
			<Header></Header>
			<div className={styles.container}>
				{showCourse ? (
					<CourseInfo
						authorsList={mockedAuthorsList}
						coursesList={mockedCoursesList}
						onBack={onBack}
						showCourseId={showCourse}
					></CourseInfo>
				) : (
					<Courses
						coursesList={mockedCoursesList}
						authorsList={mockedAuthorsList}
						handleShowCourse={handleShowCourse}
					></Courses>
				)}
			</div>
		</>
	);
}

export default App;
