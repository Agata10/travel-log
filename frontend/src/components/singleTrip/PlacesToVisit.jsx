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
const PlacesToVisit = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const context = useContext(ExploreContext);
  const { places, setPlaces } = context;
  const placeRef = useRef();
  const { tripId } = useParams();

  const fetchPlacesToVisit = async () => {
    const placesResponse = await getPlacesToVisit(tripId);
    if (placesResponse) {
      setPlaces(placesResponse);
    }
  };
  ///set places from api to places to visit
  useEffect(() => {
    fetchPlacesToVisit();
  }, []);

  const fetchImages = async () => {
    try {
      // const response = await axios.get(
      //   `https://api.unsplash.com/search/photos?query=${place.name}&client_id=${
      //     import.meta.env.VITE_PHOTOS_API_KEY
      //   }`
      // );
      // setImage(response.data.results[0].urls.small);
      // return response.data.results[0].urls.small;
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddPlace = async () => {
    await createPlace(tripId, { name: placeRef.current.value });
    placeRef.current.value = '';
    fetchPlacesToVisit();
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
