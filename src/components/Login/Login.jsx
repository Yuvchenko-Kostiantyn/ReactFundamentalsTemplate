import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Input } from '../../common';
import { login } from '../../services';

import styles from './styles.module.css';

export const Login = () => {
	const navigate = useNavigate();
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		const [response, error] = await login({
			email,
			password,
		});

		if (response) {
			localStorage.setItem('token', 'test');
			navigate('/courses');
		}

		if (error) {
			console.error(error);
		}
	};

	const handleValueChange = (setFn, event) => {
		setFn(event.target.value);
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				<h1>Login</h1>
				<Input
					onChange={(event) => handleValueChange(setEmail, event)}
					labelText={'Email'}
				></Input>
				<Input
					onChange={(event) => handleValueChange(setPassword, event)}
					labelText={'Password'}
				></Input>
				<Button buttonText='Login'></Button>
			</form>
			<p>
				If you don't have an account you can&nbsp;
				<Link to='/registration'>register</Link>
			</p>
		</div>
	);
};
