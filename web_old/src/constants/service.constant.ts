export const BookStatuses = {
	READ: { id: 1, name: 'Read' },
	READING: { id: 2, name: 'Reading' },
	WANT_TO_READ: { id: 3, name: 'Want to read' },
} as const;

export const BookGenres = {
	HORROR: { id: 1, name: 'Horror' },
	ROMANCE: { id: 2, name: 'Romance' },
	HISTORY: { id: 3, name: 'History' },
	FICTION: { id: 4, name: 'Fiction' },
	BIOGRAPHY: { id: 5, name: 'Biography' },
	THRILLER: { id: 6, name: 'Thriller' },
	FANTASY: { id: 7, name: 'Fantasy' },
} as const;

export const MIN_CHARACTERS_SEARCH = 3;
export const DEFAULT_BOOKS_PER_PAGE = 12;

export type BookGenre = keyof typeof BookGenres;
export type BookStatus = keyof typeof BookStatuses;
