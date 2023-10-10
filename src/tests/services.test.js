import {
	createAuthor,
	createCourse,
	createUser,
	deleteCourse,
	getAuthors,
	getCourses,
	getCurrentUser,
	login,
	logout,
	updateCourse,
} from '../services';

describe('Services', () => {
	beforeEach(() => {
		jest.spyOn(window, 'fetch').mockReturnValue(
			Promise.resolve({
				json: () => Promise.resolve({ data: 'Success' }),
			})
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should send user creation request', async () => {
		const mockUser = { email: 'email', password: 'password' };
		const response = await createUser(mockUser);

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('http://localhost:4000/register', {
			body: JSON.stringify(mockUser),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});

		expect(response).toEqual({ data: 'Success' });
	});

	it('should send a login request', async () => {
		const mockUser = { email: 'email', password: 'password' };
		const response = await login(mockUser);

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('http://localhost:4000/login', {
			body: JSON.stringify(mockUser),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});
		expect(response).toEqual({ data: 'Success' });
	});

	it('should request list of courses from the API', async () => {
		const response = await getCourses();
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('http://localhost:4000/courses/all', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		expect(response).toEqual({ data: 'Success' });
	});

	it('should request list of authors from the API', async () => {
		const response = await getAuthors();
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('http://localhost:4000/authors/all', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		expect(response).toEqual({ data: 'Success' });
	});

	it('should request user data from API', async () => {
		const response = await getCurrentUser('token');
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('http://localhost:4000/users/me', {
			method: 'GET',
			headers: { Authorization: 'token' },
		});
		expect(response).toEqual({ data: 'Success' });
	});

	it('should send a request with course updates', async () => {
		const mockCourse = { id: '10', title: 'test' };
		const response = await updateCourse(mockCourse, 'token');

		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith(
			`http://localhost:4000/courses/${mockCourse.id}`,
			{
				body: JSON.stringify(mockCourse),
				headers: { Authorization: 'token' },
				method: 'POST',
			}
		);
		expect(response).toEqual({ data: 'Success' });
	});

	it('should send a logout request', async () => {
		await logout('token');
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('http://localhost:4000/logout', {
			method: 'DELETE',
			headers: { Authorization: 'token' },
		});
	});

	it('should send a course deletion request', async () => {
		await deleteCourse('10', 'token');
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('http://localhost:4000/courses/10', {
			method: 'DELETE',
			headers: { Authorization: 'token' },
		});
	});

	it('should send a course creation request', async () => {
		const newCourse = { id: '10', title: 'New Course' };
		const response = await createCourse(newCourse, 'token');
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('http://localhost:4000/courses/add', {
			method: 'POST',
			body: JSON.stringify(newCourse),
			headers: { Authorization: 'token', 'Content-Type': 'application/json' },
		});
		expect(response).toEqual({ data: 'Success' });
	});

	it('should send an author creation request', async () => {
		const name = 'New Author';
		const response = await createAuthor(name, 'token');
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('http://localhost:4000/authors/add', {
			method: 'POST',
			body: JSON.stringify({ name }),
			headers: { Authorization: 'token', 'Content-Type': 'application/json' },
		});
		expect(response).toEqual({ data: 'Success' });
	});

	describe('When API rejects', () => {
		beforeEach(() => {
			jest.clearAllMocks();
			jest.spyOn(window, 'fetch').mockRejectedValue(new Error('Test Error'));
		});

		it('should throw on user creation request', async () => {
			const mockUser = { email: 'email', password: 'password' };
			await expect(createUser(mockUser)).rejects.toThrow('Test Error');
		});

		it('should throw on login request', async () => {
			const mockUser = { email: 'email', password: 'password' };
			await expect(login(mockUser)).rejects.toThrow('Test Error');
		});

		it('should throw on all courses request', async () => {
			await expect(getCourses()).rejects.toThrow('Test Error');
		});

		it('should throw on all authors request', async () => {
			await expect(getAuthors()).rejects.toThrow('Test Error');
		});

		it('should throw on current user request', async () => {
			await expect(getCurrentUser()).rejects.toThrow('Test Error');
		});

		it('should throw on course update request', async () => {
			const mockCourse = { id: '10', title: 'test' };
			await expect(updateCourse(mockCourse, 'token')).rejects.toThrow(
				'Test Error'
			);
		});

		it('should throw on logout request', async () => {
			await expect(logout('token')).rejects.toThrow('Test Error');
		});

		it('should throw on delete course request', async () => {
			await expect(deleteCourse('token')).rejects.toThrow('Test Error');
		});

		it('should throw on course creation request', async () => {
			const mockCourse = { id: '10', title: 'test' };
			await expect(createCourse(mockCourse, 'token')).rejects.toThrow(
				'Test Error'
			);
		});

		it('should throw on author creation request', async () => {
			await expect(createAuthor('Test Name', 'token')).rejects.toThrow(
				'Test Error'
			);
		});
	});
});
