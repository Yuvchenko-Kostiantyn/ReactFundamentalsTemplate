import React, { ComponentProps } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { UserState } from '../../types/store';

import { userSelector } from '../../store/selectors';

export const PrivateRoute = ({ children }: ComponentProps<any>) => {
	const user: UserState = useSelector(userSelector);

	return user.role === 'admin' ? children : <Navigate to='/courses' />;
};
