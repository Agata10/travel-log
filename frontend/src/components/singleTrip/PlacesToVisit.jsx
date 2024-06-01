import { useTheme, Grid, Box, Typography, IconButton } from '@mui/material';
import ListOfPlaces from '../places_visit_fav/ListOfPlaces';
import { useContext, useState } from 'react';
import { ExploreContext } from '../../utilis/ExploreContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const PlacesToVisit = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const context = useContext(ExploreContext);
  const { places, setPlaces } = context;

  ///set places from api to places to visit
  return (
    <Grid container pt={6} pb={6} sx={{ width: '100%' }}>
      <Grid
        item
        sx={{
          typography: { ...theme.typography.h4 },
          border: '1px solid red',
          width: '100%',
        }}
        textAlign={'center'}
      >
        <Box className="flex justify-between">
          <Typography variant="h5">
            <IconButton onClick={() => setOpen((prev) => !prev)}>
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
            Places to visit
          </Typography>
        </Box>
      </Grid>

      {open && (
        <Grid item xs={12} sx={{ width: '100%', border: '1px solid blue' }}>
          <ListOfPlaces places={places} setPlaces={setPlaces} />
        </Grid>
      )}
    </Grid>
  );
};

export default PlacesToVisit;
