import banner from '../../assets/images/myBanner.png';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  const theme = useTheme();
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 w-full overflow-x-hidden">
      <Box sx={{ width: { md: '40%', xs: '80%' } }}>
        <Typography variant="h3" gutterBottom>
          Discover Your Next Adventure!
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ width: { md: '70%', xs: '100%' } }}
        >
          Explore new destinations and create unforgettable memories with our
          travel planning app.
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: theme.palette.green.main,
            '&:hover': {
              backgroundColor: theme.palette.green.light,
            },
          }}
        >
          {/* change it when auth user */}
          <Link to="/login">Start planning</Link>
        </Button>
      </Box>
      <Box sx={{ width: { md: '40%', xs: '80%' } }}>
        <img src={banner} alt="banner" />
      </Box>
    </div>
  );
};

export default CallToAction;
