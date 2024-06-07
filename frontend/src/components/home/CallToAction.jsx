import banner from '../../assets/images/back4.png';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../utilis/context/AuthContext';

const CallToAction = () => {
  const theme = useTheme();
  const { authUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-0 md:gap-10 sm:w-10/12 md:w-full">
      <Box sx={{ width: { md: '40%', xs: '80%' } }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 500, color: theme.palette.dark }}
        >
          Discover Your Next Adventure!
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          sx={{
            fontWeight: 400,
            width: { xs: '100%', md: '70%' },
          }}
        >
          Explore new destinations and create unforgettable memories with our
          travel planning app.
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            background: theme.palette.primary.main,
            marginBottom: '1rem',
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          <Link to={!authUser ? '/login' : '/trips'}>Start planning</Link>
        </Button>
      </Box>
      <Box sx={{ width: { md: '40%', xs: '80%' } }}>
        <img src={banner} alt="banner" />
      </Box>
    </div>
  );
};

export default CallToAction;
