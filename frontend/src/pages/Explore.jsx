import ListPlaces from '../components/explore/ListPlaces';
import SearchBar from '../components/explore/SearchBar';
import { Grid } from '@mui/material';
import Map from '../components/explore/Map';
import { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Explore = () => {
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 }); //lat, lng

  const [isLoading, setIsLoading] = useState(true);
  //get user location
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
        <Grid item xs={12} md={4} className="overflow-scroll">
          <SearchBar setPosition={setPosition} />
          <ListPlaces />
        </Grid>
        <Grid item xs={12} md={8}>
          {isLoading ? (
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          ) : (
            <Map position={position} setPosition={setPosition} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Explore;
