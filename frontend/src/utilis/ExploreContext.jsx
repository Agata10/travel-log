import { createContext, useState } from 'react';

export const ExploreContext = createContext();

export const ExploreContextProvider = ({ children }) => {
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 }); //lat, lng
  const [places, setPlaces] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ExploreContext.Provider
      value={{
        position,
        setPosition,
        isLoading,
        setIsLoading,
        places,
        setPlaces,
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
};
