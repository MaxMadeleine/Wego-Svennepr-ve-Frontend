import React, { useState, useEffect } from "react";
import { useFilter } from "../../contexts/FilterContext";
import { apiService } from "../../services/apiService";
import { TripCard } from "../TripCard/TripCard";
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const TripList = () => {
  const { totalSeats, selectedPreferences, maxSeats } = useFilter();
  // URLSearchParams bruger jeg til forespørgselsparametre i URL.
  // Det giver mig mulighed for at oprette, læse, opdatere og manipulere parametre i URL'en.
  const queryParams = new URLSearchParams(location.search);
  const fromLocation = queryParams.get('from');
  const toLocation = queryParams.get('to');

  const [trips, setTrips] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(6);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const totalPages = Math.ceil(trips.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProductsForDisplay = trips.slice(startIndex, endIndex);

  // Henter fra API og filtrerer dem
  const fetchFilteredTrips = async () => {
    setIsLoading(true);
    try {
      const allTrips = await apiService.getTrips(); 
      let filtered = allTrips;

      // Filter fromLocation
      if (fromLocation) {
        filtered = filtered.filter(trip => trip.cityDeparture.toLowerCase().includes(fromLocation.toLowerCase()));
      }

      // Filter toLocation
      if (toLocation) {
        filtered = filtered.filter(trip => trip.cityDestination.toLowerCase().includes(toLocation.toLowerCase()));
      }

      // Filter totalSeats
      filtered = filtered.filter((trip) => Number(trip.seatsTotal) <= totalSeats);

      // Filter  selectedPreferences
      if (selectedPreferences && selectedPreferences.length > 0) {
        filtered = filtered.filter((trip) => {
          let matchesAllPreferences = true;
          // jeg itererer gennem hver præference i selectedPreferences-arrayet.
          // jeg bruger det til at kontrollere, om hver præference matcher kriterierne for trip.
          for (const preference of selectedPreferences) {
            if (preference.startsWith('bagSizeId_')) {
              const bagSize = parseInt(preference.replace('bagSizeId_', ''));
              if (trip.bagSizeId !== bagSize) {
                matchesAllPreferences = false;
                break;
              }
            } else if (preference === 'hasComfort') {
              if (!trip.hasComfort) {
                matchesAllPreferences = false;
                break;
              }
            } else if (preference === 'allowMusic') {
              if (!trip.allowMusic) {
                matchesAllPreferences = false;
                break;
              }
            } else if (preference === 'allowPets') {
              if (!trip.allowPets) {
                matchesAllPreferences = false;
                break;
              }
            } else if (preference === 'allowChildren') {
              if (!trip.allowChildren) {
                matchesAllPreferences = false;
                break;
              }
            } else if (preference === 'allowSmoking') {
              if (!trip.allowSmoking) {
                matchesAllPreferences = false;
                break;
              }
            }
          }
          return matchesAllPreferences;
        });
      }

      setTrips(filtered);
    } catch (err) {
      console.error("Fejl ved hentning af ture baseret på filtre:", err);
      setError('Fejl ved indlæsning af ture.');
    } finally {
      setIsLoading(false);
    }
  };

  // Kalder fetchFilteredTrips hver gang value ændres
  useEffect(() => {
    fetchFilteredTrips();
  }, [totalSeats, selectedPreferences, fromLocation, toLocation, location.search]);

  if (isLoading) {
    return <div>Indlæser ture...</div>;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Næste {trips.length} lift </h2>
     
      </div>

      <div className="grid grid-cols-1  gap-6">
        {currentProductsForDisplay.length > 0 ? (
          currentProductsForDisplay.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">Ingen ture fundet med de valgte filtre.</p>
          
        )}
      </div>

      {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <ReactPaginate
              breakLabel="..."
              nextLabel={<ChevronRight className="w-4 h-4" />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              pageCount={totalPages}
              previousLabel={<ChevronLeft className="w-4 h-4" />}
              renderOnZeroPageCount={null}
              forcePage={currentPage}
              containerClassName="flex items-center space-x-1 sm:space-x-2 flex-wrap justify-center"
              pageClassName="px-2 sm:px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
              pageLinkClassName="block w-full h-full"
              activeClassName="bg-blue-600 text-black border-blue-600 hover:bg-blue-700 "
              previousClassName="px-2 sm:px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              nextClassName="px-2 sm:px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              breakClassName="px-2 sm:px-3 py-2 text-sm font-medium text-gray-700"
              disabledClassName="opacity-50 cursor-not-allowed"
              ariaLabelBuilder={(page, selected) =>
                selected ? `Side ${page} er valgt` : `Gå til side ${page}`
              }
            />
          </div>
      )}
    </section>
  );
};
