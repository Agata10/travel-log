import { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PlaceCard from './PlaceCard';
import { ExploreContext } from '../../utilis/context/ExploreContext';
import { Typography, useTheme } from '@mui/material';
import { Box } from '@mui/material';

const ListSearchPlaces = () => {
  const expoloreContext = useContext(ExploreContext);
  const { searchPlaces, isLoading } = expoloreContext;
  const theme = useTheme();

  {
    if (isLoading) {
      return (
        <Box
          sx={{
            position: 'relative',
            top: '10%',
            width: '100%',
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" sx={{ color: theme.palette.primary.dark }}>
            Loading places...
          </Typography>
        </Box>
      );
    }
  }

  return (
    <List
      className="overflow-scroll space-y-2 w-full"
      sx={{
        height: { xs: '37vh', sm: '50vh', md: '70vh' },
        paddingBottom: { xs: '0vh', sm: '8vh', md: '0vh' },
      }}
    >
      {searchPlaces.length === 0 && (
        <ListItem
          sx={{
            fontSize: theme.typography.fontSize.h2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            paddingBottom: '100px',
          }}
        >
          <Typography variant="h3" sx={{ color: theme.palette.primary.dark }}>
            No places found
          </Typography>
        </ListItem>
      )}
      {searchPlaces.length > 0 &&
        searchPlaces.map((place) =>
          place.name && place.rating ? (
            <ListItem
              key={crypto.randomUUID()}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <PlaceCard place={place} />
            </ListItem>
          ) : (
            ''
          )
        )}
    </List>
  );
};

export default ListSearchPlaces;
