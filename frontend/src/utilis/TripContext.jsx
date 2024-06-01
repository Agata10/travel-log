import { createContext, useState } from 'react';
export const TripContext = createContext();
import { useParams } from 'react-router-dom';

export const TripContextProvider = ({ children }) => {
  const [trip, setTrip] = useState(null);
  const { tripId } = useParams();

  return (
    <TripContext.Provider
      value={{
        trip,
        setTrip,
        tripId,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
