import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState, useRef } from 'react';
import {
  Card,
  Box,
  CardContent,
  ListItem,
  Paper,
  Typography,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material';
import { deletePlace, updatePlace } from '../../api/placesAPI';
import { useParams } from 'react-router-dom';
import { getPlacesToVisit } from '../../api/tripsAPI';

const ariaLabel = { 'aria-label': 'description' };

const VisitPlacesCard = ({ index, place, setPlaces }) => {
  const [hoverCard, setHoverCard] = useState(null);
  const theme = useTheme();
  const { tripId } = useParams();
  const notesRef = useRef();

  const handleDelete = async (place) => {
    await deletePlace(tripId, place._id);
    setPlaces(await getPlacesToVisit(tripId));
  };

  const handleNotesBlur = async () => {
    if (place.description !== notesRef.current.value) {
      const response = await updatePlace(place._id, {
        description: notesRef.current.value,
      });
      if (response) {
        console.log(response);
      }
    }
  };

  return (
    <ListItem
      onMouseOver={() => setHoverCard(index)}
      onMouseLeave={() => setHoverCard(null)}
      sx={{
        display: 'flex',
        padding: 0,
        height: { xs: '130px', md: '120px' },
        width: { xs: '100%', sm: '90%', md: '100%', lg: '80%' },
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
          <CardContent sx={{ pt: 0, width: '100%', '&:last-child': { pb: 0 } }}>
            <Typography sx={{ typography: { ...theme.typography.h6 } }}>
              {place.name}
            </Typography>
            <Box display="flex" marginTop={1}>
              <LocationOnOutlinedIcon fontSize="medium" />
              <Typography
                gutterBottom
                sx={{ fontSize: theme.typography.body2 }}
              >
                {place.address}
              </Typography>
            </Box>
            <TextField
              placeholder="Add notes, links etc here..."
              onBlur={handleNotesBlur}
              defaultValue={place?.description}
              inputProps={ariaLabel}
              inputRef={notesRef}
              className="overflow-y-hidden hover:overflow-y-visible"
              sx={{
                display: { xs: 'none', md: 'flex' },
                paddingTop: '10px',
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
          borderRadius: 8,
          height: '120px',
          width: '25%',
        }}
      >
        <img
          src={place.img}
          alt={place.name}
          style={{
            borderRadius: 8,
            height: '120px',
            width: '100%',
          }}
        />
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
