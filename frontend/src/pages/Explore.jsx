import ExplorePlacesList from '../components/ExplorePlacesList';
import SearchBar from '../components/SearchBar';
import { Grid } from '@mui/material';
import Map from '../components/Map';
const Explore = () => {
  return (
    <>
      <Grid container className="w-full" spacing={3}>
        <Grid item xs={12} md={6}>
          <SearchBar />
          <ExplorePlacesList />
        </Grid>
        <Grid item xs={12} md={6}>
          <Map />
        </Grid>
      </Grid>
    </>
  );
};

export default Explore;
