import { IAuthor } from "./author.interface";
import { ICourse } from "./course.interface";

export type AuthorsState = IAuthor[];

export type CoursesState = ICourse[];

export type UserState = {
	isAuth: boolean;
	name: string;
	email: string;
	token: string | null;
};