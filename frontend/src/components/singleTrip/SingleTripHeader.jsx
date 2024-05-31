import { Paper, TextField, useTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useContext, useEffect, useRef } from 'react';
import { TripContext } from '../../utilis/TripContext';
import { InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';
import { updateTrip } from '../../api/tripsAPI';

const SingleTripHeader = ({ setRefresh }) => {
  const theme = useTheme();
  const inputRef = useRef();
  const tripContext = useContext(TripContext);
  const { trip, setTrip, startDate, endDate, setStartDate, setEndDate } =
    tripContext;
  const { tripId } = useParams();

  useEffect(() => {
    const updateTripData = async (body) => {
      const response = await updateTrip(tripId, body);
      console.log(response);
      if (response) {
        setTrip(response);
      }
    };

    updateTripData({ startDate: startDate, endDate: endDate });
  }, [startDate, endDate]);

  const handleEndDateChange = (day) => {
    if (dayjs(day).isBefore(startDate)) {
      alert('You can not end trip before the start date');
      setRefresh((prev) => !prev);
      return;
    } else {
      setEndDate(dayjs(day));
    }
  };

  const handleStartDateChange = (day) => {
    if (dayjs(day).isAfter(endDate)) {
      alert('You can not start trip after the end date');
      setRefresh((prev) => !prev);
      return;
    } else {
      setStartDate(dayjs(day));
    }
  };

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <Paper
      sx={{ boxShadow: '0 2px 5px #99d19c' }}
      className="w-10/12 md:w-8/12 h-20 flex justify-around items-center"
    >
      {/* change it to user name */}
      <TextField
        inputRef={inputRef}
        value={trip.name}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: '1.5rem',
            fontWeight: 'semi-bold',
            width: '50%',
            '& .MuiInputBase-input': {
              paddingRight: '0px',
            },
            '&:hover ': {
              borderBottom: `1px solid ${theme.palette.primary.dark}`,
            },
          },

          endAdornment: (
            <InputAdornment position="end">
              <EditIcon
                sx={{ color: theme.palette.primary.dark }}
                onClick={handleFocus}
              />
            </InputAdornment>
          ),
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Start Date"
          minDate={dayjs(trip?.startDate)}
          value={startDate}
          onChange={(date) => handleStartDateChange(date)}
        />
        <DesktopDatePicker
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
