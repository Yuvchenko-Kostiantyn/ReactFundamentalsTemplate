import React from 'react';
import { Link } from 'react-router-dom';

import { IAuthor } from '../../types/author.interface';
import { ICourse } from '../../types/course.interface';

import { Button, Input } from '../../common';
import { CourseCard } from './components';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourses';

import styles from './styles.module.css';

type CoursesProps = {
	coursesList: ICourse[];
	authorsList: IAuthor[];
	handleShowCourse?: Function;
};

export const Courses = ({
	coursesList,
	authorsList,
	handleShowCourse,
}: CoursesProps) => {
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
			<div className={styles.cardsWrapper}>
				{courseList.length ? (
					courseList
				) : (
					<EmptyCourseList data-testid='emptyContainer'></EmptyCourseList>
				)}
			</div>
		</>
	);
};
