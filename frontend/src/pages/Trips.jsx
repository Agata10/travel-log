import { Box } from '@mui/material';
import TripHeader from '../components/trips/TripHeader';
import TripsWrapper from '../components/trips/TripsWrapper';
import Footer from '../components/Footer';
import { useState } from 'react';
import DialogAddTrip from '../components/trips/DialogAddTrip';
import { getTrips } from '../api/tripsAPI';
import { useEffect, useContext } from 'react';
import { ExploreContext } from '../utilis/ExploreContext';
import { RotatingLines } from 'react-loader-spinner';

const Trips = () => {
  const [open, setOpen] = useState(false);
  const [tripAdded, setTripAdded] = useState(false);
  const [trips, setTrips] = useState(null);
  const exploreContext = useContext(ExploreContext);
  const { setIsLoading, isLoading } = exploreContext;

  //NOTE: make it accessible only for log in user, add user id after auth
  //the id is passed as the url params api/tripsAPI.js
  const fetchData = async () => {
    setIsLoading(true);
    const tripsResponse = await getTrips();
    if (tripsResponse) {
      setTrips(tripsResponse);
    }
  };
  useEffect(() => {
    fetchData();
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    () => {
      clearTimeout(timeout);
    };
  }, [tripAdded]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-5/6">
        <RotatingLines
          visible={true}
          height="80"
          width="80"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }
  return (
    <Box
      className="w-full flex flex-col items-center gap-10 min-h-screen"
      pt={4}
    >
      <DialogAddTrip
        open={open}
        setOpen={setOpen}
        setTripAdded={setTripAdded}
      />
      <TripHeader setOpen={setOpen} />
      <TripsWrapper
        tripAdded={tripAdded}
        setTripAdded={setTripAdded}
        trips={trips}
      />
      <Footer />
    </Box>
  );
};

export default Trips;
