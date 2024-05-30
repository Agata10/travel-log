import { Box } from '@mui/material';
import CallToAction from '../components/home/CallToAction';
import Features from '../components/home/Features';
import Footer from '../components/Footer';
const Homepage = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={8} marginTop={4}>
      <CallToAction />
      <Features />
      <Footer />
    </Box>
  );
};

export default Homepage;
