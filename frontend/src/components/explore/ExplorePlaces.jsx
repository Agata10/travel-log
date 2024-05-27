import ListPlaces from './ListPlaces';
import SearchBar from './SearchBar';
import FilterMapHeader from './FilterMapHeader';
import { useContext, useEffect } from 'react';
import { ExploreContext } from '../../utilis/ExploreContext';
import axios from 'axios';
import { getRestaurants } from '../../services/travelAPI';

const ExplorePlaces = () => {
  const exploreContext = useContext(ExploreContext);
  const { setPosition } = exploreContext;

  return (
    <div className="h-screen w-full pt-4 flex flex-col items-center">
      <SearchBar setPosition={setPosition} />
      <FilterMapHeader />
      <ListPlaces />
    </div>
  );
};

export default ExplorePlaces;
