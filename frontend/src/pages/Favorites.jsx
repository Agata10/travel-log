import { useTheme, Grid } from '@mui/material';
import Footer from '../components/Footer';
import ListOfPlaces from '../components/places_visit_fav/ListOfPlaces';

const Favorites = () => {
  const theme = useTheme();

  return (
    <>
      <Grid container pt={6} pb={6}>
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
        <Grid item xs={12}>
          <ListOfPlaces />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Favorites;
