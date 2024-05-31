import { Paper, Typography, useTheme, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const SingleTripHeader = () => {
  const theme = useTheme();
  return (
    <Paper
      sx={{ boxShadow: '0 2px 5px #99d19c' }}
      className="bg-trips-bg bg-cover bg-center bg-no-repeat w-10/12 md:w-8/12 h-20 flex justify-around items-center"
    >
      {/* change it to user name */}
      <Typography variant="h5">Hello, name!</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          // minDate={dayjs()}
          // inputRef={startDateRef}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'red',
                  },
                  '&:hover fieldset': {
                    borderColor: 'green',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'purple',
                  },
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
    </Paper>
  );
};

export default SingleTripHeader;
