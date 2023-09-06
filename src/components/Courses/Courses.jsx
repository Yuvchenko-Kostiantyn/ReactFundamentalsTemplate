import React from 'react';

import { Button, Input } from '../../common';
import { CourseCard } from './components';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourses';

import styles from './styles.module.css';

export const Courses = ({ coursesList, authorsList, handleShowCourse }) => {
	const mapAuthors = (authorIdArray) => {
		return authorIdArray.map((id) => {
			return authorsList.find((author) => author.id === id).name;
		});
	};

	const courseListWithAuthors = coursesList.map((course) => {
		return {
			...course,
			authors: mapAuthors(course.authors),
		};
	});

	const courseList = courseListWithAuthors.map((course) => (
		<CourseCard course={course} key={course.id}></CourseCard>
	));

	return (
		<>
			<div className={styles.panel}>
				<div className={styles.search}>
					<Input placeholderText={'Input text'}></Input>
					<Button buttonText={'Search'}></Button>
				</div>

				{courseList.length ? (
					<Button buttonText={'Add New Course'}></Button>
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
