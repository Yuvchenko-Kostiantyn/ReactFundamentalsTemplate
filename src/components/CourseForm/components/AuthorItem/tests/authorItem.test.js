import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../../../../../helpers/test';
import { AuthorItem } from '../AuthorItem';

describe('Author Item', () => {
	const mockAddAuthor = jest.fn();
	const mockRemoveAuthor = jest.fn();

	const mockAuthorData = {
		id: 10,
		name: 'Test Author',
	};
	beforeEach(() => {
		jest.clearAllMocks();
		renderWithProviders(
			<AuthorItem
				author={mockAuthorData}
				addAuthor={mockAddAuthor}
				removeAuthor={mockRemoveAuthor}
			/>
		);
	});

	it('should render author name', () => {
		const authorName = screen.getByText(mockAuthorData.name);
		expect(authorName).toBeInTheDocument();
	});

	it('should call the addAuthor method on appropriate button click', () => {
		const addAuthorButton = screen.getByTestId('addAuthor');
		fireEvent.click(addAuthorButton);
		expect(mockAddAuthor).toHaveBeenCalledWith(mockAuthorData);
	});

	it('should call the removeAuthor method on appropriate button click', () => {
		const removeAuthorButton = screen.getByTestId('removeAuthor');
		fireEvent.click(removeAuthorButton);
		expect(mockRemoveAuthor).toHaveBeenCalledWith(mockAuthorData);
	});
});
