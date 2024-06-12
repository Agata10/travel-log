import { useContext, useState } from 'react';
import { ExploreContext } from '../../utilis/context/ExploreContext';
import {
  Typography,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  useTheme,
} from '@mui/material';
// import data from '../../assets/fakeData_testing/places';
import {
  getAttractions,
  getHotels,
  getRestaurants,
} from '../../services/travelAPI';

const options = ['Restaurants', 'Hotels', 'Attractions'];
const FilterMapHeader = () => {
  const expoloreContext = useContext(ExploreContext);
  const { setSearchPlaces, bounds, prevPlaces } = expoloreContext;
  const [selectedCategory, setSelectedCategory] = useState(options[0]);
  const [rating, setRating] = useState(3);
  const theme = useTheme();

  //Depending on select option restaurants,attractions hotels, call api
  //Depending on rating filter places
  const setPlacesList = async (category) => {
    let placesData;
    switch (category) {
      case 'Restaurants':
        placesData = await getRestaurants(bounds);
        if (placesData) {
          setSearchPlaces(placesData);
        }
        break;
      case 'Hotels':
        placesData = await getHotels(bounds);
        if (placesData) {
          setSearchPlaces(placesData);
        }
        break;
      case 'Attractions':
        placesData = await getAttractions(bounds);
        if (placesData) {
          setSearchPlaces(placesData);
        }
        break;
      default:
        setSearchPlaces([]);
        break;
    }
  };

  const handleSelect = async (e) => {
    setSelectedCategory(e.target.value);
    if (bounds) {
      setPlacesList(e.target.value);
    }
  };

  const handleRating = async (event, newValue) => {
    {
      //if user click lower rating than previous, instead of calling api.
      //get places from previous places that were saved
      //or if no places found
      if (newValue < rating) {
        setRating(newValue);
        setSearchPlaces(prevPlaces.filter((place) => place.rating >= newValue));
        return;
      }
      //filter the places, if rating is 4.0 show from 4.0 and more
      setRating(newValue);
      setSearchPlaces((prev) => [
        ...prev.filter((place) => place.rating >= newValue),
      ]);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 1, lg: 3 },
        marginTop: '15px',
      }}
    >
      <FormControl sx={{ width: { xs: '45%', lg: '25%' } }}>
        <InputLabel id="trips-label">Category</InputLabel>
        <Select
          labelId="trips-label"
          id="select-trip"
          value={selectedCategory}
          label="Category"
          onChange={handleSelect}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
              borderWidth: '2px',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <Typography
          component="legend"
          sx={{
            textAlign: 'center',
            color: theme.palette.primary.main,
            fontWeight: 500,
          }}
        >
          Rating
        </Typography>
        <Rating
          sx={{
            fontSize: { xs: '1rem', sm: '1.5rem' },
          }}
          name="simple-controlled"
          value={rating}
          size="medium"
          precision={0.5}
          onChange={(event, newValue) => handleRating(event, newValue)}
        />
      </div>
    </Box>
  );
};

export default FilterMapHeader;
