import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

export const Search = ({
  // Søgning props
  searchQuery,
  onSearchChange,
  placeholder = "Søg...",
  
  className = "",
  inputClassName = "",
  iconClassName = "text-gray-400 w-4 h-4",
  
  width = "w-full sm:w-64"
}) => {
  return (
    <div className={`relative ${className}`}>
      <SearchIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconClassName}`} />
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${width} ${inputClassName}`}
      />
    </div>
  );
};
