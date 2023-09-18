import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Input } from '../../common';
import { CourseCard } from './components';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourses';

import styles from './styles.module.css';

export const Courses = ({ coursesList, authorsList, handleShowCourse }) => {
	const courseList = coursesList.map((course) => (
		<CourseCard
			course={course}
			authorsList={authorsList}
			key={course.id}
			handleShowCourse={handleShowCourse}
		></CourseCard>
	));

	return (
		<>
			<div className={styles.panel}>
				<div className={styles.search}>
					<Input placeholderText={'Input text'}></Input>
					<Button buttonText={'Search'}></Button>
				</div>

				{courseList.length ? (
					<Link to='/courses/add'>
						<Button buttonText={'Add New Course'}></Button>
					</Link>
				) : null}
			</div>
			{courseList.length ? (
				courseList
			) : (
				<EmptyCourseList data-testid='emptyContainer'></EmptyCourseList>
			)}
		</>
	);
};
