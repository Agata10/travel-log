import { Box } from '@mui/material';
import CallToAction from '../components/home/CallToAction';
import Features from '../components/home/Features';
const Homepage = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={8}
      marginTop={4}
      marginBottom={8}
    >
      <CallToAction />
      <Features />
    </Box>
  );
};

export default Homepage;
