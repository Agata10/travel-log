import ListPlaces from './ListPlaces';
import SearchBar from './SearchBar';
import FilterMapHeader from './FilterMapHeader';
import { useContext, useEffect } from 'react';
import { ExploreContext } from '../../utilis/ExploreContext';
import axios from 'axios';

const ExplorePlaces = () => {
  const exploreContext = useContext(ExploreContext);
  const { setPosition } = exploreContext;

  // useEffect(() => {
  //   const getPlacesData = async () => {
  //     const options = {
  //       method: 'GET',
  //       url: 'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary',
  //       params: {
  //         bl_latitude: '11.847676',
  //         tr_latitude: '12.838442',
  //         bl_longitude: '109.095887',
  //         tr_longitude: '109.149359',
  //         restaurant_tagcategory_standalone: '10591',
  //         restaurant_tagcategory: '10591',
  //         limit: '30',
  //         currency: 'USD',
  //         open_now: 'false',
  //         lunit: 'km',
  //         lang: 'en_US',
  //       },
  //       headers: {
  //         'x-rapidapi-key': import.meta.env.VITE_TRAVEL_API_KEY,
  //         'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
  //       },
  //     };

  //     try {
  //       const response = await axios.request(options);
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getPlacesData();
  // }, []);
  return (
    <div className="h-screen w-full pt-4 flex flex-col items-center">
      <SearchBar setPosition={setPosition} />
      <FilterMapHeader />
      <ListPlaces />
    </div>
  );
};

export default ExplorePlaces;
