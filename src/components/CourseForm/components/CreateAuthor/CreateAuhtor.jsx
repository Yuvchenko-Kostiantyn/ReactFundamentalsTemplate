import React from 'react';

import { Button, Input } from '../../../../common';

import styles from './styles.module.css';

export const CreateAuthor = ({ onCreateAuthor }) => {
	return (
		<div className={styles.container}>
			{/*reuse Input component with data-testid="createAuthorInput" attribute*/}
			<Input data-testid='CreateAuthorInput' labelText='Author Name'></Input>
			{/*reuse Button component with data-testid="createAuthorButton" attribute*/}
			<Button
				data-testid='createAuthorButton'
				buttonText='Create Author'
				handleClick={onCreateAuthor}
			></Button>
		</div>
	);
};
