import { Button, Paper, Typography, useTheme } from '@mui/material';

const TripHeader = ({ setOpen }) => {
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Paper
      sx={{ boxShadow: '0 2px 5px #99d19c' }}
      className="bg-trips-bg bg-cover bg-center bg-no-repeat w-10/12 md:w-8/12 h-20 flex justify-around items-center"
    >
      {/* change it to user name */}
      <Typography variant="h5">Hello, name!</Typography>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        size="small"
        sx={{
          background: theme.palette.primary.main,
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
