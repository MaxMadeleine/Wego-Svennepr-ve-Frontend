import React from 'react';

export const Main = ({ children }) => {
  return (
    <main className="flex-1  dark:bg-gray-900 min-h-screen relative max-w-7xl mx-auto px-4 p-8 pt-0">
        {children}
    </main>
  );
}; 