import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '../../common';
import {
	formatCreationDate,
	getCourseDuration,
	mapAuthorNames,
} from '../../helpers';

import styles from './styles.module.css';

export const CourseInfo = ({
	coursesList,
	authorsList,
	onBack,
	showCourseId,
}) => {
	const { courseId } = useParams();
	const course = coursesList.find((course) => {
		return course.id === courseId;
	});

	const courseAuthors = mapAuthorNames(course?.authors, authorsList);

	return (
		<div className={styles.courseWrapper} data-testid='courseInfo'>
			{/* Module 1: reuse Button component for 'onBack' functionality // Module*/}
			{/*2: use 'react-router-dom' 'Link' component for button 'Back'*/}
			<h1>{course.title}</h1>
			<div className={styles.courseInfo}>
				<p className={styles.description}>{course?.description}</p>
				<div>
					<p>
						<b>ID: </b>
						{course?.id}
					</p>
					<p>
						<b>Duration: </b>
						{getCourseDuration(course?.duration)}
					</p>
					<p>
						<b>Created: </b>
						{formatCreationDate(course?.creationDate)}
					</p>
					<div>
						<b>Authors: </b>
						<ul className={styles.authorsList}>
							{courseAuthors.map((authorName) => (
								<li key={authorName}>{authorName}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<Link to='/courses'>
				<Button buttonText='Back'></Button>
			</Link>
		</div>
	);
};
