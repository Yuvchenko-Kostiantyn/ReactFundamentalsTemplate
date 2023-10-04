import React, { ComponentProps } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { userRoleSelector } from '../../store/selectors';

export const PrivateRoute = ({ children }: ComponentProps<any>) => {
	const userRole: string = useSelector(userRoleSelector);

	return userRole === 'admin' ? children : <Navigate to='/courses' />;
};
