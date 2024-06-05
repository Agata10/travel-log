import { Box, Paper, Typography, useTheme, styled } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SavingsIcon from '@mui/icons-material/Savings';
import EditNoteIcon from '@mui/icons-material/EditNote';

const MyPaper = styled(Paper)(() => ({
  width: '150px',
  height: '150px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 10px',
  textAlign: 'center',
  borderRadius: '8px',
}));

const Features = () => {
  const theme = useTheme();

  return (
    <Box
      display={'flex'}
      sx={{
        flexDirection: 'column',
        gap: 4,
        textAlign: 'center',
        width: { xs: '95%', sm: '80%' },
        margin: '0px auto',
        paddingBottom: '80px',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 500, color: 'black' }}>
        Features to make planning trips easier
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', sm: 'space-around' },
          alignItems: 'center',
          gap: { xs: 3, md: 0 },
          width: '100%',
          margin: '0 auto',
        }}
      >
        <MyPaper>
          <EditNoteIcon
            sx={{ fontSize: '3.8rem', color: theme.palette.primary.dark }}
          />
          <Typography variant="body1">
            Manage your trips in one place
          </Typography>
        </MyPaper>
        <MyPaper>
          <TravelExploreIcon
            sx={{ fontSize: '3.2rem', color: theme.palette.primary.dark }}
          />
          <Typography variant="body1">
            Explore hotels, attractions and restaurants
          </Typography>
        </MyPaper>
        <MyPaper>
          <FavoriteBorderIcon
            sx={{ fontSize: '3.2rem', color: theme.palette.primary.dark }}
          />
          <Typography variant="body1">Save your favorite places</Typography>
        </MyPaper>
        <MyPaper>
          <SavingsIcon
            sx={{ fontSize: '3.2rem', color: theme.palette.primary.dark }}
          />
          <Typography variant="body1">Track your trip expenses</Typography>
        </MyPaper>
      </Box>
    </Box>
  );
};

export default Features;
