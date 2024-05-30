import { Box } from '@mui/material';
import TripHeader from '../components/trips/TripHeader';
import TripsWrapper from '../components/trips/TripsWrapper';
import Footer from '../components/Footer';
const Trips = () => {
  return (
    <Box className="w-full flex flex-col items-center gap-10 h-screen" pt={4}>
      <TripHeader />
      <TripsWrapper />
      <Footer />
    </Box>
  );
};

export default Trips;
