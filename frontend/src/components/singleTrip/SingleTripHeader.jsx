import { Box, Paper, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useContext, useRef } from 'react';
import { TripContext } from '../../utilis/TripContext';
import { useParams } from 'react-router-dom';
import { updateTrip } from '../../api/tripsAPI';
import { useTheme } from '@mui/material';

const SingleTripHeader = ({ setRefresh }) => {
  const tripContext = useContext(TripContext);
  const { trip, setTrip } = tripContext;
  const { tripId } = useParams();
  const inputRef = useRef();
  const startRef = useRef(trip.startDate);
  const endRef = useRef(trip.endDate);
  const theme = useTheme();

  const pickerStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.dark,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '& .MuiSvgIcon-root': {
        color: theme.palette.primary.main,
      },
    },
  };

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
    if (inputRef.current.value !== trip.name) {
      updateTripData({ name: inputRef.current.value });
    }
  };

  return (
    <Paper
      sx={{
        boxShadow: `0 2px 3px ${theme.palette.primary.light}`,
        borderRadius: '8px',
      }}
      className="w-11/12 md:w-8/12 h-fit sm:h-20 flex flex-col sm:flex-row gap-3 justify-around items-center py-3 sm:py-0 px-4"
    >
      <div className="w-6/12 sm:w-4/12 text-center">
        <TextField
          inputRef={inputRef}
          defaultValue={trip.name}
          variant="standard"
          onBlur={handleInputBlur}
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: theme.typography.h4,
              fontWeight: 600,
              color: theme.palette.primary.main,
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            inputRef={startRef}
            label="Start Date"
            minDate={dayjs(trip?.startDate)}
            defaultValue={dayjs(trip.startDate)}
            onChange={(date) => handleStartDateChange(date)}
            sx={pickerStyle}
          />
          <DesktopDatePicker
            inputRef={endRef}
            label="End Date"
            minDate={dayjs(trip?.startDate)}
            defaultValue={dayjs(trip.endDate)}
            onChange={(date) => handleEndDateChange(date)}
            sx={pickerStyle}
          />
        </LocalizationProvider>
      </Box>
    </Paper>
  );
};

export default SingleTripHeader;
