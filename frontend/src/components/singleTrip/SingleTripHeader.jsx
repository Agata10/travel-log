import { Paper, Typography, useTheme, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { TripContext } from '../../utilis/TripContext';
const SingleTripHeader = () => {
  const tripContext = useContext(TripContext);
  const { trip } = tripContext;
  const [startDate, setStartDate] = useState(dayjs(trip?.startDate));
  const [endDate, setEndDate] = useState(dayjs(trip?.endDate));

  const handleEndDateChange = (day) => {
    if (dayjs(day).isBefore(startDate)) {
      alert('You can not end trip before the start date');
      setEndDate(dayjs(trip?.endDate));
      return;
    } else {
      setEndDate(dayjs(day));
    }
  };

  const handleStartDateChange = (day) => {
    if (dayjs(day).isAfter(endDate)) {
      alert('You can not start trip after the end date');
      setStartDate(dayjs(trip?.startDate));
      return;
    } else {
      setStartDate(dayjs(day));
    }
  };

  return (
    <Paper
      sx={{ boxShadow: '0 2px 5px #99d19c' }}
      className="bg-trips-bg bg-cover bg-center bg-no-repeat w-10/12 md:w-8/12 h-20 flex justify-around items-center"
    >
      {/* change it to user name */}
      <Typography variant="h5">{trip.name}</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          minDate={dayjs(trip?.startDate)}
          value={startDate}
          onChange={(date) => handleStartDateChange(date)}
        />
        <DatePicker
          label="End Date"
          minDate={dayjs(trip?.startDate)}
          value={endDate}
          onChange={(date) => handleEndDateChange(date)}
        />
      </LocalizationProvider>
    </Paper>
  );
};

export default SingleTripHeader;
