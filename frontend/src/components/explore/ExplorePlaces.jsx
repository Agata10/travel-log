import ListPlaces from './ListPlaces';
import SearchBar from './SearchBar';
import FilterMapHeader from './FilterMapHeader';
import { useContext } from 'react';
import { ExploreContext } from '../../utilis/ExploreContext';

const ExplorePlaces = () => {
  const exploreContext = useContext(ExploreContext);
  const { setPosition } = exploreContext;
  return (
    <div className="overflow-scroll flex flex-col items-center pt-4">
      <SearchBar setPosition={setPosition} />
      <FilterMapHeader />
      <ListPlaces />
    </div>
  );
};

export default ExplorePlaces;
