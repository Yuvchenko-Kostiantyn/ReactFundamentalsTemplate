import React, { BaseSyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import { IAuthor } from '../../../../types/author.interface';

import { Button, Input } from '../../../../common';
import { useAppDispatch } from '../../../../store';
import { userSelector } from '../../../../store/selectors';
import { createAuthorThunk } from '../../../../store/thunks/authorsThunk';

import styles from './styles.module.css';

type CreateAuthorProps = {
	onCreateAuthor?: (author: IAuthor) => void;
};

export const CreateAuthor = ({ onCreateAuthor }: CreateAuthorProps) => {
	const user = useSelector(userSelector);
	const [newAuthor, setNewAuthor] = useState('');
	const dispatch = useAppDispatch();

	const onInputChange = (event: BaseSyntheticEvent) => {
		setNewAuthor(event.target.value);
	};

	const handleCreateAuthor = (
		newAuthorName: string,
		event: BaseSyntheticEvent
	) => {
		event.preventDefault();

		dispatch(createAuthorThunk(newAuthorName, user.token));
	};

	return (
		<div className={styles.container}>
			{/*reuse Input component with data-testid="createAuthorInput" attribute*/}
			<Input
				data-testid='createAuthorInput'
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
