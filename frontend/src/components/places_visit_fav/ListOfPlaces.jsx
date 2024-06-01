import { useContext } from 'react';
import { ExploreContext } from '../../utilis/ExploreContext';
import VisitPlacesCard from './VisitPlacesCard';
import { List } from '@mui/material';

const ListOfPlaces = () => {
  const context = useContext(ExploreContext);
  const { places, setPlaces } = context;

  return (
    <List
      className="overflow-auto space-y-4"
      sx={{
        height: '85vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0,
      }}
    >
      {places.map((place, index) => {
        return (
          <VisitPlacesCard
            key={crypto.randomUUID()}
            index={index}
            place={place}
            places={places}
            setPlaces={setPlaces}
          />
        );
      })}
    </List>
  );
};

export default ListOfPlaces;
