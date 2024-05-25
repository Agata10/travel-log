import ListPlaces from '../components/explore/ListPlaces';
import SearchBar from '../components/explore/SearchBar';
import { Grid } from '@mui/material';
import Map from '../components/explore/Map';
const Explore = () => {
  return (
    <div className="w-full h-screen">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SearchBar />
          <ListPlaces />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
    </div>
  );
};

export default Explore;
