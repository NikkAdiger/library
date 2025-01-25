import React, { useState } from 'react';
import { IBook } from '../services/bookService';
import { BookGenres, BookStatuses } from '../constants/service.constant';

interface BookAddModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (newBook: IBook) => void;
}

const BookAddModal: React.FC<BookAddModalProps> = ({ show, onClose, onCreate }) => {
	const emptyNewBook: IBook = { title: '', author: '', year: 1900, genre: '', status: '' };
	const [newBook, setNewBook] = useState<IBook | null>(emptyNewBook);
	const [errors, setErrors] = useState<{ title?: string; author?: string }>({});

	if (!show) return null;

	const handleInputChange = (field: keyof IBook, value: string | number | null) => {
		setNewBook((prev) => (prev ? { ...prev, [field]: value } : null));
		setErrors((prev) => ({ ...prev, [field]: '' }));
	};

	const handleCreate = () => {
		if (newBook && !newBook.status) {
			newBook.status = null;
		}
		if (validateForm() && newBook) {
			onCreate(newBook);
			setNewBook(emptyNewBook);
			onClose();
		}
	};

	const handleModalClose = () => {
		setNewBook(emptyNewBook);
		setErrors({});
		onClose();
	};

	const validateForm = (): boolean => {
		const newErrors: { title?: string; author?: string } = {};

		if (!newBook?.title?.trim()) {
			newErrors.title = 'Title is required.';
		}
		if (!newBook?.author?.trim()) {
			newErrors.author = 'Author is required.';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	return (
		<div
			className="modal fade show d-block"
			tabIndex={-1}
			role="dialog"
			style={{ background: 'rgba(0, 0, 0, 0.5)' }}
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add Book</h5>
						<button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
					</div>
					<div className="modal-body">
						<form>
						<div className="mb-3">
								<label htmlFor="title" className="form-label">
									Title
								</label>
								<input
									type="text"
									className={`form-control ${errors.title ? 'is-invalid' : ''}`}
									id="title"
									value={newBook?.title || ''}
									onChange={(e) => handleInputChange('title', e.target.value)}
								/>
								{errors.title && <div className="invalid-feedback">{errors.title}</div>}
							</div>
							<div className="mb-3">
								<label htmlFor="author" className="form-label">
									Author
								</label>
								<input
									type="text"
									className={`form-control ${errors.author ? 'is-invalid' : ''}`}
									id="author"
									value={newBook?.author || ''}
									onChange={(e) => handleInputChange('author', e.target.value)}
								/>
								{errors.author && <div className="invalid-feedback">{errors.author}</div>}
							</div>
							<div className="mb-3">
								<label htmlFor="status" className="form-label">
									Status
								</label>
								<select
									className="form-select"
									id="status"
									value={newBook?.status || ""}
									onChange={(e) => handleInputChange('status', e.target.value)}
								>
									<option value="">Select Status</option>
									{Object.entries(BookStatuses).map(([key, { name }]) => (
										<option key={key} value={key}>
											{name}
										</option>
									))}
								</select>
							</div>
							<div className="mb-3">
								<label htmlFor="genre" className="form-label">
									Genre
								</label>
								<select
									className="form-select"
									id="genre"
									value={newBook?.genre || ""}
									onChange={(e) => handleInputChange('genre', e.target.value)}
								>
									<option value="">Select Genre</option>
									{Object.entries(BookGenres).map(([key, { name }]) => (
										<option key={key} value={key}>
											{name}
										</option>
									))}
								</select>
							</div>
							<div className="mb-3">
								<label htmlFor="year" className="form-label">
									Year
								</label>
								<input
									type="number"
									className="form-control"
									id="year"
									value={newBook?.year || 1900}
									onChange={(e) => handleInputChange('year', Number(e.target.value))}
								/>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={handleModalClose}>
							Cancel
						</button>
						<button type="button" className="btn btn-primary" onClick={handleCreate}>
							Create
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookAddModal;