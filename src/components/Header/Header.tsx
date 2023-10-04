import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { UserState } from '../../types/store';

import { Button } from '../../common';
import { useAppDispatch } from '../../store';
import { userSelector } from '../../store/selectors';
import { logoutThunk } from '../../store/thunks/userThunk';
import { Logo } from './components';

import styles from './styles.module.css';

export const Header = () => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const user: UserState = useSelector(userSelector);
	const isLoginOrLogoutPage =
		pathname === '/login' || pathname === '/registration';

	const onLogout = () => {
		dispatch(logoutThunk(user.token || ''));
	};

	const buttonAndName = (
		<div className={styles.userContainer}>
			<p className={styles.userName}>{user.name}</p>
			<Button buttonText={'LOGOUT'} handleClick={onLogout}></Button>
		</div>
	);

	const loginButton = (
		<Link to='/login'>
			<Button buttonText='LOGIN'></Button>
		</Link>
	);

	return (
		<div className={styles.headerContainer}>
			<Logo></Logo>
			{!isLoginOrLogoutPage ? (
				<div>{user.token ? buttonAndName : loginButton}</div>
			) : null}
		</div>
	);
};
