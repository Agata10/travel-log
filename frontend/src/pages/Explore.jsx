import { Grid } from '@mui/material';
import Map from '../components/explore/Map';
import { useState, useEffect, useContext } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import ExplorePlaces from '../components/explore/ExplorePlaces';
import { ExploreContext } from '../utilis/ExploreContext';

const Explore = () => {
  const exploreContext = useContext(ExploreContext);
  const { setPosition, isLoading, setIsLoading } = exploreContext;
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

  return (
    <div className="w-full h-screen">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ExplorePlaces />
        </Grid>
        <Grid item xs={12} md={8}>
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
    </div>
  );
};

export default Explore;
