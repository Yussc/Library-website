import React from 'react';

interface SortOption {
  value: string;
  label: string;
}

interface SortSelectorProps {
  sortOption: string;
  onSortChange: (option: string) => void;
  options: SortOption[];
}

const SortSelector: React.FC<SortSelectorProps> = ({ sortOption, onSortChange, options }) => {
  return (
    <select
      value={sortOption}
      onChange={(e) => onSortChange(e.target.value)}
      className="border p-2 rounded"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortSelector;
