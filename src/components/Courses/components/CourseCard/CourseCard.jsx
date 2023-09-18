import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../common';
import {
	formatCreationDate,
	getCourseDuration,
	mapAuthorNames,
} from '../../../../helpers';

import styles from './styles.module.css';

export const CourseCard = ({ course, handleShowCourse, authorsList }) => {
	const navigate = useNavigate();

	const courseAuthors = mapAuthorNames(course.authors, authorsList);

	const onNavigate = (id) => {
		navigate(`/courses/${id}`);
	};

	return (
		<div className={styles.cardContainer} data-testid='courseCard'>
			<div className={styles.cardText}>
				<h2>{course.title}</h2>
				<p>{course.description}</p>
			</div>
			<div className={styles.cardDetails}>
				<p>
					<b>Authors: </b>
					<span>{courseAuthors.join(', ')}</span>
				</p>
				<p>
					<b>Duration: </b>
					<span>{getCourseDuration(course.duration)}</span>
				</p>
				<p>
					<b>Created: </b>
					<span>{formatCreationDate(course.creationDate)}</span>
				</p>
				<div>
					{/* reuse Button component for 'Show course' button // reuse Button*/}
					{/*component for 'Delete' button with data-testid="deleteCourse" // reuse*/}
					{/*Button component for 'Update' button with data-testid="updateCourse"*/}
					<Button
						buttonText='Show Course'
						handleClick={() => onNavigate(course.id)}
					></Button>
				</div>
			</div>
		</div>
	);
};
