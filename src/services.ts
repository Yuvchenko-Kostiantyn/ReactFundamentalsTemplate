import { IApiResponse } from './types/api-response';
import { IAuthor } from './types/author.interface';
import { ICourse } from './types/course.interface';
import { IUser } from './types/user.interface';

const apiUrl = 'http://localhost:4000';

export const createUser = async (data: IUser) => {
	try {
		const response = await fetch(`${apiUrl}/register`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return await response.json();
	} catch (err: any) {
		throw new Error(err);
	}
};

export const login = async (data: IUser): Promise<string> => {
	try {
		const response = await fetch(`${apiUrl}/login`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return await response.json();
	} catch (err: any) {
		throw new Error(err);
	}
};

export const getCourses = async (): Promise<IApiResponse<ICourse[]>> => {
	try {
		const response = await fetch(`${apiUrl}/courses/all`);
		return await response.json();
	} catch (err: any) {
		throw new Error(err);
	}
};

export const getAuthors = async (): Promise<IApiResponse<IAuthor[]>> => {
	try {
		const response = await fetch(`${apiUrl}/authors/all`);
		return await response.json();
	} catch (err: any) {
		throw new Error(err);
	}
};

export const getCurrentUser = async () => {
	// write your code here
};

export const updateCourse = async () => {
	// write your code here
};

export const logout = async () => {
	// write your code here
};

export const deleteCourse = async () => {
	// write your code here
};

export const createCourse = async () => {
	// write your code here
};

export const createAuthor = async (name: string) => {
	try {
		const response = await fetch(`${apiUrl}/authors/add`, {
			method: 'POST',
			body: JSON.stringify({ name }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return await response.json();
	} catch (err: any) {
		throw new Error(err);
	}
};
