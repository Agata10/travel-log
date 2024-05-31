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

const changeDate = (string) => {
  const date = new Date(string);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const TripCard = ({ trip, setTripAdded }) => {
  const theme = useTheme();
  const btnStyle = {
    borderColor: theme.palette.green.main,
    color: theme.palette.green.main,
    '&:hover': {
      borderColor: theme.palette.green.main,
      backgroundColor: theme.palette.green.light,
      color: '#ffffff',
    },
  };
  const handleDeleteTrip = async () => {
    deleteTrip(setTripAdded, trip._id);
  };

  return (
    <Card
      id={trip._id}
      sx={{
        width: { xs: 200, md: 250 },
        minHeight: 270,
        maxHeight: 290,
        borderRadius: '12px',
      }}
    >
      <CardMedia
        component="img"
        // height="300px"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
        className="w-full h-36"
      />
      <CardContent sx={{ padding: 2, paddingBottom: 0 }}>
        <Typography variant="h6" color="">
          {trip.name}
        </Typography>
        <Typography variant="body1" color="" gutterBottom={false}>
          {!trip.startDate ? '' : changeDate(trip.startDate)}
          {!trip.endDate ? '' : ` - ${changeDate(trip.endDate)}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ paddingBottom: 2 }}>
        <Button variant="outlined" size="small" sx={btnStyle}>
          {/* change it when auth user */}
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
