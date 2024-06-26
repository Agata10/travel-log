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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { getPlacesToVisit } from '../../api/tripsAPI';
import { useParams } from 'react-router-dom';
import { createPlace } from '../../api/placesAPI';
import { TripContext } from '../../utilis/context/TripContext';
import { AuthContext } from '../../utilis/context/AuthContext';
import { fetchImages } from '../../services/imagesAPI';
import { uploadImg } from '../../services/cloudinaryAPI';

//to pass that visit places screen, not favorites to listOfPlaces component
const visitPlaces = true;

const PlacesToVisit = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const context = useContext(TripContext);
  const { places, setPlaces } = context;
  const authContext = useContext(AuthContext);
  const { authUser } = authContext;
  const placeRef = useRef();
  const { tripId } = useParams();

  const fetchPlacesToVisit = async () => {
    const placesResponse = await getPlacesToVisit(tripId);
    if (placesResponse) {
      setPlaces(placesResponse);
    }
  };

  useEffect(() => {
    fetchPlacesToVisit();
  }, []);

  const handleAddPlace = async () => {
    const image = await fetchImages(placeRef.current.value);
    const cloudImg = await uploadImg(image);

    const body = {
      name: placeRef.current.value,
      img: cloudImg,
      userId: authUser._id,
      tripId: tripId,
    };
    await createPlace(body);
    placeRef.current.value = '';
    fetchPlacesToVisit();
  };

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
              padding: '10px ',
              paddingRight: '30px',
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
              sx={{ width: { xs: '80%', md: '50%' }, marginBottom: '1.5rem' }}
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
          <Box sx={{ width: '100%' }}>
            {places && (
              <ListOfPlaces
                places={places}
                setPlaces={setPlaces}
                visitPlaces={visitPlaces}
              />
            )}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default PlacesToVisit;
