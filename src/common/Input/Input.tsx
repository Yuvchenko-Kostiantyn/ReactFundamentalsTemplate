import React, { ChangeEventHandler } from 'react';

import styles from './styles.module.css';

type InputProps = {
	placeholderText?: string;
	labelText?: string;
	onChange?: ChangeEventHandler;
	['data-testid']?: string;
	type?: string;
	name?: string;
	value?: any;
};

export const Input = ({
	placeholderText,
	labelText,
	onChange,
	'data-testid': dataTestId,
	type,
	name,
}: InputProps) => (
	<label className={styles.label}>
		{labelText}
		<input
			name={name}
			type={type}
			className={styles.input}
			onChange={onChange}
			placeholder={placeholderText}
			data-testid={dataTestId}
		/>
	</label>
);
