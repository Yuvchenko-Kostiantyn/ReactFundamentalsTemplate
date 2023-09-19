import React, { BaseSyntheticEvent, useState } from 'react';

import { Button, Input } from '../../../../common';

import styles from './styles.module.css';

type CreateAuthorProps = {
	onCreateAuthor: Function;
};

export const CreateAuthor = ({ onCreateAuthor }: CreateAuthorProps) => {
	const [newAuthor, setNewAuthor] = useState('');

	const onInputChange = (event: BaseSyntheticEvent) => {
		setNewAuthor(event.target.value);
	};

	const handleCreateAuthor = (newAuthorName: string) => {
		const newAuthor = {
			name: newAuthorName,
			id: Math.floor(Math.random() * 1000),
		};

		onCreateAuthor(newAuthor);
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
				handleClick={() => handleCreateAuthor(newAuthor)}
			></Button>
		</div>
	);
};
