import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './components';

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
			<Outlet></Outlet>
		</>
	);
}

export default App;
