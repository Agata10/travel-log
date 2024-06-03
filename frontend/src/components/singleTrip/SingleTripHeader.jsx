import { Paper, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useContext, useRef } from 'react';
import { TripContext } from '../../utilis/TripContext';
import { useParams } from 'react-router-dom';
import { updateTrip } from '../../api/tripsAPI';

const SingleTripHeader = ({ setRefresh }) => {
  const tripContext = useContext(TripContext);
  const { trip, setTrip } = tripContext;
  const { tripId } = useParams();
  const inputRef = useRef();
  const startRef = useRef(trip.startDate);
  const endRef = useRef(trip.endDate);

  const updateTripData = async (body) => {
    const response = await updateTrip(tripId, body);
    if (response) {
      setTrip(response);
    }
  };

  //When user pick end date before start date, there is need to reload the component,
  //since date picker is leaving picked date by user
  const handleEndDateChange = (day) => {
    if (dayjs(day).isBefore(dayjs(startRef.current.value))) {
      alert('You can not end trip before the start date');
      setRefresh((prev) => !prev);
      return;
    } else {
      updateTripData({ endDate: day });
    }
  };

  const handleStartDateChange = (day) => {
    if (dayjs(day).isAfter(dayjs(endRef.current.value))) {
      alert('You can not start trip after the end date');
      setRefresh((prev) => !prev);
      return;
    } else {
      updateTripData({ startDate: day });
    }
  };

  const handleInputBlur = () => {
    console.log(inputRef.current.value);
    if (inputRef.current.value !== trip.name) {
      updateTripData({ name: inputRef.current.value });
    }
  };

  return (
    <Paper
      sx={{ boxShadow: '0 2px 5px #99d19c' }}
      className="w-10/12 md:w-8/12 h-20 flex justify-around items-center"
    >
      {/* change it to user name */}
      <div className="w-3/12">
        <TextField
          inputRef={inputRef}
          defaultValue={trip.name}
          variant="standard"
          onBlur={handleInputBlur}
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: '1.5rem',
              fontWeight: 'semi-bold',
              width: 'fit-content',
              '&:hover': {
                backgroundColor: 'whitesmoke',
                borderRadius: '12px',
                paddingLeft: '2px',
              },
            },
          }}
        />
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          inputRef={startRef}
          label="Start Date"
          minDate={dayjs(trip?.startDate)}
          defaultValue={dayjs(trip.startDate)}
          onChange={(date) => handleStartDateChange(date)}
        />
        <DesktopDatePicker
          inputRef={endRef}
          label="End Date"
          minDate={dayjs(trip?.startDate)}
          defaultValue={dayjs(trip.endDate)}
          onChange={(date) => handleEndDateChange(date)}
        />
      </LocalizationProvider>
    </Paper>
  );
};

export default SingleTripHeader;
