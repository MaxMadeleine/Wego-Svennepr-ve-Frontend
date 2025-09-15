import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Ship, Zap, Circle } from 'lucide-react';
import { ProfileCard } from '../ProfileCard/ProfileCard';


//! TODO MANGLER ORDENLIG RESPONSIVITET 
//TODO


export const TripCard = ({ trip }) => {
  // funktion til at formatere datoen for turens afgang
  // vis datoen er i dag vises "I dag" og tidspunktet
  // vis datoen er i morgen vises "I morgen" og tidspunktet. ellers vises datoen i formatet "dag måned år" 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const time = date.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });

    if (date.toDateString() === today.toDateString()) {
      return `I dag ${time}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `I morgen ${time}`;
    } else {
      return date.toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  };

  const availableSeats = trip.seatsTotal - trip.seatsBooked;



// jeg opretter en array med længden seatsTotal.    fill(null) fylder arrayen med null-values, så den kan loopes/mappes over.     map((_, index) bruger jeg til at køre over hvert element i arrayen for at labe prikker index er det position, og bruges til at bestemme, om sædet er ledigt grøn prik ellers rød 
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
      <article className="relative flex bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-lg  overflow-hidden group hover:scale-[1.02] transition-transform duration-300 ease-in-out">
        {/* venstre - Profil */}
        <div className="w-1/3 py-6 flex flex-col justify-center items-center border-r border-gray-200 dark:border-gray-600">
          <ProfileCard profileImageUrl={trip.user?.imageUrl || 'https://www.gravatar.com/avatar?d=mp&s=150'} userName={trip.user?.firstname || 'Ukendt Bruger'} userStars={trip.user?.avgStars || 0} />
        </div>

        {/* midt - detaljer */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          
          <header className="p-2">
          <div className="absolute top-4 right-64 flex space-x-2">
            {trip.useFerry && <Ship className="w-6 h-7 text-blue-700" title="Inkluderer færge" />}
            {trip.isElectric && <Zap className="w-6 h-7 text-fav" title="Elektrisk bil" />}
          </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-2 dark:text-white">{formatDate(trip.departureDate)}</h3>
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
        <div className="w-1/4  flex flex-col justify-evenly items-center border-b border-l border-gray-200 dark:border-gray-600">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">DKK {trip.pricePerSeat}</div>
          </div>

          <div className="flex space-x-1.5 w-full -mx-4 -px-4 justify-center border-t border-gray-200 dark:border-gray-600 pt-10">
            {seatDots}
          </div>
        </div>
      </article>
    </Link>
  );
};