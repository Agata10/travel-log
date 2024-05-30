import { Box } from '@mui/material';
import TripHeader from '../components/trips/TripHeader';
import TripsWrapper from '../components/trips/TripsWrapper';
const Trips = () => {
  return (
    <Box className="w-full flex flex-col items-center gap-10" pt={4}>
      <TripHeader />
      <TripsWrapper />
    </Box>
  );
};

export default Trips;
