import TripCard from './TripCard';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

const TripsWrapper = ({ setTripAdded, trips }) => {
  return (
    <div className="w-full md:w-10/12 flex flex-col items-center gap-1 md:gap-4 min-h-4/6">
      <Typography variant="h3">Your trips</Typography>
      <Grid container columns={12} className="gap-4 md:gap-8 mt-2">
        {trips &&
          trips.map((trip) => {
            return (
              <Grid item key={trip._id} id={trip._id}>
                <TripCard trip={trip} setTripAdded={setTripAdded} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default TripsWrapper;
