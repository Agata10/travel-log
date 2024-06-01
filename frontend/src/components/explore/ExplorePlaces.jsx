import ListSearchPlaces from './ListSearchPlaces';
import SearchBar from './SearchBar';
import FilterMapHeader from './FilterMapHeader';
import { useContext } from 'react';
import { ExploreContext } from '../../utilis/ExploreContext';
import { Box } from '@mui/material';
// import axios from 'axios';
// import { getRestaurants } from '../../services/travelAPI';

const ExplorePlaces = () => {
  const exploreContext = useContext(ExploreContext);
  const { setPosition } = exploreContext;

  return (
    <Box className="flex flex-col items-center">
      <SearchBar setPosition={setPosition} />
      <FilterMapHeader />
      <ListSearchPlaces />
    </Box>
  );
};

export default ExplorePlaces;
