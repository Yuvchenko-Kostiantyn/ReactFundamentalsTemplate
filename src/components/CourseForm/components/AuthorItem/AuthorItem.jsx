import React from 'react';

import { Button } from '../../../../common';

import styles from './styles.module.css';

export const AuthorItem = () => (
	<div className={styles.authorItem} data-testid='authorItem'>
		<span>Boris Smith</span>
		<Button buttonText='Add Author' data-testid='addAuthor'></Button>
	</div>
);
