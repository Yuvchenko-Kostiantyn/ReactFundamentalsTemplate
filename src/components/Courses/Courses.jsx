import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from '../../common';
import { CourseCard } from './components';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourses';

import styles from './styles.module.css';

export const Courses = ({ coursesList, authorsList, handleShowCourse }) => {
	const navigate = useNavigate();

	const courseList = coursesList.map((course) => (
		<CourseCard
			course={course}
			authorsList={authorsList}
			key={course.id}
			handleShowCourse={handleShowCourse}
		></CourseCard>
	));

	const onButtonClick = () => {
		navigate('/courses/add');
	};

	return (
		<>
			<div className={styles.panel}>
				<div className={styles.search}>
					<Input placeholderText={'Input text'}></Input>
					<Button buttonText={'Search'}></Button>
				</div>

				{courseList.length ? (
					<Button
						buttonText={'Add New Course'}
						handleClick={onButtonClick}
					></Button>
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
