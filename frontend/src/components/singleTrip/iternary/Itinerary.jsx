import {
  useTheme,
  Grid,
  Box,
  Typography,
  IconButton,
  List,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TripContext } from '../../../utilis/context/TripContext';
import dayjs from 'dayjs';
import ItineraryDay from './ItineraryDay';

const Itinerary = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const context = useContext(TripContext);
  const { trip, places } = context;
  const [days, setDays] = useState([]);
  const [iternaryPlaces, setIternaryPlaces] = useState(null);

  useEffect(() => {
    const calculateDays = () => {
      const startDate = dayjs(trip.startDate);
      const endDate = dayjs(trip.endDate);
      const arrayOfDays = [];

      for (
        let date = startDate;
        date.isBefore(endDate) || date.isSame(endDate, 'day');
        date = date.add(1, 'day')
      ) {
        arrayOfDays.push(date.format('ll'));
      }
      setDays(arrayOfDays);
    };

    calculateDays();

    if (places) {
      //set up the places that do not have assign date or date is null
      setIternaryPlaces(
        places.filter((place) => !('date' in place) || place['date'] === null)
      );
    }
  }, [places]);

  return (
    <Grid container pt={open ? 4 : 2} sx={{ width: '100%' }}>
      <Grid
        item
        sx={{
          typography: { ...theme.typography.h4 },
          width: '100%',
        }}
        textAlign={'center'}
      >
        <Box className="flex justify-between">
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            <IconButton
              onClick={() => setOpen((prev) => !prev)}
              sx={{ color: theme.palette.primary.main }}
            >
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
            Itinerary
          </Typography>
        </Box>
      </Grid>

      {open && (
        <Grid
          item
          xs={12}
          sx={{
            width: '100%',
          }}
        >
          <Box>
            {days && (
              <List sx={{ padding: 0 }}>
                {days.map((day) => (
                  <ItineraryDay
                    key={day}
                    day={day}
                    trip={trip}
                    iternaryPlaces={iternaryPlaces}
                    setIternaryPlaces={setIternaryPlaces}
                  />
                ))}
              </List>
            )}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Itinerary;
