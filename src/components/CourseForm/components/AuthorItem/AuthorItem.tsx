import React from 'react';

import { IAuthor } from '../../../../types/author.interface';

import { Button } from '../../../../common';

import styles from './styles.module.css';

type AuthorItemProps = {
	author: IAuthor;
	addAuthor: Function;
	removeAuthor: Function;
};

export const AuthorItem = ({
	author,
	addAuthor,
	removeAuthor,
}: AuthorItemProps) => (
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
