import React from 'react';
import { IBook } from '../../../services/bookService';

interface BookDeleteModalProps {
  show: boolean;
  book?: IBook;
  onClose: () => void;
  onConfirm: () => void;
}

const BookDeleteModal: React.FC<BookDeleteModalProps> = ({ show, book, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete a Book?</p>
			<p><strong>Title: {book?.title}</strong></p>
			<p><strong>Author: {book?.author}</strong></p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDeleteModal;
