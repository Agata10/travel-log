import { Box } from '@mui/material';
import TripHeader from '../components/trips/TripHeader';
import TripsWrapper from '../components/trips/TripsWrapper';
import Footer from '../components/Footer';
import { useState } from 'react';
import DialogAddTrip from '../components/trips/DialogAddTrip';
const Trips = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box className="w-full flex flex-col items-center gap-10 h-screen" pt={4}>
      <DialogAddTrip open={open} setOpen={setOpen} />
      <TripHeader setOpen={setOpen} />
      <TripsWrapper />
      <Footer />
    </Box>
  );
};

export default Trips;
