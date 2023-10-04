import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserState } from '../../../../types/store';

import { Button } from '../../../../common';
import { userSelector } from '../../../../store/selectors';

import styles from './styles.module.css';

export const EmptyCourseList = () => {
	const user: UserState = useSelector(userSelector);
	const isAdmin = user.role === 'admin';

	const textMessage = isAdmin
		? 'Please use ’Add New Course’ button to add your first course'
		: `You don't have permissions to create a course. Please log in as ADMIN`;

	return (
		<div className={styles.noCourses}>
			<h1>Your List Is Empty</h1>
			<p>{textMessage}</p>
			<Link to={isAdmin ? '/courses/add' : '/login'}>
				<Button data-testid='addCourse' buttonText={'Add New Course'}></Button>
			</Link>
		</div>
	);
};
