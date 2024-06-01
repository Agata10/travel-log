import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from 'react';
import {
  Card,
  Box,
  CardContent,
  ListItem,
  Paper,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
const ariaLabel = { 'aria-label': 'description' };

const VisitPlacesCard = ({ index, place, places, setPlaces }) => {
  const [hoverCard, setHoverCard] = useState(null);

  const handleDelete = (place) => {
    setPlaces(places.filter((p) => p.name != place.name));
  };

  return (
    <ListItem
      onMouseOver={() => setHoverCard(index)}
      onMouseLeave={() => setHoverCard(null)}
      sx={{
        display: 'flex',
        padding: 0,
        maxHeight: '130px',
        width: { xs: '100%', sm: '90%', md: '70%', lg: '50%' },
      }}
    >
      <Card
        elevation={3}
        sx={{
          height: '100%',
          width: '65%',
          borderRadius: 3,
          mr: 2,
          pt: 1,
          '&:last-child': { pb: 0 },
        }}
      >
        <Box display="flex">
          <CardContent sx={{ pt: 0, '&:last-child': { pb: 0 } }}>
            <Typography variant="h6">{place.name}</Typography>
            <Box display="flex" marginTop={1}>
              <LocationOnOutlinedIcon fontSize="medium" />
              <Typography gutterBottom variant="body1">
                {place.address}
              </Typography>
            </Box>
            <TextField
              placeholder="Add notes, links etc here..."
              inputProps={ariaLabel}
              className="overflow-y-hidden hover:overflow-y-visible"
              sx={{
                width: '70%',
                pl: 1,
                '& .MuiInputBase-input': {
                  fontSize: '0.8rem',
                },
              }}
              multiline
              variant="standard"
              size="small"
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: {
                    md: 20,
                    xs: 12,
                  },
                },
              }}
            />
          </CardContent>
        </Box>
      </Card>
      <Paper
        sx={{
          borderRadius: 3,
          height: { xs: '130px', sm: '130px' },
          width: '25%',
        }}
      >
        <img src={place.src} alt={place.name}></img>
      </Paper>
      {hoverCard === index && (
        <IconButton aria-label="delete" onClick={() => handleDelete(place)}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      )}
    </ListItem>
  );
};

export default VisitPlacesCard;
