import { useContext, useState, useEffect } from 'react';
import { ExploreContext } from '../../utilis/ExploreContext';
import { Typography, Rating } from '@mui/material';
import data from '../../assets/fakeData_testing/places';

const FilterMapHeader = () => {
  const expoloreContext = useContext(ExploreContext);
  const { searchPlaces, setSearchPlaces } = expoloreContext;
  const [rating, setRating] = useState(3);
  //Depending on select option restaurants,attractions hotels, call api
  //Depending on rating filter places

  return (
    <>
      {console.log(searchPlaces)}
      <div>
        <Typography component="legend" sx={{ textAlign: 'center' }}>
          Rating
        </Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          precision={0.5}
          onChange={async (event, newValue) => {
            //filter the places, if rating is 4.0 show from 4.0 and more
            setRating(newValue);
            setSearchPlaces((prev) => [
              ...prev.filter((place) => place.rating >= newValue),
            ]);
            //NOTE:
            //If no places found and user clicks again rating set the places
            // by calling api and filter it, based on rating
            if (searchPlaces.length === 0) {
              setSearchPlaces(data.filter((place) => place.rating >= newValue));
            }
          }}
        />
      </div>
    </>
  );
};

export default FilterMapHeader;
