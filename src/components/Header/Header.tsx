import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { UserState } from '../../types/store';

import { Button } from '../../common';
import { useAppDispatch } from '../../store';
import { userSelector } from '../../store/selectors';
import { getUserThunk, logoutThunk } from '../../store/thunks/userThunk';
import { Logo } from './components';

import styles from './styles.module.css';

export const Header = () => {
	const dispatch = useAppDispatch();
	const user: UserState = useSelector(userSelector);

	const onLogout = () => {
		user.token && dispatch(logoutThunk(user.token));
	};

	useEffect(() => {
		if (user.token) {
			console.log('call');
			dispatch(getUserThunk(user.token));
		}
	}, [user.token, dispatch]);

	const buttonAndName = (
		<div className={styles.userContainer}>
			<p className={styles.userName}>{user.name}</p>
			<Button buttonText={'LOGOUT'} handleClick={onLogout}></Button>
		</div>
	);

	return (
		<div className={styles.headerContainer}>
			<Logo></Logo>
			{user.token ? buttonAndName : null}
		</div>
	);
};
