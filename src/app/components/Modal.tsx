import React from "react";

const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md backdrop-filter bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-600 focus:outline-none"
          onClick={onClose}
        >
          &#215;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
