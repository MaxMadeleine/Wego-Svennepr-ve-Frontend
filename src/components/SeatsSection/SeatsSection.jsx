import React from 'react';


export const SeatsSection = ({ trip }) => {
  const availableSeats = trip.seatsTotal - trip.seatsBooked;
  const seatDots = Array(trip.seatsTotal).fill(null).map((_, index) => (
    <div
      key={index}
      className={`w-4 h-4 rounded-full ${
        index < availableSeats ? 'bg-green-500' : 'bg-red-500'
      }`}
      title={index < availableSeats ? 'Ledig plads' : 'Optaget plads'}
    />
  ));

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
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
          <div key={`available-${index}`} className="flex items-center space-x-2 text-gray-500">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-bold">
              ?
            </div>
            <p>Dig?</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
        <p className="text-lg font-medium text-gray-900">Pris per plads</p>
        <p className="text-xl font-bold text-gray-900">DKK {trip.pricePerSeat}</p>
      </div>
      
      <button
        // onClick={handleBookSeat} //! skal implementeres senere
        className="w-full bg-secondary text-white py-4 px-4 rounded-3xl mt-4 font-semibold hover:bg-primary transition-colors "
      >
        Book plads
      </button>
    </div>
  );
};
