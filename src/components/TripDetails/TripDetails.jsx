import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import { ArrowLeft, Users, Briefcase, Fuel, Car, Check, X, Ship } from 'lucide-react';
import toast from 'react-hot-toast';
import { ProfileReviews } from '../ProfileReviews/ProfileReviews';
import { SeatsSection } from '../SeatsSection/SeatsSection';
import comment from '../../assets/images/comment/Vector.svg';
import { formatDate } from '../../lib/utils';
import { ClipLoader } from 'react-spinners';

export const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const data = await apiService.getTrip(id);
        setTrip(data);
      } catch (err) {
        console.error('Error fetching trip details:', err);
        toast.error('Kunne ikke hente tur detaljer.');
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);


  if (loading) {
    return  <ClipLoader size={50} color="secondary" />

  }

  const preferences = [
    // trip har data fra fetch så jeg ved om value er true eller false
    { label: 'Kæledyr', value: trip.allowPets },
    { label: 'Børn', value: trip.allowChildren },
    { label: 'Musik', value: trip.allowMusic },
    { label: 'Rygning', value: trip.allowSmoking },
  ];

  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 3 column layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* tilbage knap*/}
          <div className="col-span-12 lg:col-span-1">
            <button
              onClick={() => navigate(-1)} 
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
                    // pref bruger jeg som Præferencer shortname og value chekker 
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