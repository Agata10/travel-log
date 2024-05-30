import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

const TripCard = () => {
  return (
    <Card sx={{ minWidth: 200, maxWidth: 250, borderRadius: '12px' }}>
      <CardMedia
        component="img"
        // height="300px"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
        className="w-full h-36"
      />
      <CardContent>
        <Typography variant="h6" color="">
          name
        </Typography>
        <Typography variant="body1" color="">
          start date - end date
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View trip</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default TripCard;
