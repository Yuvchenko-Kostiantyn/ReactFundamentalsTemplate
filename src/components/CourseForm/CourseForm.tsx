import React, { BaseSyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IAuthor } from '../../types/author.interface';
import { ICourse } from '../../types/course.interface';

import { Button, Input } from '../../common';
import { getCourseDuration } from '../../helpers';
import { authorsSelector } from '../../store/selectors';
import { coursesSlice } from '../../store/slices/coursesSlice';
import { AuthorItem, CreateAuthor } from './components';

import styles from './styles.module.css';

type CourseFormProps = {
	authorsList?: IAuthor[];
	createCourse?: Function;
	createAuthor?: (author: IAuthor) => void;
};

export const CourseForm = ({
	authorsList,
	createCourse,
	createAuthor,
}: CourseFormProps) => {
	const authors = useSelector(authorsSelector);
	const dispatch = useDispatch();

	const emptyCourse: ICourse = {
		title: '',
		description: '',
		duration: 0,
		creationDate: '',
		authors: [],
	};

	const [course, setCourse] = useState(emptyCourse);
	const courseAuthors = authors.filter((author: IAuthor) =>
		course.authors.includes(author.id || '')
	);

	const availableAuthors = authors.filter(
		(author: IAuthor) => !course.authors.includes(author.id || '')
	);

	const handleSubmit = (event: BaseSyntheticEvent) => {
		event.preventDefault();

		const today = new Date();
		const creationDate = `${today.getDate()}/${
			today.getMonth() + 1
		}/${today.getFullYear()}`;
		const id = `${Math.floor(Math.random() * 1000)}`;

		dispatch(coursesSlice.actions.saveCourse({ ...course, creationDate, id }));
	};

	const onValueInput = (event: BaseSyntheticEvent) => {
		const { name, value } = event.target;
		setCourse((prevState: ICourse) => ({ ...prevState, [name]: value }));
	};

	const addCourseAuthor = (newAuthor: IAuthor) => {
		setCourse((prevState: ICourse): ICourse => {
			return {
				title: prevState.title,
				description: prevState.description,
				duration: prevState.duration,
				creationDate: prevState.creationDate,
				authors: [...prevState.authors, newAuthor.id],
			};
		});
	};

	const removeCourseAuthor = (author: IAuthor) => {
		setCourse((prevState: ICourse): ICourse => {
			return {
				title: prevState.title,
				description: prevState.description,
				duration: prevState.duration,
				creationDate: prevState.creationDate,
				authors: prevState.authors.filter((id: string) => id !== author.id),
			};
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<Input
					name={'title'}
					data-testid='titleInput'
					labelText='Title'
					onChange={onValueInput}
				></Input>
			</div>

			<label>
				Description
				<textarea
					onChange={onValueInput}
					name='description'
					data-testid='descriptionTextArea'
				/>
			</label>

			<div className={styles.infoWrapper}>
				<div>
					<strong>Duration</strong>

					{/*reuse Input component with data-testid='durationInput' for duration field*/}
					<Input
						name={'duration'}
						value={course.duration}
						data-testid='durationInput'
						placeholderText='Duration'
						type={'number'}
						onChange={onValueInput}
					></Input>
					<p>Duration: {getCourseDuration(course.duration)}</p>

					<strong>Authors</strong>
					<CreateAuthor></CreateAuthor>
					<div>
						{availableAuthors.map((author: IAuthor) => (
							<AuthorItem
								addAuthor={addCourseAuthor}
								removeAuthor={() => console.log('Remove Course Author')}
								key={author.id}
								author={author}
							/>
						))}
					</div>
				</div>

				<div className={styles.authorsContainer}>
					{/*use 'map' to display all available authors. Reuse 'AuthorItem' component for each author*/}
					<strong>Course authors</strong>
					{courseAuthors?.map((author: IAuthor) => (
						<AuthorItem
							author={author}
							key={author?.id}
							addAuthor={() => console.log('Add Author')}
							removeAuthor={removeCourseAuthor}
						/>
					))}
					{/* <p data-testid="selectedAuthor"}>{author.name}</p> */}
					{!courseAuthors?.length ? (
						<p className={styles.notification}>List is empty</p>
					) : null}
					{/*display this paragraph if there are no authors in the course*/}
				</div>
			</div>

			<Link to='/courses'>
				<Button buttonText='Cancel'></Button>
			</Link>
			<Button
				data-testid='createCourseButton'
				buttonText='Create Course'
			></Button>
		</form>
	);
};
