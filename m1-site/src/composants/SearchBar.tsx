import React from 'react';

interface SearchBarProps {
  placeholder?: string;
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Rechercher...", searchTerm, onSearch }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={searchTerm}
    onChange={(e) => onSearch(e.target.value)}
    className="border p-2 rounded"
  />
);

export default SearchBar;
