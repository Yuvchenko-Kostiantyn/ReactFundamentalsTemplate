import React from 'react';
import { Link } from 'react-router-dom';

import { IAuthor } from '../../../../types/author.interface';
import { ICourse } from '../../../../types/course.interface';

import { Button } from '../../../../common';
import {
	formatCreationDate,
	getCourseDuration,
	mapAuthorNames,
} from '../../../../helpers';

import styles from './styles.module.css';

type CourseCardProps = {
	course: ICourse;
	authorsList: IAuthor[];
	handleShowCourse?: Function;
};

export const CourseCard = ({
	course,
	authorsList,
	handleShowCourse,
}: CourseCardProps) => {
	const courseAuthors = mapAuthorNames(course.authors, authorsList);

	return (
		<div className={styles.cardContainer} data-testid='courseCard'>
			<div className={styles.cardText}>
				<h2>{course?.title}</h2>
				<p>{course?.description}</p>
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
					<Link to={`/courses/${course.id}`}>
						<Button buttonText='Show Course'></Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
