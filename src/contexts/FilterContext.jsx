import React, { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/apiService";
import { useLocation } from "react-router-dom";

const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [totalSeats, setTotalSeats] = useState(1); 
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [maxSeats, setMaxSeats] = useState(1); 
  const location = useLocation();
  // jeg bruger URLSearchParams for at sikre, at mit komponent altid har den korrekte state der matcher url/query parametre. Det gør det muligt at filtre dynamisk på ændringer og holde det synkroniseret
  // location search indholder qurry parameter fra tripfilter. new URLSearchParams(location.search) opretter et objekt, der gør det nemt at hente værdier fra query-parametrene. || er til fallback
  const [fromLocation, setFromLocation] = useState(new URLSearchParams(location.search).get('from') || ''); 
  const [toLocation, setToLocation] = useState(new URLSearchParams(location.search).get('to') || ''); 

  // useEffect til at hente antal sæder fra alle trips ved render
  useEffect(() => {
    const fetchMaxSeats = async () => {
      try {
        const allTrips = await apiService.getTrips();
        // Hvis der findes ture, beregnes det maksimale antal sæder
        if (allTrips && allTrips.length > 0) {
          const maxSeatsValue = Math.max(...allTrips.map(trip => trip.seatsTotal));
          // Opdaterer tilstanden med det maksimale antal sæder
          setMaxSeats(maxSeatsValue);
          setTotalSeats(maxSeatsValue); // værdi for slideren til max
        }
      } catch (error) {
        console.error("Error fetching max seats:", error);
      }
    };
    fetchMaxSeats();
  }, []); 

  // til at sync state med ulr query parametre
  useEffect(() => {
    const newQueryParams = new URLSearchParams(location.search);
    //ver gang URLSearchParams bliver opdateret gemmer den verdien i state
    setFromLocation(newQueryParams.get('from') || '');
    setToLocation(newQueryParams.get('to') || '');
  }, [location.search]); // køre ver gang lokation.search ændre sig

  //for at tilføje eller fjerne en præference fra listen
  const togglePreference = (preferenceName) => { 
    setSelectedPreferences((prev) =>
      // Hvis præferencen allerede findes i listen, fjernes den
      prev.includes(preferenceName)
        ? prev.filter((name) => name !== preferenceName)
        // Hvis præferencen ikke findes i listen, tilføjes den
        : [...prev, preferenceName]
    );
  };


  const resetAllFilters = () => { 
    setTotalSeats(maxSeats); // til max ledige sæder
    setSelectedPreferences([]); // array med prefrenacer
    setFromLocation("");
    setToLocation("");
  };

  const contextValue = {
    totalSeats,
    setTotalSeats,
    selectedPreferences,
    togglePreference,
    maxSeats,
    fromLocation,
    setFromLocation,
    toLocation,
    setToLocation,
    resetAllFilters,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => { // hook til filtercontext
  return useContext(FilterContext);
};
