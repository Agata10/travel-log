import { useState } from 'react';
import data from './places';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PlaceCard from './PlaceCard';

const ListPlaces = () => {
  const [places, setPlaces] = useState(data);
  return (
    <List className="overflow-scroll space-y-2">
      {places.map((place) => (
        <ListItem key={place.name}>
          <PlaceCard place={place} />
        </ListItem>
      ))}
    </List>
  );
};

export default ListPlaces;
