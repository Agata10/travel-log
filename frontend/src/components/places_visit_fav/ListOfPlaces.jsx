import VisitPlacesCard from './VisitPlacesCard';
import { List } from '@mui/material';

const ListOfPlaces = ({ places, setPlaces }) => {
  return (
    <List
      className="space-y-4"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '2px',
        paddingBottom: '10px',
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
