import React, { useState } from 'react';

import { Button, Input } from '../../../../common';

import styles from './styles.module.css';

export const CreateAuthor = ({ onCreateAuthor }) => {
	const [newAuthor, setNewAuthor] = useState('');

	const onInputChange = (event) => {
		setNewAuthor(event.target.value);
	};

	const handleCreateAuthor = (newAuthorName) => {
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
				data-testid='createAuthorInput'
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
