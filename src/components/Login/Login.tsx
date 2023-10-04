import React, { BaseSyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Input } from '../../common';
import { login } from '../../services';
import { useAppDispatch } from '../../store';
import { getUserThunk } from '../../store/thunks/userThunk';

import styles from './styles.module.css';

export const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = async (event: BaseSyntheticEvent) => {
		event.preventDefault();
		const response = await login({
			email,
			password,
		});

		if (response.successful) {
			console.log('login successful');
			localStorage.setItem('token', response.result);
			dispatch(getUserThunk(response.result));
			navigate('/courses');
		}
	};

	const handleValueChange = (
		setFn: React.Dispatch<React.SetStateAction<string>>,
		event: BaseSyntheticEvent
	) => {
		setFn(event.target.value);
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				<h1>Login</h1>
				<Input
					type={'email'}
					onChange={(event) => handleValueChange(setEmail, event)}
					labelText={'Email'}
				></Input>
				<Input
					type={'password'}
					onChange={(event) => handleValueChange(setPassword, event)}
					labelText={'Password'}
				></Input>
				<Button buttonText='LOGIN'></Button>
			</form>
			<p>
				If you don't have an account you can&nbsp;
				<Link to='/registration'>Registration</Link>
			</p>
		</div>
	);
};
