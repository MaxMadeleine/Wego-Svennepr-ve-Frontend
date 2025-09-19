import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating, maxStars = 5, starSize = 5, onClick, className = '' }) => {
  const roundedRating = Math.round(rating);


    {/* Array(maxStars) opretter en array med længden maxStars/5
        [...Array(maxStars)] laver arrayen til en fyldt array, så den kan mappes over.
        map ignorere _ value og looper over hvert index i arrayen
        */}
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[...Array(maxStars)].map((_, index) => (
        <Star
          key={index}
          className={`w-${starSize} h-${starSize} ${onClick ? 'cursor-pointer' : ''} ${
            index < roundedRating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          }`}
          onClick={onClick ? () => onClick(index + 1) : undefined}
        />
      ))}
    </div>
  );
};
