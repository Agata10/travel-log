import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState, useRef } from 'react';
import {
  Card,
  Box,
  CardContent,
  ListItem,
  Paper,
  IconButton,
  TextField,
  useTheme,
  InputAdornment,
} from '@mui/material';
import { deletePlace, getFavPlaces, updatePlace } from '../../api/placesAPI';
import { useParams } from 'react-router-dom';
import { getPlacesToVisit } from '../../api/tripsAPI';

const ariaLabel = { 'aria-label': 'description' };

const VisitPlacesCard = ({ index, place, setPlaces }) => {
  const [hoverCard, setHoverCard] = useState(null);
  const theme = useTheme();
  const { tripId } = useParams();
  const notesRef = useRef();
  const addressRef = useRef();
  const nameRef = useRef();

  const handleDelete = async (place) => {
    await deletePlace(place._id);
    if (tripId) {
      setPlaces(await getPlacesToVisit(tripId));
    } else {
      //make sure that if fav place page there is not tripId
      const userId = '6637f3825bfc1879d0f2273d';
      setPlaces(await getFavPlaces(userId));
    }
  };

  const handleNotesBlur = async () => {
    if (place.description !== notesRef.current.value) {
      await updatePlace(place._id, {
        description: notesRef.current.value,
      });
    }
  };
  const handleAddressBlur = async () => {
    if (place.address !== addressRef.current.value) {
      await updatePlace(place._id, {
        address: addressRef.current.value,
      });
    }
  };
  const handleNameBlur = async () => {
    if (place.name !== nameRef.current.value) {
      await updatePlace(place._id, {
        name: nameRef.current.value,
      });
    }
  };

  return (
    <ListItem
      onMouseOver={() => setHoverCard(index)}
      onMouseLeave={() => setHoverCard(null)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        height: { xs: '160px', sm: '120px' },
        width: { xs: '100%', sm: '90%', md: '100%', lg: '80%' },
      }}
    >
      <Card
        elevation={3}
        sx={{
          overflow: 'hidden',
          height: '100%',
          width: { xs: '70%', sm: '65%' },
          borderRadius: 3,
          mr: 2,
          pt: 1,

          '&:last-child': { pb: 0 },
          '&:hover': {
            overflow: 'auto',
          },
        }}
      >
        <Box display="flex">
          <CardContent
            sx={{
              pt: 0,
              width: '100%',
              '&:last-child': { pb: 0 },
            }}
          >
            <TextField
              inputRef={nameRef}
              onBlur={handleNameBlur}
              variant="standard"
              multiline
              defaultValue={place.name}
              InputProps={{ disableUnderline: true }}
              sx={{
                width: '100%',
                '& .MuiInputBase-root': {
                  padding: '0px',
                },
                '& .MuiInputBase-input': {
                  fontWeight: 500,
                  fontSize: theme.typography.h6,
                },
                '& .MuiInputBase-root.Mui-focused': {
                  backgroundColor: 'whitesmoke',
                  borderRadius: '12px',
                  paddingLeft: '5px',
                },
              }}
            />
            <Box display="flex" sx={{ alignItems: 'flex-end' }}>
              {/* <LocationOnOutlinedIcon
                fontSize="medium"
                sx={{ color: theme.palette.primary.main, marginBottom: 0.5 }}
              /> */}
              <TextField
                inputRef={addressRef}
                onBlur={handleAddressBlur}
                placeholder="Add address"
                variant="standard"
                defaultValue={place.address}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start" sx={{ margin: '0 auto' }}>
                      <LocationOnOutlinedIcon
                        fontSize="medium"
                        sx={{
                          color: theme.palette.primary.light,
                          marginBottom: 0.5,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                multiline
                sx={{
                  width: '100%',
                  '& .MuiInputBase-input': {
                    fontSize: theme.typography.body2,
                  },
                }}
              />
            </Box>
            <TextField
              placeholder="Add notes, links etc here..."
              onBlur={handleNotesBlur}
              defaultValue={place?.description}
              inputProps={ariaLabel}
              inputRef={notesRef}
              className="overflow-y-hidden hover:overflow-y-visible"
              sx={{
                display: 'flex',
                // display: { xs: 'none', md: 'flex' },
                paddingTop: '0px',
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
          height: { xs: '150px', sm: '120px' },
          width: { xs: '30%', sm: '25%' },
        }}
      >
        <img
          src={place.img}
          alt={place.name}
          style={{
            borderRadius: 8,
            height: '100%',
            width: '100%',
          }}
        />
      </Paper>
      {hoverCard === index && (
        <IconButton aria-label="delete" onClick={() => handleDelete(place)}>
          <DeleteOutlineOutlinedIcon
            sx={{ color: theme.palette.primary.light }}
          />
        </IconButton>
      )}
    </ListItem>
  );
};

export default VisitPlacesCard;
