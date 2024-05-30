import banner from '../../assets/images/myBanner.png';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  const theme = useTheme();
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-0 md:gap-10 sm:w-10/12 md:w-full">
      <Box sx={{ width: { md: '40%', xs: '80%' } }}>
        <Typography variant="h3" gutterBottom>
          Discover Your Next Adventure!
        </Typography>
        <Typography
          gutterBottom
          sx={{
            width: { md: '70%', xs: '100%' },
            fontSize: { xs: 'h5', sm: 'h4', md: 'h6' },
          }}
        >
          Explore new destinations and create unforgettable memories with our
          travel planning app.
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            background: theme.palette.green.main,
            marginBottom: '1rem',
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
