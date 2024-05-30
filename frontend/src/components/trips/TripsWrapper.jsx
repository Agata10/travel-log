import TripCard from './TripCard';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

const TripsWrapper = () => {
  useEffect(() => {}, []);
  return (
    <div className="w-full md:w-10/12 flex flex-col items-center gap-1 md:gap-4">
      <Typography variant="h3">Your trips</Typography>
      <Grid container columns={12} className="gap-4 md:gap-8 mt-2">
        <Grid item>
          <TripCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default TripsWrapper;
