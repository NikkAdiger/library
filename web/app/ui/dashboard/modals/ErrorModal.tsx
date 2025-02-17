import React from 'react';

interface ErrorModalProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, message, onClose }) => {
	if (!show) return null;

	return (
	  <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
		<div className="modal-dialog" role="document">
		  <div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title text-danger">Error</h5>
			  	<button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
			</div>
			<div className="modal-body">
			  <p>{message}</p>
			</div>
			<div className="modal-footer">
			  <button type="button" className="btn btn-secondary" onClick={onClose}>
				Close
			  </button>
			</div>
		  </div>
		</div>
	  </div>
	);
};

export default ErrorModal;
