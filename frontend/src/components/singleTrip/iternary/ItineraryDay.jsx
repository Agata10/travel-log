import {
  Paper,
  Typography,
  IconButton,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  List,
  ListItem,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { updatePlace } from '../../../api/placesAPI';
import { getPlacesByDate } from '../../../api/tripsAPI';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import dayjs from 'dayjs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material';

const ItineraryDay = ({ day, trip, iternaryPlaces, setIternaryPlaces }) => {
  const [dayPlaces, setDayPlaces] = useState([]);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const getPlacesByDay = async () => {
      const response = await getPlacesByDate(dayjs(day), trip._id);
      if (response) {
        setDayPlaces(response);
      }
    };
    getPlacesByDay();
  }, [iternaryPlaces]);

  const handleSelect = async (e) => {
    const placeId = e.target.value;
    //set iternary places without the selected place, so user can't pick it again
    setIternaryPlaces((prev) => prev.filter((place) => place._id !== placeId));
    //add date to the selected place
    const body = { date: day };
    await updatePlace(placeId, body);
    document.activeElement.blur();
  };

  const handleDeleteDate = async (place) => {
    const placeId = place._id;
    const body = { date: '' };
    await updatePlace(placeId, body);
    setIternaryPlaces((prev) => [...prev, place]);
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        marginLeft: '15px',
      }}
    >
      <Box className="flex justify-between w-full">
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            color: theme.palette.primary.dark,
          }}
        >
          <IconButton
            onClick={() => setOpen((prev) => !prev)}
            sx={{ color: theme.palette.primary.light }}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
          {day}
        </Typography>
      </Box>
      {open && (
        <Box
          sx={{
            width: { xs: '100%', md: '60%' },
          }}
        >
          <Paper
            sx={{
              width: '100%',
              padding: '10px ',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '0 auto',
              boxShadow: `0 2px 5px ${theme.palette.primary.main}`,
            }}
          >
            {iternaryPlaces.length > 0 && (
              <FormControl sx={{ width: { xs: '80%', md: '50%' } }}>
                <InputLabel id="places-label">Add place</InputLabel>
                <Select
                  labelId="places-label"
                  id="select-place"
                  label="Add place"
                  value={''}
                  onChange={handleSelect}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.light,
                      borderWidth: '1px',
                    },
                  }}
                >
                  {iternaryPlaces.length > 0 &&
                    iternaryPlaces.map((option) => (
                      <MenuItem key={crypto.randomUUID()} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
            <List
              sx={{
                listStyleType: 'decimal',
                pl: dayPlaces.length > 0 ? 2 : 0,
                '& .MuiListItem-root': {
                  display: 'list-item',
                },
                '& .MuiListItem-root::marker': {
                  fontWeight: 500,
                  fontSize: '1.2em',
                },
              }}
            >
              {dayPlaces.length > 0
                ? dayPlaces.map((place) => (
                    <ListItem
                      key={place._id}
                      sx={{ padding: 0, fontSize: theme.typography.h6 }}
                    >
                      {place.name}
                      <IconButton
                        onClick={() => handleDeleteDate(place)}
                        sx={{ padding: '4px 8px' }}
                      >
                        <DeleteOutlineOutlined
                          sx={{ color: theme.palette.primary.light }}
                        />
                      </IconButton>
                    </ListItem>
                  ))
                : 'No places'}
            </List>
          </Paper>
        </Box>
      )}
    </ListItem>
  );
};

export default ItineraryDay;
