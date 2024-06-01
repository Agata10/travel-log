import { useTheme, Grid } from '@mui/material';
import Footer from '../components/Footer';
import ListOfPlaces from '../components/places_visit_fav/ListOfPlaces';
import { useContext } from 'react';
import { TripContext } from '../utilis/TripContext';

const Favorites = () => {
  const theme = useTheme();
  const context = useContext(TripContext);
  const { places, setPlaces } = context;

  //set places to favorites from db when first loaded

  return (
    <>
      <Grid container pt={6}>
        <Grid
          item
          xs={12}
          sx={{ typography: { ...theme.typography.h4 } }}
          textAlign={'center'}
          mr={4}
          mb={5}
        >
          Your favorites
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ overflow: 'auto', margin: '0 auto', position: 'relative' }}
        >
          {places && <ListOfPlaces places={places} setPlaces={setPlaces} />}
        </Grid>
        <Grid
          item
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
