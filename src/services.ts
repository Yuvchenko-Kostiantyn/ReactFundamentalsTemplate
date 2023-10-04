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

export const login = async (data: IUser): Promise<any> => {
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
		const response = await fetch(`${apiUrl}/courses/all`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return await response.json();
	} catch (err: any) {
		throw new Error(err);
	}
};

export const getAuthors = async (): Promise<IApiResponse<IAuthor[]>> => {
	try {
		const response = await fetch(`${apiUrl}/authors/all`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return await response.json();
	} catch (err: any) {
		throw new Error(err);
	}
};

export const getCurrentUser = async (token: string) => {
	try {
		const userData = await fetch(`${apiUrl}/users/me`, {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		});

		return userData?.json();
	} catch (err) {
		console.error(err);
	}
};

export const updateCourse = async (
	courseData: Partial<ICourse>,
	token: string
) => {
	try {
		await fetch(`${apiUrl}/logout`, {
			method: 'POST',
			body: JSON.stringify(courseData),
			headers: {
				Authorization: token,
			},
		});
	} catch (err) {
		console.error(err);
	}
};

export const logout = async (token: string) => {
	try {
		await fetch(`${apiUrl}/logout`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});
	} catch (err) {
		console.error(err);
	}
};

export const deleteCourse = async (courseId: string, token: string) => {
	try {
		await fetch(`${apiUrl}/courses/${courseId}`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});
	} catch (err) {
		console.error(err);
	}
};

export const createCourse = async (
	course: ICourse,
	token: string
): Promise<any> => {
	try {
		const response = await fetch(`${apiUrl}/courses/add`, {
			method: 'POST',
			body: JSON.stringify(course),
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});

		return await response.json();
	} catch (err) {
		console.error(err);
	}
};

export const createAuthor = async (
	name: string
): Promise<IApiResponse<any>> => {
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
