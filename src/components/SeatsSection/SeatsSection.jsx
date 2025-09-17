import React from 'react';
import { Link } from 'react-router-dom';


export const SeatsSection = ({ trip }) => {
  const availableSeats = trip.seatsTotal - trip.seatsBooked;

  return (
    <section className="bg-white rounded-3xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pladser</h3>
      
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <img
            src={trip.user.imageUrl || 'https://i.pravatar.cc/150?u=placeholder'}
            alt={trip.user.firstname}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{trip.user.firstname} {trip.user.lastname}</p>
            <p className="text-sm text-gray-500">{trip.cityDeparture} - {trip.cityDestination}</p>
          </div>
        </div>

        {trip.bookings.map((booking, index) => (
          <div key={index} className="flex items-center space-x-2">
            <img
              src={booking.user.imageUrl || 'https://i.pravatar.cc/150?u=placeholder'}
              alt={booking.user.firstname}
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="font-medium text-gray-900">{booking.user.firstname} {booking.user.lastname}</p>
          </div>
        ))}

        

        {Array(availableSeats).fill(null).map((_, index) => (
          //.fill(null) fylder arrayen med null-værdier, så den kan mappes over
          //.map((_, index) looper over hvert sæde og opretter en div for hvert sæde
          <div key={`available-${index}`} className="flex items-center space-x-2 text-gray-500">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-bold">
              ?
            </div>
            <p>Dig?</p>
          </div>
        ))}
      </div>

      <div className="flex justify-evenly items-center my-6 pt-4 border-t border-gray-200">
        <p className="text-lg font-medium text-gray-900">Pris per plads</p>
        <p className="text-xl font-bold text-gray-900">DKK {trip.pricePerSeat}</p>
      </div>
      
      <Link
        to={`/find-lift/${trip.id}/book-plads`}
        className=" lg:text-nowrap flex justify-center text-lg  py-3 px-28 rounded-3xl mt-8 font-semibold  bg-secondary hover:bg-gradient-to-tr transform hover:scale-[1.02] from-primary to-secondary text-white hover:bg-primary transition duration-300"
      >
        Book plads
      </Link>
    </section>
  );
};


