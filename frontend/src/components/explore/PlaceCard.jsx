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
import { createPlace } from '../../api/placesAPI';
import { useContext } from 'react';
import { ExploreContext } from '../../utilis/ExploreContext';

const PlaceCard = ({ place }) => {
  const context = useContext(ExploreContext);
  const { setOpen, setSelectedPlace } = context;
  // If user click  save place, show add to trip dialog
  ///NOTE: delete user Id, make it accessible only for log in user
  const handleAddPlace = () => {
    setOpen(true);
    setSelectedPlace(place);
  };

  // If user click add to fav, add it to the favorites places
  ///NOTE: delete user Id, make it accessible only for log in user
  const handleAddToFav = async () => {
    const body = {
      name: place.name,
      address: place.address,
      img: place.photo.images.original.url,
      userId: '6637f3825bfc1879d0f2273d',
      favorite: true,
    };
    const response = await createPlace(body);
    if (response) console.log('success');
  };
  return (
    <Card
      sx={{
        width: {
          xs: 300,
          sm: 350,
          lg: 400,
        },
        borderRadius: 3,
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
                value={Number(place.rating)}
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
            maxHeight: 80,
            width: 120,
            marginTop: 2,
            borderRadius: '8px',
          }}
          image={place.photo?.images.original.url}
          title={place.name}
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
          <Button size="small" onClick={() => handleAddPlace(place)}>
            Save
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PlaceCard;
