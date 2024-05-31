import { useEffect, useState, useContext } from 'react';
import SingleTripHeader from '../components/singleTrip/SingleTripHeader';
import { Box } from '@mui/material';
import { getSingleTrip } from '../api/tripsAPI';
import { useParams } from 'react-router-dom';
import { TripContext } from '../utilis/TripContext';
const SingleTrip = () => {
  const tripContext = useContext(TripContext);
  const { trip, setTrip } = tripContext;
  const { tripId } = useParams();

  const fetchData = async () => {
    const tripResponse = await getSingleTrip(tripId);
    if (tripResponse) {
      setTrip(tripResponse);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tripId]);

  return (
    <Box
      className="w-full flex flex-col items-center gap-10 min-h-screen"
      pt={4}
    >
      {trip && <SingleTripHeader />}
    </Box>
  );
};

export default SingleTrip;
