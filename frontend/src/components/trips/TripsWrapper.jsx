import TripCard from './TripCard';
import { Grid, useTheme } from '@mui/material';
import { Typography } from '@mui/material';

const TripsWrapper = ({ setTripAdded, trips }) => {
  return (
    <div className="w-full md:w-10/12 flex flex-col items-center justify-center gap-1 md:gap-4 min-h-4/6 pb-32">
      <Typography
        variant="h3"
        sx={{ fontWeight: 600, color: useTheme().palette.primary.dark }}
      >
        Your trips
      </Typography>
      <Grid
        container
        className="w-full gap-4 md:gap-8 mt-2 flex justify-center"
      >
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
