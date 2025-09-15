import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Circle } from 'lucide-react';

export const TripFilter = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  // laver en const/instance af URLSearchParams fra URL's søgeparametre
  const queryParams = new URLSearchParams(location.search);

  // Initialiserer med værdien fra URL'en eller en tom streng
  const [fromLocation, setFromLocation] = useState(queryParams.get('from') || ''); 
  const [toLocation, setToLocation] = useState(queryParams.get('to') || ''); 
  useEffect(() => {
    // effekt checker ændringer i URL'ens søgeparametre og opdaterer state
    const newQueryParams = new URLSearchParams(location.search);
    // Opdaterer "fromLocation" baseret på URL'en
    setFromLocation(newQueryParams.get('from') || ''); 
    setToLocation(newQueryParams.get('to') || ''); 
  }, [location.search]); // Kører kun, når `location.search` ændres

  const handleSearch = (e) => {
    e.preventDefault();
    const newQueryParams = new URLSearchParams(); // Opretter en ny instans af URLSearchParams
    // Tilføjer from og to til søgeparametrene, hvis det er angivet
    if (fromLocation) {
      newQueryParams.set('from', fromLocation); 
    }
    if (toLocation) {
      newQueryParams.set('to', toLocation); 
    }
    navigate(`${location.pathname}?${newQueryParams.toString()}`);     // ny URL 

  };

  return (
    <section className="w-full bg-white dark:bg-gray-950 shadow-md py-4 mt-0.5 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative flex items-center w-full sm:w-1/3">
            <Circle className="absolute left-3 w-5 h-5 text-secondary " />
            <input
              type="text"
              placeholder="Hvor fra?"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div className="relative flex items-center w-full sm:w-1/3">
            <MapPin className="absolute left-3 w-5 h-5 text-secondary" />
            <input
              type="text"
              placeholder="Hvor til?"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-6 rounded-3xl transition-colors duration-200"
          >
            Søg lift
          </button>
        </form>
      </div>
    </section>
  );
};
