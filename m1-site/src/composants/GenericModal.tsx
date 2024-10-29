// components/GenericModal.tsx
import React, { ReactNode } from 'react';

interface GenericModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onAction: () => void;
  actionLabel: string;
  children: ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({ isOpen, title, onClose, onAction, actionLabel, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
        <div className="flex justify-end mt-4">
          <button
            onClick={onAction}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            {actionLabel}
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
