import { useTheme, Grid } from '@mui/material';
import Footer from '../components/Footer';
import ListOfPlaces from '../components/places_visit_fav/ListOfPlaces';
import { useContext, useEffect } from 'react';
import { TripContext } from '../utilis/context/TripContext';
import { getFavPlaces } from '../api/placesAPI';
import { AuthContext } from '../utilis/context/AuthContext';
import { ExploreContext } from '../utilis/context/ExploreContext';
import { RotatingLines } from 'react-loader-spinner';

const visitPlaces = false;

const Favorites = () => {
  const theme = useTheme();
  const context = useContext(TripContext);
  const { places, setPlaces } = context;
  const authContext = useContext(AuthContext);
  const { authUser } = authContext;
  const exploreContext = useContext(ExploreContext);
  const { setIsLoading, isLoading } = exploreContext;

  const setUpFavPlaces = async () => {
    setIsLoading(true);
    const userId = authUser?._id;
    if (userId) {
      const data = await getFavPlaces(userId);
      if (data) {
        setPlaces(data);
      }
    }
    setIsLoading(false);
  };

  //set places to favorites from db when first loaded
  useEffect(() => {
    setUpFavPlaces();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-5/6">
        <RotatingLines
          visible={true}
          height="80"
          width="80"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  return (
    <>
      <Grid container pt={6}>
        <Grid
          item
          xs={12}
          sx={{
            typography: { ...theme.typography.h3 },
            fontWeight: 600,
            color: theme.palette.primary.dark,
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
          {places && (
            <ListOfPlaces
              places={places}
              setPlaces={setPlaces}
              visitPlaces={visitPlaces}
            />
          )}
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
