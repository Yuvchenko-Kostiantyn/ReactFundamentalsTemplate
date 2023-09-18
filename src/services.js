const apiUrl = 'http://localhost:4000';

export const createUser = async (data) => {
	const response = await fetch(`${apiUrl}/register`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return await response.json();
};

export const login = async (data) => {
	try {
		const response = await fetch(`${apiUrl}/login`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const parsedResponse = await response.json();

		return [parsedResponse, null];
	} catch (err) {
		return [null, err];
	}
};

export const getCourses = async () => {};

export const getAuthors = async () => {};

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

export const createAuthor = async () => {
	// write your code here
};
