import { formatCreationDate } from '../formatCreationDate';

describe('formatCreationDate', () => {
	it('should return date separated by dots', () => {
		const date = '10/10/2023';
		const expected = '10.10.2023';
		expect(formatCreationDate(date)).toEqual(expected);
	});
});
