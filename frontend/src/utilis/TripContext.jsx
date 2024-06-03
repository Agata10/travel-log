import { createContext, useState } from 'react';
export const TripContext = createContext();
import { useParams } from 'react-router-dom';

//context for trip,trips pages and favorite places page
export const TripContextProvider = ({ children }) => {
  const [trip, setTrip] = useState(null);
  const [places, setPlaces] = useState(null);
  const { tripId } = useParams();

  return (
    <TripContext.Provider
      value={{
        trip,
        setTrip,
        tripId,
        places,
        setPlaces,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
