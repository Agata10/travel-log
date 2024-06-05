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
      sx={{
        height: { xs: '37vh', sm: '50vh', md: '70vh' },
        paddingBottom: { xs: '0vh', sm: '8vh', md: '0vh' },
      }}
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
