import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserState } from '../../types/store';

import { Button } from '../../common';
import { userSelector } from '../../store/selectors';
import { userSlice } from '../../store/slices/userSlice';
import { Logo } from './components';

import styles from './styles.module.css';

export const Header = () => {
	const dispatch = useDispatch();
	const userData: UserState = useSelector(userSelector);

	const onLogout = () => {
		localStorage.removeItem('token');
		dispatch(userSlice.actions.removeUserData());
	};

	const buttonAndName = (
		<div className={styles.userContainer}>
			<p className={styles.userName}>{userData.name}</p>
			<Button buttonText={'LOGOUT'} handleClick={onLogout}></Button>
		</div>
	);

	return (
		<div className={styles.headerContainer}>
			<Logo></Logo>
			{userData.token ? buttonAndName : null}
		</div>
	);
};
