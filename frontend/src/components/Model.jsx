// Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, code }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Submission Code</h2>
        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg overflow-x-auto">
          {code}
        </pre>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
