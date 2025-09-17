import React from 'react';
import { Star } from 'lucide-react';

export const ProfileCard = ({ profileImageUrl, userName, userStars, layout = 'vertical', numReviews, isAuthenticated, user, driverId, showReviewForm, setShowReviewForm }) => {
  // Afrunder brugerens stjernerating til nærmeste heltal for at vise det korrekt
  const roundedStars = Math.round(userStars);
  const maxStars = 5;

  if (layout === 'horizontal') {
    return (
      <div className="flex flex-col md:flex-row items-start bg-white w-full md:max-w-2xl gap-4 md:gap-6 p-4 rounded-lg">
      {/* Profilbillede */}
      <div className="flex-shrink-0 mx-auto md:mx-0">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={userName}
            className="w-24 h-24 md:h-48 md:w-48 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-bold">
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>
        )}
      </div>

      {/* Profil detaljer */}
      <div className="flex flex-col items-center md:items-start flex-shrink-0 mx-auto text-center md:text-left flex-grow justify-center" >
        <h3 className="text-xl font-medium text-gray-900 mb-1">
          {userName || "Ukendt Bruger"}
        </h3>

        {/* stjerner og anmeldelser
         Array(maxStars) opretter en array med længden maxStars/5
        [...Array(maxStars)] laver arrayen til en fyldt array, så den kan mappes over.
        map ignorere _ value og looper over hvert index i arrayen
        */}
        <div className="flex items-center space-x-1 mb-1">
          {[...Array(maxStars)].map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < roundedStars
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}

          {/* chekker om den har værdi */}
          {numReviews !== undefined && (
            <p className="text-sm text-gray-600 flex-shrink-0  my-1">
              ({numReviews} anmeldelser)
            </p>
          )}
        </div>

        {/* Medlem siden (kunne ikke findes i backend) */}
          <p className="text-sm text-gray-600  my-1">
            Medlem siden august 2004
          </p>
               
          {isAuthenticated && user?.id !== driverId && (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-secondary hover:bg-gradient-to-tr transform hover:scale-[1.02] from-primary to-secondary text-white hover:bg-primary transition duration-300 px-7 mt-9 py-3 rounded-full text-md font-medium w-fit"
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
        //ellera viser brugerens forbogstav eller U
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-bold mb-2">
          {/* chatAt 0 tager første bogstav */}
          {userName ? userName.charAt(0).toUpperCase() : 'U'}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{userName || 'Ukendt Bruger'}</h3>
      <div className="flex mt-1" role="group" aria-label="Bruger rating">

     {/* stjerner og anmeldelser
         Array(maxStars) opretter en array med længden maxStars/5
        [...Array(maxStars)] laver arrayen til en fyldt array, så den kan mappes over.
        map ignorere _ value og looper over hvert index i arrayen
        */}

        {[...Array(maxStars)].map((_, index) => (
          <Star
            key={index} // Bruger indekset som nøgle for hver stjerne
            className={`w-7 h-7 ${
              index < roundedStars ? 'text-fav fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};