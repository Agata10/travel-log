import { Grid, Alert } from '@mui/material';
import Map from '../components/explore/Map';
import { useEffect, useContext } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import ExplorePlaces from '../components/explore/ExplorePlaces';
import { ExploreContext } from '../utilis/context/ExploreContext.jsx';
import { getRestaurants } from '../services/travelAPI';
import CssBaseline from '@mui/material/CssBaseline';
// import data from '../assets/fakeData_testing/places.js';
import DialogAddPlaceToTrip from '../components/explore/DialogAddPlaceToTrip.jsx';

const Explore = () => {
  const exploreContext = useContext(ExploreContext);
  const {
    position,
    setPosition,
    isLoading,
    setIsLoading,
    bounds,
    searchPlaces,
    setSearchPlaces,
    showAlert,
    setShowAlert,
    setPrevPlaces,
  } = exploreContext;

  const setPlacesList = async () => {
    const placesData = await getRestaurants(bounds);
    // console.log(placesData);
    if (placesData) {
      setPrevPlaces(placesData);
      setSearchPlaces(placesData);
    }
  };

  //get user location to set starting position, browser supported method
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
          console.log('Error, no position avaiable');
        }
      );
    }, 800);

    () => clearTimeout(timeout);
  }, []);

  //when page first loaded, load the places list as restaurants from Travel API
  useEffect(() => {
    if (bounds) {
      // setPlacesList();
      // setSearchPlaces(data);
    }
  }, [position,bounds]);

  return (
    <>
      <CssBaseline />
      {showAlert && (
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          Successfully added to favorites!
        </Alert>
      )}
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          md={5}
          mt={2}
          sx={{
            height:
              searchPlaces.length > 0
                ? '55vh'
                : { xs: '45vh', sm: '40vh', md: '70vh' },
            mb: { xs: 0, lg: 4 },
            paddingRight:
              searchPlaces.length > 0 ? { xs: '1rem', md: '0.5rem' } : '0.5rem',
          }}
        >
          <DialogAddPlaceToTrip />
          <ExplorePlaces setShowAlert={setShowAlert} />
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            height:
              searchPlaces.length > 0
                ? { xs: '50vh', md: '90vh' }
                : { xs: '60vh', sm: '70vh', md: '90vh' },
            paddingRight:
              searchPlaces.length > 0 ? { xs: '1rem', md: '0.5rem' } : '0.5rem',
            mt: { xs: 0, md: 1 },
          }}
        >
          {isLoading ? (
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
          ) : (
            <Map />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Explore;
