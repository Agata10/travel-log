import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  Button,
  useTheme,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRef, useState, useContext } from 'react';
import { TripContext } from '../../utilis/TripContext';
import { updateTrip } from '../../api/tripsAPI';

const NotesAndBudget = () => {
  const [open, setOpen] = useState(false);
  const notesRef = useRef();
  const tripContext = useContext(TripContext);
  const { trip, setTrip } = tripContext;
  const theme = useTheme();
  const btnStyle = {
    borderRadius: '8px',
    backgroundColor: theme.palette.primary.light,
    color: '#ffffff',

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.dark,
    },
  };

  const handleNotesBlur = async () => {
    if (trip.notes !== notesRef.current.value) {
      const response = await updateTrip(trip._id, {
        notes: notesRef.current.value,
      });
      if (response) {
        setTrip(response);
      }
    }
  };
  return (
    <Box className="flex flex-col ">
      <Box className="flex justify-between">
        <Typography variant="h5">
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
          Notes
        </Typography>
        <Box className="flex justify-between pb-2" sx={{ width: '50%' }}>
          <Typography variant="h5" sx={{ paddingLeft: 2 }}>
            Budget
          </Typography>
          <Button
            size="small"
            sx={btnStyle}
            variant="standard"
            // onClick={() => handleDeleteTrip(trip._id)}
          >
            Show details
          </Button>
        </Box>
      </Box>
      {open && (
        <Box
          elevation={1}
          className="w-full h-20 flex gap-4"
          sx={{ borderRadius: '12px' }}
        >
          <Paper
            sx={{
              backgroundColor: 'whitesmoke',
              borderRadius: '12px',
              width: '50%',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              inputRef={notesRef}
              defaultValue={trip.notes}
              sx={{ width: '100%' }}
              placeholder="Any thoughts? Better take notes to not forget.."
              variant="standard"
              multiline
              rows={3}
              onBlur={handleNotesBlur}
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: '1rem',
                  fontWeight: 'semi-bold',
                  paddingLeft: '15px',
                  paddingTop: '5px',
                  '&:hover': {
                    backgroundColor: 'whitesmoke',
                    borderRadius: '12px',
                  },
                },
              }}
            />
          </Paper>
          <Paper
            sx={{
              backgroundColor: 'whitesmoke',
              borderRadius: '12px',
              width: '50%',
              height: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p className="pb-1">0.00$</p>
            <div className="w-8/12 h-4 bg-green-300 rounded-md">
              <div className="w-8/12 h-4 bg-green-700 rounded-md relative">
                <p className="absolute -right-4 -top-1">%</p>
              </div>
            </div>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default NotesAndBudget;
