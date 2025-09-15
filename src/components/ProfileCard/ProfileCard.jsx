import React from 'react';
import { Star } from 'lucide-react';

export const ProfileCard = ({ profileImageUrl, userName, userStars }) => {
  // Afrunder brugerens stjernerating til nærmeste heltal for at vise det korrekt
  const roundedStars = Math.round(userStars);
  const maxStars = 5;

  return (
    <div className="flex flex-col items-center">
      {profileImageUrl ? (
        // Hvis der er et profilbillede
        <img
          src={profileImageUrl}
          alt={userName}
          className="w-32 h-32 rounded-full object-cover mb-2"
        />
      ) : (
        // Hvis der ikke er et profilbillede, viser brugerens forbogstav eller U
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-bold mb-2">
          {/* chatAt 0 tager første bogstav */}
          {userName ? userName.charAt(0).toUpperCase() : 'U'}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{userName || 'Ukendt Bruger'}</h3>
      <div className="flex mt-1">
        {/*  en række stjerner der markerer de fyldte stjerner på roundedStars */}
        {[...Array(maxStars)].map((_, i) => (
          <Star
            key={i} // Bruger indekset som nøgle for hver stjerne
            className={`w-7 h-7 ${
              i < roundedStars ? 'text-fav fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};