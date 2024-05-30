import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  useTheme,
} from '@mui/material';

const TripCard = () => {
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
        <Button variant="outlined" size="small" sx={btnStyle}>
          {/* change it when auth user */}
          View trip
        </Button>
        <Button size="small" sx={btnStyle} variant="outlined">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TripCard;
