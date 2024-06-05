import { createContext, useState } from 'react';
export const ExploreContext = createContext();

// context for the explore page which includes search bar for places and map
export const ExploreContextProvider = ({ children }) => {
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 }); //lat, lng
  const [searchPlaces, setSearchPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <ExploreContext.Provider
      value={{
        position,
        setPosition,
        isLoading,
        setIsLoading,
        searchPlaces,
        setSearchPlaces,
        bounds,
        setBounds,
        open,
        setOpen,
        selectedPlace,
        setSelectedPlace,
        showAlert,
        setShowAlert,
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
};
