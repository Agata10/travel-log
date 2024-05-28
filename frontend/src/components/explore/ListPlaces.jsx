import { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PlaceCard from './PlaceCard';
import { ExploreContext } from '../../utilis/ExploreContext';

const ListPlaces = () => {
  const expoloreContext = useContext(ExploreContext);
  const { places } = expoloreContext;

  return (
    <List
      className="overflow-scroll space-y-2 w-full"
      sx={{ height: { xs: '220px', md: '75vh' } }}
    >
      {places &&
        places.map((place) => (
          <ListItem
            key={crypto.randomUUID()}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <PlaceCard place={place} />
          </ListItem>
        ))}
    </List>
  );
};

export default ListPlaces;
