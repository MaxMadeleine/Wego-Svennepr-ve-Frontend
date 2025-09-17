import React from 'react';
import { MapPin, Circle, Repeat } from 'lucide-react';
import { useFilter } from '../../contexts/FilterContext';

export const TripFilter = () => {
  const { fromLocation, setFromLocation, toLocation, setToLocation } = useFilter();

  const handleSwitchLocations = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  return (
    <section className="w-full bg-white dark:bg-gray-950 shadow-md py-4 mt-0.5 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form className="flex flex-row flex-wrap items-center justify-center gap-4">
          <div className="relative flex items-center flex-1 min-w-[150px] sm:w-1/3">
            <Circle className="absolute left-3 w-5 h-5 text-secondary " />
            <input
              type="text"
              placeholder="Hvor fra?"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <button type="button" onClick={handleSwitchLocations} className="p-3 rounded-3xl bg-secondary/15 hover:bg-secondary/20 hover:rotate-180 transition-all duration-[600ms] dark:bg-gray-700 dark:hover:bg-gray-600">
            <Repeat className="w-7 h-7 text-secondary" />
          </button>
          <div className="relative flex items-center flex-1 min-w-[150px] sm:w-1/3">
            <MapPin className="absolute left-3 w-5.5 h-5.5 text-secondary" />
            <input
              type="text"
              placeholder="Hvor til?"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </form>
      </div>
      
    </section>
    
  );
};
