import { Button } from '../../../../common';

import styles from './styles.module.css';

export const EmptyCourseList = () => {
	return (
		<div className={styles.noCourses}>
			<h1>Your List Is Empty</h1>
			<p>Please use ’Add New Course’ button to add your first course</p>
			<Button data-testid='addCourse' buttonText={'Add New Course'}></Button>
		</div>
	);
};
