import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { User, Trash2, ExternalLink, CalendarDays, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate } from '../../lib/utils';

export const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [userBookings, setUserBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [deletingBooking, setDeletingBooking] = useState(null);


// Kalder den kun vis brugeren er logget ind og den kører igen, hvis bruger id ændrer sig.
  useEffect(() => {
    if (user?.id) {
      loadUserBookings();
    }
  }, [user?.id]);

  const loadUserBookings = async () => {
    // hvis jeg gjorde (!user.id) vil den bare prøve at læse id som er null
    if (!user?.id) return;

    setLoadingBookings(true);
    try {
      const bookings = await apiService.getBookingsByUser(user.id);
      setUserBookings(bookings);
    } catch (error) {
      console.error('Fejl ved hentning af bookinger:', error);
      toast.error('Kunne ikke hente dine bookinger');
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!confirm('Er du sikker på at du vil slette denne booking?')) return;

    setDeletingBooking(bookingId);
    try {
      setUserBookings((prev) => prev.filter((b) => b.id !== bookingId)); // filtrerer bookinger og fjerner den med matching id 
      await apiService.deleteBooking(bookingId); // Sletter trip
    } catch (error) {
      console.error('Fejl ved sletning af booking:', error);
      toast.error('Kunne ikke slette booking');
      loadUserBookings();
    } finally {
      setDeletingBooking(null);
      toast.success("Booking slettet")
    }
  };

  // Tager tripId som argument 
  const handleViewBooking = (tripId) => {
    navigate(`/find-lift/${tripId}`);
  };


  return (
    <section className="min-h-screen flex items-center justify-center bg-white-500 mt-14 md:-mt-16 xl:-mt-14 2xl:-mt-12py-12 px-4 bg-gray-50">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-5xl animate-fade-in">
        <h2 className="text-3xl font-semibold text-black mb-2 text-center">
          Mine Bookinger ({userBookings.length})
        </h2>

        {loadingBookings ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        ) : userBookings.length === 0 ? (
          <article className="text-center py-12 text-gray-500">
            <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Du har ikke lavet nogen bookinger endnu</p>
          </article>
        ) : (
          <div className="space-y-6">
            {userBookings.map((booking) => (
              <article
                key={booking.id}
                className="p-5 border border-gray-200 rounded-lg shadow-sm bg-white"
              >
                <section className="flex flex-col md:flex-row gap-6">
                  {/* Trip info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {booking.trip.cityDeparture} → {booking.trip.cityDestination}
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-center">
                        <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
                        {formatDate(booking.trip.departureDate)}
                      </p>
                      <p className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                        {booking.trip.addressDeparture} → {booking.trip.addressDestination}
                      </p>
                      <p className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-500" />
                        Booket af: {booking.user.firstname} {booking.user.lastname}
                      </p>
                      <p className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-500" />
                        Chauffør: {booking.trip.user.firstname} {booking.trip.user.lastname}
                      </p>
                    </div>
                  </div>

                  {/* Driver image */}
                  <div className="w-full md:w-40 h-40 flex-shrink-0 bg-white border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                    {booking.trip.user.imageUrl ? (
                      <img
                        src={booking.trip.user.imageUrl}
                        alt={`${booking.trip.user.firstname} ${booking.trip.user.lastname}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                </section>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => handleViewBooking(booking.trip.id)}
                    className="w-full bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-primary hover:to-secondary transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Se tur</span>
                  </button>
                  <button
                    onClick={() => handleDeleteBooking(booking.id)}
                    disabled={deletingBooking === booking.id}
                    className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Annuller</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
