import {
  useTheme,
  Grid,
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import ListOfPlaces from '../places_visit_fav/ListOfPlaces';
import { useContext, useEffect, useRef, useState } from 'react';
import { ExploreContext } from '../../utilis/ExploreContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { getPlacesToVisit } from '../../api/tripsAPI';
import { useParams } from 'react-router-dom';
import { createPlace } from '../../api/placesAPI';
import axios from 'axios';

const PlacesToVisit = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const context = useContext(ExploreContext);
  const { places, setPlaces } = context;
  const placeRef = useRef();
  const { tripId } = useParams();

  useEffect(() => {
    fetchPlacesToVisit();
  }, []);

  const fetchPlacesToVisit = async () => {
    const placesResponse = await getPlacesToVisit(tripId);
    if (placesResponse) {
      setPlaces(placesResponse);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${
          placeRef.current.value
        }&client_id=${import.meta.env.VITE_PHOTOS_API_KEY}`
      );
      return response.data.results[2].urls.regular;
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddPlace = async () => {
    const image = await fetchImages();
    const body = { name: placeRef.current.value, img: image };
    await createPlace(tripId, body);
    placeRef.current.value = '';
    fetchPlacesToVisit();
    console.log(places);
  };

  return (
    <Grid container pt={6} pb={6} sx={{ width: '100%' }}>
      <Grid
        item
        sx={{
          typography: { ...theme.typography.h4 },
          width: '100%',
        }}
        textAlign={'center'}
      >
        <Box className="flex justify-between">
          <Typography variant="h5">
            <IconButton onClick={() => setOpen((prev) => !prev)}>
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
            Places to visit
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
          <Box
            sx={{
              width: '100%',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              padding: '10px 0',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddPlace();
              }
            }}
          >
            <TextField
              inputRef={placeRef}
              label="Add a new place"
              variant="standard"
              sx={{ width: '50%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnOutlinedIcon
                      sx={{ color: theme.palette.primary.main }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <ListOfPlaces places={places} setPlaces={setPlaces} />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default PlacesToVisit;
