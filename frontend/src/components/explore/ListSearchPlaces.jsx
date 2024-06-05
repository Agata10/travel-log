import { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PlaceCard from './PlaceCard';
import { ExploreContext } from '../../utilis/ExploreContext';

const ListSearchPlaces = () => {
  const expoloreContext = useContext(ExploreContext);
  const { searchPlaces } = expoloreContext;

  return (
    <List
      className="overflow-scroll space-y-2 w-full"
      sx={{ height: { xs: '25vh', md: '77vh' } }}
    >
      {searchPlaces.length > 0 &&
        searchPlaces.map((place) => (
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

export default ListSearchPlaces;
