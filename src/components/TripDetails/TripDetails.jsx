import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import { ArrowLeft, Users, Briefcase, Fuel, Music, Ban, Baby, Car, Check, X, Ship } from 'lucide-react';
import toast from 'react-hot-toast';
import { ProfileReviews } from '../ProfileReviews/ProfileReviews';
import { SeatsSection } from '../SeatsSection/SeatsSection';
import comment from '../../assets/images/comment/Vector.svg'; 

export const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        const data = await apiService.getTrip(id);
        setTrip(data);
      } catch (err) {
        console.error('Error fetching trip details:', err);
        setError('Kunne ikke hente tur detaljer. Prøv igen senere.');
        toast.error('Kunne ikke hente tur detaljer.');
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // til forrige side
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `I dag kl. ${date.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `I morgen kl. ${date.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('da-DK', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen pt-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        <p className="ml-4 text-gray-700">Indlæser tur...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen pt-4 flex items-center justify-center text-red-600">
        <p>{error}</p>
      </section>
    );
  }

  if (!trip) {
    return (
      <section className="min-h-screen pt-4 flex items-center justify-center text-gray-700">
        <p>Tur ikke fundet.</p>
      </section>
    );
  }

  const preferences = [
    { label: 'Kæledyr', value: trip.allowPets, icon: <Ban className="w-5 h-5" /> },
    { label: 'Børn', value: trip.allowChildren, icon: <Baby className="w-5 h-5" /> },
    { label: 'Musik', value: trip.allowMusic, icon: <Music className="w-5 h-5" /> },
    { label: 'Rygning', value: trip.allowSmoking, icon: <Ban className="w-5 h-5" /> },
  ];

  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 3 column layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* tilbage knap*/}
          <div className="col-span-12 lg:col-span-1">
            <button 
              onClick={handleGoBack} 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              aria-label="Gå tilbage"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* midt column */}
          <article className="col-span-12 lg:col-span-7 bg-white rounded-3xl shadow-sm p-6">
            <header>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{trip.cityDeparture} til {trip.cityDestination}</h1>
              <p className="text-gray-600 mb-6">{formatDate(trip.departureDate)}</p>
            </header>

            <div className="space-y-6">
              {/* info */}
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Information</h2>
                {trip.useFerry && (
                  <div className="flex items-center text-gray-700">
                    <Ship className="w-5 h-5 mr-3 text-blue-800" />
                    <p>Rute inkluderer en færge</p>
                  </div>
                )}
              </section>

              {/* detaljer */}
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Detaljer</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Users className="w-5 h-5 mr-3 mt-1 text-green-600" />
                    <div>
                      <p className="font-medium text-sm text-gray-500 uppercase tracking-wide">KOMFORT</p>
                      <p className="text-gray-700">Maks. {trip.seatsTotal} personer på bagsædet</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Briefcase className="w-5 h-5 mr-3 mt-1 text-green-600" />
                    <div>
                      <p className="font-medium text-sm text-gray-500 uppercase tracking-wide">BAGAGESTØRRELSE</p>
                      <p className="text-gray-700">{trip.bagsize?.description || 'Ikke specificeret'}</p>
                    </div>
                  </div>
                  {trip.hasComfort && (
                    <div className="flex items-start">
                      <Car className="w-5 h-5 mr-3 mt-1 text-green-600" />
                      <div>
                        <p className="font-medium text-sm text-gray-500 uppercase tracking-wide">AFVIGELSER FRA RUTEN</p>
                        <p className="text-gray-700">Bilisten er fleksibel</p>
                      </div>
                    </div>
                  )}
                  {trip.isElectric && (
                    <div className="flex items-start">
                      <Fuel className="w-5 h-5 mr-3 mt-1 text-green-600" />
                      <div>
                        <p className="font-medium text-sm text-gray-500 uppercase tracking-wide">BRÆNDSTOFTYPE</p>
                        <p className="text-gray-700">Bilen er elektrisk</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Præferencer</h2>
                <div className="grid grid-cols-2 gap-3">
                  {preferences.map((pref, index) => (
                    // pref bruger jeg som Præferencer shortname 
                    <div key={index || pref} className="flex items-center">
                      {pref.value ? (
                        <Check className="w-5 h-5 mr-3 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 mr-3 text-red-500" />
                      )}
                      <p className="text-gray-700">{pref.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              {trip.comment && trip.comment.trim() !== '' && (
                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Chaufførens kommentar:</h2>
                  <figure className="relative">
                    <div className="absolute left-4 top-0 text-6xl leading-none">
                      <img src={comment} alt="Kommentar ikon" />
                    </div>
                    <blockquote className="pl-20 pr-4 pb-2">
                      <p className="text-gray-700">{trip.comment}</p>
                    </blockquote>
                  </figure>
                </section>
              )}

              <ProfileReviews
                //passer trip values til component
                tripId={trip.id}
                driverId={trip.userId}
                driver={trip.user}
                reviews={trip.reviews}
              />
            </div>
          </article>

          <aside className="col-span-12 lg:col-span-4 lg:sticky top-36 self-start">
            <SeatsSection trip={trip} />
          </aside>
        </div>
      </div>
    </section>
  );
};