import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export interface IBook {
	id?: string;
	title: string;
	author: string;
	year?: number;
	genre?: string;
	status?: string | null;
	average_rating?: number;
}

export const getBooks = async (search: string, page: number, limit: number): Promise<{data: IBook[], total: number, page: number, limit: number}> => {
	const response: AxiosResponse<{ data: IBook[], total: number, page: number, limit: number }> = await apiClient.get('/books', {
		params: {
			search,
			page,
			limit,
		},
	});

	return {
		data: response.data.data,
		total: response.data.total,
		page: response.data.page,
		limit: response.data.limit,
	};
};

export const getBookById = async (id: string): Promise<IBook> => {
	const response = await apiClient.get<IBook>(`/books/${id}`);
	return response.data;
};

export const createBook = async (book: Partial<IBook>): Promise<IBook> => {
	const response = await apiClient.post<IBook>('/books', book);
	return response.data;
};

export const updateBook = async (id: string, IBook: Partial<IBook>): Promise<IBook> => {
	const response = await apiClient.patch<IBook>(`/books/${id}`, IBook);
	return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
	await apiClient.delete(`/books/${id}`);
};
