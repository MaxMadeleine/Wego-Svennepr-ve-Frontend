import React from 'react';
import { Star } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return 'Ukendt';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('da-DK', options);
};

export const ProfileCard = ({ profileImageUrl, userName, userStars, layout = 'vertical', numReviews, memberSince, isAuthenticated, user, driverId, showReviewForm, setShowReviewForm }) => {
  // Afrunder brugerens stjernerating til nærmeste heltal for at vise det korrekt
  const roundedStars = Math.round(userStars);
  const maxStars = 5;

  if (layout === 'horizontal') {
    return (
      <div className="flex items-start bg-white w-full max-w-2xl gap-6 p-4 rounded-lg">
      {/* Profilbillede */}
      <div className="flex-shrink-0">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={userName}
            className="w-48 h-48 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-bold">
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>
        )}
      </div>

      {/* Profil detaljer */}
      <div className="flex flex-col text-left flex-grow">
        {/* Brugernavn */}
        <h3 className="text-xl font-medium text-gray-900 mb-1">
          {userName || "Ukendt Bruger"}
        </h3>

        {/* Stjerner + Anmeldelser */}
        <div className="flex items-center space-x-1 mb-1">
          {[...Array(maxStars)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < roundedStars
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          {numReviews !== undefined && (
            <p className="text-sm text-gray-600  my-1">
              ({numReviews} anmeldelser)
            </p>
          )}
        </div>

        {/* Medlem siden (kunne ikke findes i backend) */}
          <p className="text-sm text-gray-600  my-1">
            Medlem siden august 2004
          </p>
               
          {/* Skriv anmeldelse knap */}
          {isAuthenticated && user?.id !== driverId && (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-secondary hover:bg-primary text-white px-7 mt-9 py-3 rounded-full text-md font-medium transition-colors duration-200 w-fit"
            >
              Skriv en anmeldelse
            </button>
          )}

      </div>
    </div>
    
    );
  }

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
      <div className="flex mt-1" role="group" aria-label="Bruger rating">
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