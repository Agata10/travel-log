import {
  useTheme,
  Grid,
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import ListOfPlaces from '../places_visit_fav/ListOfPlaces';
import { useContext, useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { getPlacesToVisit } from '../../api/tripsAPI';
import { useParams } from 'react-router-dom';
import { createPlace } from '../../api/placesAPI';
import axios from 'axios';
import { Paper } from '@mui/material';
import { TripContext } from '../../utilis/TripContext';

const BudgetDetails = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const context = useContext(TripContext);
  const { places, setPlaces } = context;
  const placeRef = useRef();
  const { tripId } = useParams();
  return (
    <Grid container pt={3} pb={3} sx={{ width: '100%' }}>
      <Grid
        item
        sx={{
          typography: { ...theme.typography.h4 },
          width: '100%',
        }}
        textAlign={'center'}
      >
        <Box className="flex justify-between">
          <Typography variant="h5">
            <IconButton onClick={() => setOpen((prev) => !prev)}>
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
            Budget And Expenses
          </Typography>
        </Box>
      </Grid>

      {open && (
        <Grid
          item
          xs={12}
          sx={{
            width: '100%',
          }}
        >
          <Paper
            sx={{
              backgroundColor: 'whitesmoke',
              borderRadius: '12px',
              width: '100%',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
            }}
          ></Paper>
          <Box>{/* list of expenses */}</Box>
        </Grid>
      )}
    </Grid>
  );
};

export default BudgetDetails;
