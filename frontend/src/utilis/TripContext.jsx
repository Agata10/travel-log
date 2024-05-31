import { createContext, useState } from 'react';
export const TripContext = createContext();

export const TripContextProvider = ({ children }) => {
  const [trip, setTrip] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <TripContext.Provider
      value={{
        trip,
        setTrip,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
