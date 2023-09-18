import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../common';
import { Logo } from './components';

import styles from './styles.module.css';

export const Header = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const onLogout = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	const buttonAndName = (
		<div className={styles.userContainer}>
			<p className={styles.userName}>Boris</p>
			<Button buttonText={'LOGOUT'} handleClick={onLogout}></Button>
		</div>
	);

	return (
		<div className={styles.headerContainer}>
			<Logo></Logo>
			{token ? buttonAndName : null}
		</div>
	);
};
