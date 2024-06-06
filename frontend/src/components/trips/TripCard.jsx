import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  useTheme,
} from '@mui/material';
import { deleteTrip } from '../../api/tripsAPI';
import { useNavigate } from 'react-router-dom';
import { getSingleTrip } from '../../api/tripsAPI';
import { TripContext } from '../../utilis/context/TripContext';
import { ExploreContext } from '../../utilis/context/ExploreContext';
import { useContext } from 'react';
import bg from '../../assets/images/trip.jpg';
//Change the format of displaying the date on trip card
const changeDate = (string) => {
  const date = new Date(string);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const TripCard = ({ trip, setTripAdded }) => {
  const tripContext = useContext(TripContext);
  const exploreContext = useContext(ExploreContext);
  const { setTrip } = tripContext;
  const { setIsLoading } = exploreContext;
  const theme = useTheme();
  const navigate = useNavigate();

  const btnStyle = {
    borderColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
    '&:hover': {
      borderColor: theme.palette.primary.light,
      backgroundColor: theme.palette.primary.light,
      color: '#ffffff',
    },
  };

  const fetchData = async (tripId) => {
    setIsLoading(true);
    const tripResponse = await getSingleTrip(tripId);
    if (tripResponse) {
      setTrip(tripResponse);
    }
  };

  const deleteTripData = async (id) => {
    await deleteTrip(id);
    setTripAdded((prev) => !prev);
  };

  const handleDeleteTrip = async (id) => {
    deleteTripData(id);
  };

  const handleViewTrip = async (id) => {
    await fetchData(id);
    navigate(`/trips/trip/${id}`);
  };

  return (
    <Card
      elevation={2}
      id={trip._id}
      sx={{
        width: { xs: 200, md: 250 },
        minHeight: 270,
        maxHeight: 300,
        borderRadius: '12px',
        textAlign: 'center',
      }}
    >
      <CardMedia
        component={'img'}
        image={trip.img ? trip.img : bg}
        alt="Image"
        className="w-full h-40"
        // style={{
        //   objectFit: 'cover',
        //   objectPosition: 'center',
        // }}
      />
      <CardContent sx={{ padding: 1, paddingBottom: 0 }}>
        <Typography variant="h6" color="">
          {trip.name}
        </Typography>
        <Typography variant="body1" color="" gutterBottom={false}>
          {!trip.startDate ? '' : changeDate(trip.startDate)}
          {!trip.endDate ? '' : ` - ${changeDate(trip.endDate)}`}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          paddingTop: 1,
          paddingBottom: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="outlined"
          size="small"
          sx={btnStyle}
          onClick={() => handleViewTrip(trip._id)}
        >
          View trip
        </Button>
        <Button
          size="small"
          sx={btnStyle}
          variant="outlined"
          onClick={() => handleDeleteTrip(trip._id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TripCard;
