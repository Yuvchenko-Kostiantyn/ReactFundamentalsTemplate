import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IAuthor } from '../../../../types/author.interface';
import { ICourse } from '../../../../types/course.interface';

import { Button } from '../../../../common';
import {
	formatCreationDate,
	getCourseDuration,
	mapAuthorNames,
} from '../../../../helpers';
import { useAppDispatch } from '../../../../store';
import { authorsSelector, userSelector } from '../../../../store/selectors';
import { deleteCourseThunk } from '../../../../store/thunks/coursesThunk';

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
	const dispatch = useAppDispatch();
	const authors = useSelector(authorsSelector);
	const user = useSelector(userSelector);

	const courseAuthors = mapAuthorNames(course.authors, authors);
	const isUserAdmin = user.role === 'admin';

	const deleteCourse = () => {
		course.id && dispatch(deleteCourseThunk(course.id, user.token));
	};

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
					{isUserAdmin ? (
						<div className='adminButtons'>
							<Button
								data-testid='deleteCourse'
								buttonText={'🗑'}
								handleClick={deleteCourse}
							></Button>
							<Link to={`/courses/${course.id}/update`}>
								<Button
									data-testid='updateCourse'
									buttonText={'Update'}
								></Button>
							</Link>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};
