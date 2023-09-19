import React, { BaseSyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Input } from '../../common';
import { createUser } from '../../services';

import styles from './styles.module.css';

export const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event: BaseSyntheticEvent) => {
		event.preventDefault();

		await createUser({
			name,
			email,
			password,
		});
	};

	const handleValueChange = (
		setFn: React.Dispatch<any>,
		event: BaseSyntheticEvent
	) => {
		setFn(event.target.value);
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				<h1>Registration</h1>
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

				<Button buttonText={'Login'}></Button>
			</form>
			<p>
				If you have an account you can&nbsp;
				<Link to='/login'>log in</Link>
			</p>
		</div>
	);
};
