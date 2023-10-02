import React, { MouseEventHandler } from 'react';

import styles from './styles.module.css';

type ButtonProps = {
	buttonText?: string;
	handleClick?: MouseEventHandler;
	['data-testid']?: string;
};
export const Button = ({
	buttonText,
	handleClick,
	'data-testid': dataTestId,
}: ButtonProps) => (
	<button
		className={styles.button}
		onClick={handleClick}
		data-testid={dataTestId}
	>
		{buttonText}
	</button>
);
