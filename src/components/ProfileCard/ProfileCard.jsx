import React from 'react';
import { Star } from 'lucide-react';
import { StarRating } from '../StarRating/StarRating';

export const ProfileCard = ({ driver, layout = 'vertical', onWriteReview }) => {
  // destructure user object og laver const med deres verdi 
  const profileImageUrl = driver?.imageUrl;
  const userName = driver ? `${driver.firstname} ${driver.lastname}` : 'Ukendt Bruger';
  const userStars = driver?.avgStars || 0;
  const numReviews = driver?.numReviews;
  const memberSince = driver?.createdAt ? `Medlem siden ${new Date(driver.createdAt).toLocaleDateString('da-DK', { year: 'numeric', month: 'long' })}` : 'juli 2014';

  

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
            {/* chatAt 0 tager første bogstav */}

          </div>
        )}
      </div>

      {/* Profil detaljer */}
      <div className="flex flex-col items-center md:items-start flex-shrink-0 mx-auto text-center md:text-left flex-grow justify-center" >
        <h3 className="text-xl font-medium text-gray-900 mb-1">
          {userName || "Ukendt Bruger"}
        </h3>

        <StarRating rating={userStars} numReviews={numReviews} className="mb-1" />

          <p className="text-sm text-gray-600  my-1">
            Medlem side: {memberSince}
          </p>
               
          {onWriteReview && (
            <button
              onClick={onWriteReview}
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
        <img
          src={profileImageUrl}
          alt={userName}
          className="w-32 h-32 rounded-full object-cover mb-2"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-bold mb-2">
          {/* chatAt 0 tager første bogstav */}
          {userName ? userName.charAt(0).toUpperCase() : 'U'}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{userName || 'Ukendt Bruger'}</h3>
      <div className="flex mt-1" role="group" aria-label="Bruger rating">

     {/* stjerner og anmeldelser */}
     <StarRating rating={userStars} starSize={7} />
      </div>
    </div>
  );
};