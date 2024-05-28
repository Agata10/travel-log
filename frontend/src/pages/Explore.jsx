import { Grid } from '@mui/material';
import Map from '../components/explore/Map';
import { useEffect, useContext } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import ExplorePlaces from '../components/explore/ExplorePlaces';
import { ExploreContext } from '../utilis/ExploreContext';
import { getRestaurants } from '../services/travelAPI';
import data from '../assets/places';
import CssBaseline from '@mui/material/CssBaseline';

const Explore = () => {
  const exploreContext = useContext(ExploreContext);
  const {
    position,
    setPosition,
    isLoading,
    setIsLoading,
    bounds,
    places,
    setPlaces,
  } = exploreContext;
  //get user location, browser supported method
  useEffect(() => {
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
    }, 1000);

    () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (bounds) {
      // console.log(places);
      // getRestaurants(bounds, setPlaces);
      setPlaces(data);
    }
  }, [bounds]);

  return (
    <>
      <CssBaseline />
      <Grid container spacing={1} pl={9}>
        <Grid
          item
          xs={12}
          md={5}
          mt={2}
          sx={{
            height: { xs: places.length > 0 ? 300 : 150 },
            mb: 4,
          }}
        >
          <ExplorePlaces />
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          mt={1}
          sx={{
            height: { xs: '50vh', md: '90vh' },
            paddingRight: { xs: '1rem', md: 0 },
          }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
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
