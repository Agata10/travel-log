import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Stack, useTheme } from '@mui/material';
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
  const { setOpen, setSelectedPlace, setShowAlert } = context;
  const theme = useTheme();
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
    if (response) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
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
        '&:hover': {
          boxShadow: `0 2px 6px ${theme.palette.primary.main}`,
        },
      }}
      elevation={2}
      className="px-4 pt-2 lg:pt-4"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: { xs: 0, lg: '5px' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent
            style={{
              padding: 0,
              position: 'relative',
            }}
          >
            <Typography gutterBottom variant="h6">
              {place.name}
            </Typography>
            {place.address ? (
              <Box display="flex">
                <LocationOnOutlinedIcon
                  fontSize="small"
                  sx={{ color: theme.palette.primary.main }}
                />
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{ fontWeight: 400, width: '100%' }}
                >
                  {place.address}
                </Typography>
              </Box>
            ) : (
              ''
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
              {place.rating ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ paddingLeft: 1, fontWeight: 500 }}
                >
                  {place.rating}
                </Typography>
              ) : (
                ''
              )}
              {place.rating ? (
                <Rating
                  name="read-only"
                  defaultValue={2}
                  value={Number(place.rating)}
                  readOnly
                  precision={0.1}
                  size="small"
                />
              ) : (
                ''
              )}
              {place.rating ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  ({place.num_reviews})
                </Typography>
              ) : (
                ''
              )}
            </Box>
          </CardContent>
        </Box>

        <CardMedia
          sx={{
            maxHeight: 80,
            width: { xs: 80, sm: 120 },
            marginTop: 2,
            borderRadius: '8px',
          }}
          image={place.photo?.images.original.url}
          title={place.name}
          component="img"
        />
      </Box>
      <CardActions disableSpacing sx={{ paddingTop: { xs: 0, md: 1 } }}>
        <Stack direction="row">
          <IconButton
            aria-label="add to favorites"
            size="small"
            onClick={handleAddToFav}
          >
            <FavoriteIcon sx={{ color: theme.palette.primary.dark }} />
          </IconButton>
          <IconButton
            aria-label="add to favorites"
            href={place.web_url}
            target="_blank"
          >
            <LanguageOutlinedIcon
              size="small"
              sx={{ color: theme.palette.primary.dark }}
            />
          </IconButton>
          <Button
            onClick={() => handleAddPlace(place)}
            variant="text"
            size="small"
            sx={{
              color: theme.palette.primary.dark,
              fontWeight: 600,
              minHeight: 0,
              minWidth: 0,
              padding: '0 5px',
            }}
          >
            Save
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PlaceCard;
