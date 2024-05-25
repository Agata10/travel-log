import ListPlaces from '../components/explore/ListPlaces';
import SearchBar from '../components/explore/SearchBar';
import { Grid } from '@mui/material';
import Map from '../components/explore/Map';
const Explore = () => {
  return (
    <Grid container>
      <Grid item md={6}>
        <SearchBar />
        <ListPlaces />
      </Grid>
      <Grid item md={6}>
        <Map />
      </Grid>
    </Grid>
  );
};

export default Explore;
