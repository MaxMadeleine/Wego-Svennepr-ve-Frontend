import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { User, Trash2, ExternalLink, CalendarDays, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';



//! VIRKER IKKE ENDU
//TODO

export const MyTrips = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [userTrips, setUserTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(false);
  const [deletingTrip, setDeletingTrip] = useState(null);
  
  useEffect(() => {
    if (user?.id) {
      loadUserTrips();
    }
  }, [user?.id]);

  const loadUserTrips = async () => {
    if (!user?.id) return;
    
    setLoadingTrips(true);
    try {
      const trips = await apiService.getUserTrips(user.id); // henter  for den aktuelle bruger
      setUserTrips(trips);
    } catch (error) {
      console.error('Fejl ved hentning af ture:', error);
      toast.error('Kunne ikke hente dine ture');
    } finally {
      setLoadingTrips(false);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    if (!confirm('Er du sikker på at du vil slette denne tur?')) return;
    
    setDeletingTrip(tripId);
    try {
      setUserTrips(prev => prev.filter(t => t.id !== tripId)); // opdaterer lokal state for at fjerne trip
      
      await apiService.deleteTrip(tripId); // Sletter trip
      toast.success('Tur slettet');
    } catch (error) {
      console.error('Fejl ved sletning af tur:', error);
      toast.error('Kunne ikke slette tur');
      loadUserTrips();
    } finally {
      setDeletingTrip(null);
    }
  };

  const handleViewTrip = (tripId) => {
    navigate(`/find-lift/${tripId}`); // går til trip/:id siden
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('da-DK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section className=" mt-20 mx-auto">
      <div className="bg-white border border-gray-200 p-6">
        <h2 className="text-xl font-normal text-gray-900 mb-6 p-1">
          Mine Ture ({userTrips.length})
        </h2>

        {loadingTrips ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : userTrips.length === 0 ? (
          <article className="text-center py-8">
            <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Du har ikke oprettet nogen ture endnu</p>
          </article>
        ) : (
          <section className="space-y-4">
            {userTrips.map((trip) => (
              <article key={trip.id} className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 p-3 lg:p-5 border-2 border-secondary">
                  <figure className="flex-1 overflow-hidden order-2 lg:order-1">
                    <header className="bg-secondary text-white px-3 lg:px-4 py-2 flex flex-col sm:flex-row lg:flex-row justify-between items-start sm:items-center lg:items-center gap-2 lg:gap-0">
                      <h3 className="text-xl lg:text-2xl font-light">{trip.cityDeparture} til {trip.cityDestination}</h3>
                      <span className="text-xl lg:text-2xl font-light">Pris: {trip.pricePerSeat} kr</span>
                    </header>
                    
                    <figcaption className="py-3 lg:py-4 px-2">
                      <p className="text-gray-700 text-base lg:text-lg mb-2 flex items-center">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        {formatDate(trip.departureDate)}
                      </p>
                      <p className="text-gray-700 text-base lg:text-lg flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {trip.addressDeparture} til {trip.addressDestination}
                      </p>
                    </figcaption>
                  </figure>
                  
                  <div className="w-full lg:w-96 h-48 lg:h-48 bg-gray-100 overflow-hidden flex-shrink-0 order-1 lg:order-2 flex items-center justify-center text-gray-400">
                    <User className="w-12 h-12" />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 lg:gap-4">
                  <button
                    onClick={() => handleViewTrip(trip.id)} 
                    className="hover:text-green-700 text-md font-normal flex items-center justify-center sm:justify-start space-x-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Gå til tur</span>
                  </button>
                  <button
                    onClick={() => handleDeleteTrip(trip.id)}
                    disabled={deletingTrip === trip.id}
                    className="text-red-600 hover:text-red-700 text-md font-normal flex items-center justify-center sm:justify-start space-x-1 disabled:opacity-50"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Fjern tur</span>
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </section>
  );
};
