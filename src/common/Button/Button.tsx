import React, { MouseEventHandler } from 'react';

import styles from './styles.module.css';

type ButtonProps = {
	buttonText?: string;
	handleClick?: MouseEventHandler;
	dataTestId?: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
};
export const Button = ({
	buttonText,
	handleClick,
	dataTestId,
	type = 'button',
}: ButtonProps) => (
	<button
		type={type}
		className={styles.button}
		onClick={handleClick}
		data-testid={dataTestId}
	>
		{buttonText}
	</button>
);
