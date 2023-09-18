import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Input } from '../../common';
import { login } from '../../services';

import styles from './styles.module.css';

export const Login = () => {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await login({
				name,
				email,
				password,
			});

			localStorage.setItem('token', response.result);
			navigate('/courses');
		} catch (err) {
			console.log(err);
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
					onChange={(event) => handleValueChange(setName, event)}
					labelText={'Name'}
				></Input>
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
				<Link to='/register'>register</Link>
			</p>
		</div>
	);
};
