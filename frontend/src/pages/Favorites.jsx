import { useTheme, Grid } from '@mui/material';
import Footer from '../components/Footer';
import ListOfPlaces from '../components/places_visit_fav/ListOfPlaces';
import { useContext, useEffect } from 'react';
import { TripContext } from '../utilis/TripContext';
import { getFavPlaces } from '../api/placesAPI';

const Favorites = () => {
  const theme = useTheme();
  const context = useContext(TripContext);
  const { places, setPlaces } = context;

  ///NOTE: delete userId, make it accessible  only for log in user
  const setUpFavPlaces = async () => {
    const userId = '6637f3825bfc1879d0f2273d';
    const data = await getFavPlaces(userId);
    if (data) {
      setPlaces(data);
    }
  };

  //set places to favorites from db when first loaded
  useEffect(() => {
    setUpFavPlaces();
  }, []);

  return (
    <>
      <Grid container pt={6}>
        <Grid
          item
          xs={12}
          sx={{
            typography: { ...theme.typography.h3 },
            fontWeight: 600,
            color: useTheme().palette.primary.dark,
          }}
          textAlign={'center'}
          mr={4}
          mb={5}
        >
          Your favorites
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            overflow: 'auto',
            margin: '0 auto',
            position: 'relative',
            height: '80vh',
          }}
        >
          {places && <ListOfPlaces places={places} setPlaces={setPlaces} />}
        </Grid>
        <Grid
          item
          pb={8}
          sx={{
            width: '100%',
          }}
        >
          {places && <Footer />}
        </Grid>
      </Grid>
    </>
  );
};

export default Favorites;
