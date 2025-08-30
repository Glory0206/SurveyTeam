import React from 'react';

function Modal({ isOpen, onClose, onConfirm, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
        <div className="text-slate-600 mb-6">{children}</div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg transition">
            취소
          </button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;