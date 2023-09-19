import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Input } from '../../common';
import { getCourseDuration } from '../../helpers';
import { AuthorItem, CreateAuthor } from './components';

import styles from './styles.module.css';

export const CourseForm = ({ authorsList, createCourse, createAuthor }) => {
	const emptyCourse = {
		title: '',
		description: '',
		duration: 0,
		creationDate: '',
		authors: [],
	};

	const [course, setCourse] = useState(emptyCourse);
	const [courseAuthors, setCourseAuthors] = useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const today = new Date();
		const creationDate = `${today.getDate()}/${
			today.getMonth() + 1
		}/${today.getFullYear()}`;
		createCourse({ ...course, creationDate });
	};

	const onValueInput = (event) => {
		const { name, value } = event.target;
		setCourse((prevState) => ({ ...prevState, [name]: value }));
	};

	const addCourseAuthor = (newAuthor) => {
		const isAlreadyInTheList = course.authors.find(
			(author) => newAuthor.id === author.id
		);

		if (!isAlreadyInTheList) {
			setCourse((prevState) => {
				return {
					title: prevState.title,
					description: prevState.description,
					duration: prevState.duration,
					creationDate: prevState.creationDate,
					authors: [...prevState.authors, newAuthor.id],
				};
			});

			setCourseAuthors(() => {
				return authorsList.filter((author) =>
					course.authors.find((id) => author.id === id)
				);
			});
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<Input
					className={styles.titleInput}
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
					<CreateAuthor onCreateAuthor={createAuthor}></CreateAuthor>
					<div>
						{authorsList.map((author) => (
							<AuthorItem
								addAuthor={addCourseAuthor}
								key={author.id}
								author={author}
							/>
						))}
					</div>
				</div>

				<div className={styles.authorsContainer}>
					{/*use 'map' to display all available authors. Reuse 'AuthorItem' component for each author*/}
					<strong>Course authors</strong>
					{courseAuthors?.map((author) => (
						<AuthorItem author={author} key={author?.id} />
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
			<Button buttonText='Create Course'></Button>
		</form>
	);
};
