import { getCourseDuration } from '../getCourseDuration';

describe('Get Course Duration', () => {
	it('should return course with proper suffix if the amount of hours is singular', () => {
		const duration = getCourseDuration(100);
		const expected = '01:40 hour';
		expect(duration).toEqual(expected);
	});

	it('should return course with proper suffix if the amount of hours is plural', () => {
		const duration = getCourseDuration(600);
		const expected = '10:00 hours';
		expect(duration).toEqual(expected);
	});
});
