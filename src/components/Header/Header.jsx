import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../common';
import { Logo } from './components';

import styles from './styles.module.css';

export const Header = () => {
	const navigate = useNavigate();
	const [token, setToken] = useState('');

	const onLogout = () => {
		localStorage.removeItem('token');
		setToken('');
	};

	const onLoginButtonClick = () => {
		navigate('/login');
	};

	useEffect(() => {
		console.log('effect');
		setToken(localStorage.getItem('token'));
	});

	const buttonAndName = (
		<div className={styles.userContainer}>
			<p className={styles.userName}>Boris</p>
			<Button buttonText={'LOGOUT'} handleClick={onLogout}></Button>
		</div>
	);

	const loginButton = (
		<Button buttonText='LOGIN' handleClick={onLoginButtonClick}></Button>
	);

	return (
		<div className={styles.headerContainer}>
			<Logo></Logo>
			{token ? buttonAndName : loginButton}
		</div>
	);
};
