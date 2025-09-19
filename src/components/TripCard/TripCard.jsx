import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Ship, Zap, Circle } from 'lucide-react';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { formatDate } from '../../lib/utils';


//passer trip med som helt object
export const TripCard = ({ trip }) => {

  const availableSeats = trip.seatsTotal - trip.seatsBooked;
  // Jeg laver en array med længden seatsTotal. fill(null) fylder arrayen med null-værdier, så den kan mappes over. map((_, index) bruger jeg til at loope over hvert element i arrayen, hvor index er sædets position.
  const seatDots = Array(trip.seatsTotal).fill(null).map((_, index) => (
      <div
        key={index}
        className={`w-4 h-4 rounded-full ${
          index < availableSeats ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
    ));

  return (
    <Link to={`/find-lift/${trip.id}`} className="block">
      <article className="relative flex flex-col lg:flex-row bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-lg  overflow-hidden group hover:scale-[1.02] transition-transform duration-300 ease-in-out">
        {/* venstre - Profil */}
        <div className="w-full lg:w-1/3 py-4 lg:py-6 flex flex-col justify-center items-center border-b lg:border-r lg:border-b-0 border-gray-200 dark:border-gray-600">
        {/* passer trip.user med fra trip */}
          <ProfileCard driver={trip.user} />
        </div>

        {/* midt - detaljer */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          
          <header className="p-2">
            <div className="flex items-center mb-2">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mr-4">{formatDate(trip.departureDate)}</h3>
              {trip.useFerry && <Ship className="w-6 h-7 text-blue-700 mr-2" title="Inkluderer færge" />} 
              {trip.isElectric && <Zap className="w-6 h-7 text-fav" title="Elektrisk bil" />} 
            </div>
            <p className="text-gray-900 text-lg mb-2 dark:text-gray-300 flex">
              <Circle className="flex-shrink-0 w-6 h-6 mr-4 mt-2 text-secondary" />
               <span><b className="font-semibold">{trip.cityDeparture}</b> <br /> {trip.addressDeparture}</span>
            </p>
            <p className="text-gray-900 text-lg dark:text-gray-300 flex">
              <MapPin className="w-6 h-6 mr-4 flex-shrink-0 text-secondary mt-2" />
              <span><b className="font-semibold">{trip.cityDestination}</b> <br /> {trip.addressDestination}</span>
            </p>
          </header>

          
        </div>

        {/* højre - Pris og sæder */}
        <div className="w-full lg:w-1/4 flex flex-col justify-evenly items-center border-t lg:border-l lg:border-t-0 border-gray-200 dark:border-gray-600 py-4 lg:py-6">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">DKK {trip.pricePerSeat}</div>
          </div>

          <div className="flex space-x-1.5 w-full justify-center pt-2">
            {seatDots}
          </div>
        </div>
      </article>
    </Link>
  );
};