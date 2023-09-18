import React from 'react';

import { Button, Input } from '../../common';
import { AuthorItem, CreateAuthor } from './components';

import styles from './styles.module.css';

export const CourseForm = ({ authorsList, createCourse, createAuthor }) => {
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<Input data-testid='titleInput' labelText='Title'></Input>
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
				</div>

				<CreateAuthor></CreateAuthor>

				<div className={styles.authorsContainer}>
					<strong>Authors</strong>
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
		</form>
	);
};
