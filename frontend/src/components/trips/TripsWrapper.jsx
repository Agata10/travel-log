import TripCard from './TripCard';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const TripsWrapper = ({ tripAdded }) => {
  const [trips, setTrips] = useState(null);
  useEffect(() => {
    const getTrips = async () => {
      try {
        const response = await axios(
          `${import.meta.env.VITE_BASE_URL}/trips/6637f3825bfc1879d0f2273d`
        );
        setTrips(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTrips();
  }, [tripAdded]);
  return (
    <div className="w-full md:w-10/12 flex flex-col items-center gap-1 md:gap-4 min-h-4/6">
      <Typography variant="h3">Your trips</Typography>
      <Grid container columns={12} className="gap-4 md:gap-8 mt-2">
        {trips &&
          trips.map((trip) => {
            return (
              <Grid item key={trip._id}>
                <TripCard trip={trip} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default TripsWrapper;
