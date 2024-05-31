import { createContext, useState } from 'react';
export const TripContext = createContext();

export const TripContextProvider = ({ children }) => {
  const [trip, setTrip] = useState(null);

  return (
    <TripContext.Provider
      value={{
        trip,
        setTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
