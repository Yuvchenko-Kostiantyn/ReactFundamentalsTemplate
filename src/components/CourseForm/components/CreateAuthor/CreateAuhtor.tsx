import React, { BaseSyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IAuthor } from '../../../../types/author.interface';

import { Button, Input } from '../../../../common';
import { authorsSlice } from '../../../../store/slices/authorsSlice';

import styles from './styles.module.css';

type CreateAuthorProps = {
	onCreateAuthor?: (author: IAuthor) => void;
};

export const CreateAuthor = ({ onCreateAuthor }: CreateAuthorProps) => {
	const [newAuthor, setNewAuthor] = useState('');
	const dispatch = useDispatch();

	const onInputChange = (event: BaseSyntheticEvent) => {
		setNewAuthor(event.target.value);
	};

	const handleCreateAuthor = (
		newAuthorName: string,
		event: BaseSyntheticEvent
	) => {
		event.preventDefault();

		const newAuthor = {
			name: newAuthorName,
			id: `${Math.floor(Math.random() * 1000)}`,
		};

		dispatch(authorsSlice.actions.saveAuthor(newAuthor));
	};

	return (
		<div className={styles.container}>
			{/*reuse Input component with data-testid="createAuthorInput" attribute*/}
			<Input
				data-testid='CreateAuthorInput'
				labelText='Author Name'
				value={newAuthor}
				onChange={onInputChange}
			></Input>
			{/*reuse Button component with data-testid="createAuthorButton" attribute*/}
			<Button
				data-testid='createAuthorButton'
				buttonText='Create Author'
				handleClick={(event) => handleCreateAuthor(newAuthor, event)}
			></Button>
		</div>
	);
};
