import SingleTripHeader from '../components/singleTrip/SingleTripHeader';
import { Box } from '@mui/material';
const SingleTrip = () => {
  return (
    <Box
      className="w-full flex flex-col items-center gap-10 min-h-screen"
      pt={4}
    >
      <SingleTripHeader />
    </Box>
  );
};

export default SingleTrip;
