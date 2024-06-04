import {
  Paper,
  Typography,
  IconButton,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  List,
  ListItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { updatePlace } from '../../../api/placesAPI';
import { getPlacesByDate } from '../../../api/tripsAPI';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import dayjs from 'dayjs';

const IternaryDay = ({ day, trip, iternaryPlaces, setIternaryPlaces }) => {
  //   const [selectedPlace, setSelectedPlace] = useState('');
  const [dayPlaces, setDayPlaces] = useState([]);
  //   {
  //     console.log(iternaryPlaces);
  //   }

  useEffect(() => {
    const getPlacesByDay = async () => {
      const response = await getPlacesByDate(dayjs(day), trip._id);
      if (response) {
        console.log(response);
        setDayPlaces(response);
      }
    };
    getPlacesByDay();
  }, [iternaryPlaces]);

  const handleSelect = async (e) => {
    const placeId = e.target.value;
    // setSelectedPlace('');
    //set iternary places without the selected place, so user can't pick it again
    setIternaryPlaces((prev) => prev.filter((place) => place._id !== placeId));
    //add date to the selected place
    const body = { date: day };
    await updatePlace(placeId, body);
  };

  const handleDeleteDate = async (place) => {
    console.log(place);
    const placeId = place._id;
    const body = { date: '' };
    await updatePlace(placeId, body);
    setIternaryPlaces((prev) => [...prev, place]);
  };

  return (
    <ListItem>
      <Paper
        sx={{
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '10px ',
          paddingRight: '30px',
        }}
      >
        <Typography>{day}</Typography>
        <FormControl sx={{ width: '50%' }}>
          <InputLabel id="places-label">Place</InputLabel>
          <Select
            labelId="places-label"
            id="select-place"
            label="Place"
            value={''}
            onChange={handleSelect}
            sx={{ width: '100%' }}
          >
            {iternaryPlaces.length > 0 &&
              iternaryPlaces.map((option) => (
                <MenuItem key={crypto.randomUUID()} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <List>
          {dayPlaces &&
            dayPlaces.map((place) => (
              <ListItem key={place._id}>
                {place.name}
                <IconButton onClick={() => handleDeleteDate(place)}>
                  <DeleteOutlineOutlined />
                </IconButton>
              </ListItem>
            ))}
        </List>
      </Paper>
    </ListItem>
  );
};

export default IternaryDay;
