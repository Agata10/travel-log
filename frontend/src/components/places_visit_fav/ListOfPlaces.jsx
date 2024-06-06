import VisitPlacesCard from './VisitPlacesCard';
import { List } from '@mui/material';

const ListOfPlaces = ({ places, setPlaces, visitPlaces }) => {
  return (
    <List
      className="space-y-4"
      sx={{
        width: visitPlaces
          ? { xs: '100%', sm: '100%', md: '80%' }
          : { xs: '95%', md: '65%' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '2px',
        paddingBottom: '10px',
        margin: '0 auto',
        paddingLeft: { xs: 0, sm: 3 },
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
            visitPlaces={visitPlaces}
          />
        );
      })}
    </List>
  );
};

export default ListOfPlaces;
