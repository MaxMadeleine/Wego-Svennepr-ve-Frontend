import React, { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/apiService";

const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [totalSeats, setTotalSeats] = useState(1); 
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [maxSeats, setMaxSeats] = useState(1); 
  const [fromLocation, setFromLocation] = useState(""); // State for afgangslokation
  const [toLocation, setToLocation] = useState(""); // State for destinationslokation

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

  const resetPreferences = () => {
    setSelectedPreferences([]);
  };
  
  const resetLocationFilters = () => { 
    setFromLocation("");
    setToLocation("");
  };

  const resetAllFilters = () => { 
    setTotalSeats(maxSeats); // til max ledige sæder
    setSelectedPreferences([]);
    setFromLocation("");
    setToLocation("");
  };

  const contextValue = {
    totalSeats,
    setTotalSeats,
    selectedPreferences,
    togglePreference,
    maxSeats,
    resetPreferences,
    fromLocation,
    setFromLocation,
    toLocation,
    setToLocation,
    resetLocationFilters,
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
