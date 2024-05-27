import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const PlaceCard = ({ place }) => {
  return (
    <Card sx={{ maxWidth: 500 }} className="px-4 pt-4">
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ padding: 0, position: 'relative' }}>
            <Typography gutterBottom variant="h6">
              {place.name}
            </Typography>
            <Typography gutterBottom variant="body2">
              <LocationOnOutlinedIcon />
              {place?.addres}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
              <Typography variant="body2" color="text.secondary">
                {place.raw_rating}
              </Typography>
              <Rating
                name="read-only"
                defaultValue={2}
                value={place.rating}
                readOnly
                precision={0.1}
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                ({place.num_reviews})
              </Typography>
            </Box>
          </CardContent>
        </Box>

        <CardMedia
          sx={{
            height: 80,
            width: 100,
          }}
          image={place.name}
          title={place.photo.images.original.url}
          component="img"
        />
      </Box>
      <CardActions>
        <Stack direction="row" xs={{ margin: 0, padding: 0 }}>
          <IconButton aria-label="add to favorites" size="small">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="add to favorites" href={place.web_url}>
            <LanguageOutlinedIcon size="small" />
          </IconButton>
          <Button size="small">Save</Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PlaceCard;
