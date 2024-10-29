import React from 'react';

interface AddButtonProps {
  label: string;
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
    {label}
  </button>
);

export default AddButton;
