import React from 'react';

import { Button } from '../../common';
import { Logo } from './components';

import styles from './styles.module.css';

export const Header = () => {
	return (
		<div className={styles.headerContainer}>
			<Logo></Logo>
			<div className={styles.userContainer}>
				<p className={styles.userName}>Boris</p>
				<Button buttonText={'LOGOUT'}></Button>
			</div>
		</div>
	);
};
