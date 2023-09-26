import React, { BaseSyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Input } from '../../common';
import { login } from '../../services';
import { userSlice } from '../../store/slices/userSlice';

import styles from './styles.module.css';

export const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = async (event: BaseSyntheticEvent) => {
		event.preventDefault();
		const response = await login({
			email,
			password,
		});

		if (response) {
			dispatch(userSlice.actions.setUserData(response));
			localStorage.setItem('token', response);
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
				<Button buttonText='Login'></Button>
			</form>
			<p>
				If you don't have an account you can&nbsp;
				<Link to='/registration'>register</Link>
			</p>
		</div>
	);
};
