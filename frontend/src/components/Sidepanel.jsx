// SidePanel.jsx
import React from 'react';

const SidePanel = ({ isOpen, onClose, code }) => {
  return (
    <div className={`fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full"
      >
        &times;
      </button>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Code</h2>
        <pre className="whitespace-pre-wrap break-words">{code}</pre>
      </div>
    </div>
  );
};

export default SidePanel;
