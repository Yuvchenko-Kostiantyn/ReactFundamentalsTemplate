import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './components';

// Task 2 and 3 - wrap your App with redux Provider and BrowserRouter in src/index.js

function App() {
	return (
		<>
			<Header></Header>
			<Outlet></Outlet>
		</>
	);
}

export default App;
