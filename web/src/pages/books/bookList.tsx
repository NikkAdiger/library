"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from 'lucide-react';
import { createBook, deleteBook, getBooks, IBook, updateBook } from "../../services/bookService";
import { toast } from "react-toastify";
import {
	BookStatuses,
	BookGenres,
	MIN_CHARACTERS_SEARCH,
	DEFAULT_BOOKS_PER_PAGE
} from "../../constants/service.constant";
import BookAddModal from "../../components/modals/BookAddModal";
import BookEditModal from "../../components/modals/BookEditModal";
import BookDeleteModal from "../../components/modals/BookDeleteModal";
import ErrorModal from "../../components/modals/ErrorModal";

const BookList = () => {
	const [books, setBooks] = useState<IBook[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [showBookEditModal, setShowBookEditModal] = useState(false);
	const [showBookDeleteModal, setShowBookDeleteModal] = useState(false);
	const [showBookAddModal, setShowBookAddModal] = useState(false);
	const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

	/**
   * Pagination Fields
   */
	const [pagination, setPagination] = useState({
		page: 1,
		limit: DEFAULT_BOOKS_PER_PAGE,
		total: 0,
		totalNumberOfPages: 0,
	});

	/**
	 * Search Fields
	 */
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

	useEffect(() => {
		fetchBooks();
	}, [pagination.page, pagination.limit]);

	useEffect(() => {
		const handler = setTimeout(() => {
		  	setDebouncedSearchQuery(searchQuery);
		}, 300);

		return () => clearTimeout(handler);
	}, [searchQuery, pagination.page, pagination.limit]);

	useEffect(() => {
		if (debouncedSearchQuery.length >= MIN_CHARACTERS_SEARCH) {
		  	fetchBooks(debouncedSearchQuery);
		} else {
			fetchBooks('');
		}
	}, [debouncedSearchQuery]);

	const fetchBooks = async (search: string = '') => {
		try {
			setLoading(true);
			setError(null);
			const booksData = await getBooks(search, pagination.page, pagination.limit);
			setBooks(booksData.data);
			setPagination((prevState) => ({
				...prevState,
				total: booksData.total,
				totalNumberOfPages: Math.ceil(booksData.total / pagination.limit),
			}));
		} catch (error) {
			setError('Failed to load books.');
			toast.error('Failed to load books.');
			setShowErrorModal(true);
		} finally {
			setLoading(false);
		}
	};

	const handlePageChange = (page: number) => {
		setPagination((prevState) => ({
			...prevState,
			page,
		}));
	};

	const handleEditBook = (book: IBook) => {
		setSelectedBook(book);
		setShowBookEditModal(true);
	};

	const handleSave = async (updatedBook: IBook) => {
		try {
			if (updatedBook.id) {
				const book = await updateBook(updatedBook.id, updatedBook);
				fetchBooks();
				toast.success(`Book ${book.id} updated successfully`);
			} else {
				throw new Error('Book ID is undefined');
			}
		} catch (error) {
			setError(`Error updating book: ${updatedBook.id}`);
			toast.error('Failed updating book.');
			setShowErrorModal(true);
		} finally {
			setShowBookEditModal(false);
		}
	};

	const handleCreate = async (newBook: IBook) => {
		try {
			const book = await createBook(newBook);
			fetchBooks();
			toast.success(`Book ${book.id} created successfully`);
		} catch (error) {
			setError(`Error creating book: ${newBook.title}`);
			toast.error('Failed creating book.');
			setShowErrorModal(true);
		} finally {
			setShowBookAddModal(false);
		}
	};

	const handleDeleteBook = async (id: string) => {
		try {
			await deleteBook(id);
			fetchBooks();
			toast.success(`Book ${id} deleted successfully`);
		} catch (error) {
			setError(`Error deleting book: ${id}`);
			toast.error('Failed deleting book.');
			setShowErrorModal(true);
		} finally {
			setShowBookDeleteModal(false);
		}
	};

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
	};

	const handleCloseError = () => {
		setError(null);
		setShowErrorModal(false);
	};

	return (
		<div>
			<div className="d-flex align-items-center justify-content-between mb-3">
				<h1 className="fs-4 mb-0">Books</h1>
				<div className="d-flex align-items-center">
					<input
						type="text"
						className="form-control me-3"
						placeholder="Search..."
						aria-label="Search"
						value={searchQuery}
						onChange={(e) => handleSearchChange(e.target.value)}
					/>
					<button
						className="btn fixed-width btn-primary"
						onClick={() => {
							setSelectedBook({ title: '', author: '', year: 0, genre: '', status: '' });
							setShowBookAddModal(true);
						}}
					>
						{`Add Book`}
					</button>
				</div>
			</div>
			{loading ? (
				<div className="text-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : (
				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
					{books.map((book: IBook) => (
						<div key={book.id} className="col">
						<div className="card h-100">
							<div className="card-body">
							<div className="d-flex justify-content-between align-items-start">
							<h5 className="card-title text-truncate" title={book.title}>
								{book.title}
							</h5>
								<div className="btn-group">
								<button
									className="btn btn-sm btn-outline-primary"
									onClick={() => handleEditBook(book)}
								>
									<Pencil size={16} />
								</button>
								<button
									className="btn btn-sm btn-outline-danger no-border-left"
									onClick={() => {
										setSelectedBook(book);
										setShowBookDeleteModal(true);
									}}
								>
									<Trash2 size={16} />
								</button>
								</div>
							</div>
							<h6 className="card-subtitle mb-2 mt-2 text-muted text-truncate" title={book.title}>
								{book.author}
							</h6>
							<div className="mb-2  mt-2">
								<p className="card-text card-subtitle mb-3 text-muted">
									<span
										className={`badge ${BookStatuses[book.status?.toUpperCase() as keyof typeof BookStatuses] ? 'bg-success' : 'bg-secondary'} me-2`}
									>
										{BookStatuses[book.status?.toUpperCase() as keyof typeof BookStatuses]?.name || 'No Status'}
									</span>
									<span
										className={`badge ${BookGenres[book.genre?.toUpperCase() as keyof typeof BookGenres] ? 'bg-primary' : 'bg-secondary'} me-2`}
									>
										{BookGenres[book.genre?.toUpperCase() as keyof typeof BookGenres]?.name || 'No Genre'}
									</span>
								</p>
							</div>
							<p className="card-text">
								<small className="text-muted">Year: {book.year}</small>
							</p>
							</div>
						</div>
						</div>
					))}
				</div>
      			)}

			<nav className="mt-4">
				<ul className="pagination justify-content-center">
				<li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
					<button
						className="page-link"
						onClick={() => handlePageChange(pagination.page - 1)}
					>
					&laquo;
					</button>
				</li>
				{[...Array(pagination.totalNumberOfPages)].map((_, idx) => (
					<li key={idx} className={`page-item ${pagination.page === idx + 1 ? 'active' : ''}`}>
					<button
						className="page-link"
						onClick={() => handlePageChange(idx + 1)}
					>
						{idx + 1}
					</button>
					</li>
				))}
				<li className={`page-item ${pagination.page === pagination.totalNumberOfPages ? 'disabled' : ''}`}>
					<button
						className="page-link"
						onClick={() => handlePageChange(pagination.page + 1)}
					>
					&raquo;
					</button>
				</li>
				</ul>
      		</nav>

			<BookAddModal
				show={showBookAddModal}
				onClose={() => setShowBookAddModal(false)}
				onCreate={handleCreate}
			/>

			<BookEditModal
				show={showBookEditModal}
				book={selectedBook as IBook}
				onClose={() => setShowBookEditModal(false)}
				onSave={handleSave}
			/>

			<BookDeleteModal
				show={showBookDeleteModal}
				book={selectedBook as IBook}
				onClose={() => setShowBookDeleteModal(false)}
				onConfirm={() => selectedBook?.id && handleDeleteBook(selectedBook.id)}
			/>

			<ErrorModal
				show={showErrorModal}
				message={error || ''}
				onClose={handleCloseError}
			/>
		</div>
	);
};

export default BookList;