import { Box, Button, Paper, Typography, useTheme } from '@mui/material';

const TripHeader = ({ setOpen }) => {
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Paper
      sx={{
        boxShadow: `0 3px 5px ${theme.palette.primary.light}`,
      }}
      className="rounded-md bg-trips-bg bg-cover bg-center bg-no-repeat w-10/12 md:w-8/12 h-20 flex items-center"
    >
      {/*NOTE:: after auth, change it to user name */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          color: theme.palette.primary.main,
          marginLeft: { xs: '25px', sm: '50px' },
        }}
      >
        Hello, name!
      </Typography>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        sx={{
          background: theme.palette.primary.main,
          marginLeft: 'auto',
          marginRight: { xs: '20px', sm: '50px', lg: '100px' },
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
          },
        }}
      >
        {/* change it when auth user */}
        Add new trip
      </Button>
    </Paper>
  );
};

export default TripHeader;
