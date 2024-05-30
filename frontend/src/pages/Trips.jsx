import { Box, Paper } from '@mui/material';
const Trips = () => {
  return (
    <>
      <Box
        className="w-full flex flex-col items-center pl-4"
        sx={{ height: '85vh' }}
        pt={4}
      >
        <Paper className="bg-trips-bg bg-cover bg-center bg-no-repeat w-10/12 h-24"></Paper>
      </Box>
    </>
  );
};

export default Trips;
