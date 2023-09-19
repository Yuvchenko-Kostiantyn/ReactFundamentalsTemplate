import React from 'react';

import { Button } from '../../../../common';

import styles from './styles.module.css';

export const AuthorItem = ({ author, addAuthor, removeAuthor }) => (
	<div className={styles.authorItem} data-testid='authorItem'>
		<span>{author?.name}</span>
		<Button
			type={'button'}
			buttonText='+'
			handleClick={() => addAuthor(author)}
			data-testid='addAuthor'
		></Button>
		<Button
			buttonText='🗑'
			handleClick={() => removeAuthor(author)}
			data-testid='removeAuthor'
		></Button>
	</div>
);
