import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';

const PlaceCard = ({ place }) => {
  return (
    <Card sx={{ maxWidth: 450 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', margin: 2, gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ padding: 0, position: 'relative' }}>
            <Typography gutterBottom variant="h6">
              {place.name}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="body2" color="text.secondary">
                {place.raw_rating}
              </Typography>
              <Rating
                name="read-only"
                defaultValue={2}
                value={place.raw_rating}
                readOnly
                precision={0.1}
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                ({place.num_reviews})
              </Typography>
            </Box>
            <CardActions
              style={{
                padding: 0,
                position: 'absolute',
                bottom: '-40px',
                left: '-10px',
              }}
            >
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </CardContent>
        </Box>

        <CardMedia
          sx={{
            height: 80,
            width: 100,
          }}
          image={place.image}
          title={place.image}
          component="img"
        />
      </Box>
    </Card>
  );
};

export default PlaceCard;
