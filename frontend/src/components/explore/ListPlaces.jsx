import { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PlaceCard from './PlaceCard';
import { ExploreContext } from '../../utilis/ExploreContext';

const ListPlaces = () => {
  const expoloreContext = useContext(ExploreContext);
  const { places } = expoloreContext;

  return (
    <List className="overflow-scroll space-y-2">
      {places &&
        places.map((place) => (
          <ListItem key={crypto.randomUUID()}>
            <PlaceCard place={place} />
          </ListItem>
        ))}
    </List>
  );
};

export default ListPlaces;
