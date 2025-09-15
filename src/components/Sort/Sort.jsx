import React from 'react';

export const Sort = ({
  // Sortering 
  sortBy,
  onSortChange,
  sortOptions = [
    { value: 'sort', label: 'Sorter' },
    { value: 'name', label: 'Navn (A-Å)' },
    { value: 'likes', label: 'Mest liked' },
  ],
  
  className = "",
  selectClassName = "",
  placeholder="",
  
  }) => {
  return (
    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
      className={`px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectClassName} ${className}`}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {sortOptions.map((option) => (
        <option 
          key={option.value} 
          value={option.value}
          className={option.value === 'sort' ? 'text-gray-500' : ''}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
