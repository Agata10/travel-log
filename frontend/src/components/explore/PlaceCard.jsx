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
  const handleAddPlace = () => {
    console.log(place.name, place.addres, place.photo.images.original.url);
  };
  const handleAddToFav = () => {
    console.log(place.name, place.addres, place.photo.images.original.url);
    //favorite set to true
  };
  return (
    <Card
      sx={{
        width: {
          xs: 300,
          sm: 350,
          lg: 400,
        },
      }}
      elevation={2}
      className="px-4 pt-4"
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ padding: 0, position: 'relative' }}>
            <Typography gutterBottom variant="h6">
              {place.name}
            </Typography>
            <Box display="flex">
              <LocationOnOutlinedIcon fontSize="small" />
              <Typography gutterBottom variant="body2">
                {place.address}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
              <Typography variant="body2" color="text.secondary">
                {place.rating}
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
            width: 120,
            marginTop: 2,
          }}
          image={place.name}
          title={place.photo.images.original.url}
          component="img"
        />
      </Box>
      <CardActions disableSpacing>
        <Stack direction="row">
          <IconButton
            aria-label="add to favorites"
            size="small"
            onClick={handleAddToFav}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            aria-label="add to favorites"
            href={place.web_url}
            target="_blank"
          >
            <LanguageOutlinedIcon size="small" />
          </IconButton>
          <Button size="small" onClick={handleAddPlace}>
            Save
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PlaceCard;
