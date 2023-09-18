import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from '../../common';
import { AuthorItem, CreateAuthor } from './components';

import styles from './styles.module.css';

export const CourseForm = ({ authorsList, createCourse, createAuthor }) => {
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const onCancel = (event) => {
		event.preventDefault();

		navigate('/courses');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<Input
					className={styles.titleInput}
					data-testid='titleInput'
					labelText='Title'
				></Input>
				<Button
					data-testid='createCourseButton'
					buttonText='Add Course'
				></Button>
			</div>

			<label>
				Description
				<textarea data-testid='descriptionTextArea' />
			</label>

			<div className={styles.infoWrapper}>
				<div>
					<strong>Duration</strong>

					{/*reuse Input component with data-testid='durationInput' for duration field*/}
					<Input data-testid='durationInput' placeholderText='Duration'></Input>
					<p>Duration:</p>

					<strong>Authors</strong>
					<CreateAuthor onCreateAuthor={createAuthor}></CreateAuthor>
				</div>

				<div className={styles.authorsContainer}>
					{/*use 'map' to display all available autors. Reuse 'AuthorItem' component for each author*/}
					<strong>Course authors</strong>
					{authorsList?.map((author) => (
						<AuthorItem key={author} />
					))}
					{/* <p data-testid="selectedAuthor"}>{author.name}</p> */}
					{!authorsList?.length ? (
						<p className={styles.notification}>List is empty</p>
					) : null}
					{/*display this paragraph if there are no authors in the course*/}
				</div>
			</div>

			<Button buttonText='Cancel' handleClick={onCancel}></Button>
			<Button buttonText='Create Course' handleClick={createCourse}></Button>
		</form>
	);
};
