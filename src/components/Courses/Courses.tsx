import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IAuthor } from '../../types/author.interface';
import { ICourse } from '../../types/course.interface';
import { AuthorsState, CoursesState } from '../../types/store';

import { Button, Input } from '../../common';
import { authorsSelector, coursesSelector } from '../../store/selectors';
import { CourseCard } from './components';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourses';

import styles from './styles.module.css';

type CoursesProps = {
	coursesList?: ICourse[];
	authorsList?: IAuthor[];
	handleShowCourse?: Function;
};

export const Courses = ({
	coursesList,
	authorsList,
	handleShowCourse,
}: CoursesProps) => {
	const courses: CoursesState = useSelector(coursesSelector);
	const authors: AuthorsState = useSelector(authorsSelector);

	const courseList = courses.map((course) => (
		<CourseCard
			course={course}
			authorsList={authors}
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

				<Link to='/courses/add'>
					<Button buttonText={'Add New Course'}></Button>
				</Link>
			</div>
			<div className={styles.cardsWrapper}>
				{courses.length ? (
					courseList
				) : (
					<EmptyCourseList data-testid='emptyContainer'></EmptyCourseList>
				)}
			</div>
		</>
	);
};
