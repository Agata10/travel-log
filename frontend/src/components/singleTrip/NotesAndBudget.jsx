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

const NotesAndBudget = ({ percent }) => {
  const [open, setOpen] = useState(true);
  const tripContext = useContext(TripContext);
  const { trip, setTrip, sumOfExpenses } = tripContext;
  const theme = useTheme();
  const notesRef = useRef();

  const btnStyle = {
    borderRadius: '8px',
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    padding: { xs: '3px', sm: '6px 16px' },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
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
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
          Notes
        </Typography>
        <Box
          className="flex justify-end sm:justify-between pb-2"
          sx={{ width: '50%' }}
        >
          <Typography
            variant="h5"
            sx={{
              paddingLeft: 2,
              fontWeight: 500,
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            Budget
          </Typography>
          <Button size="small" sx={btnStyle} variant="standard">
            Show details
          </Button>
        </Box>
      </Box>
      {open && (
        <Box
          elevation={1}
          className="w-full h-20 flex xs:gap-1 gap-4"
          sx={{ borderRadius: '12px' }}
        >
          <Paper
            elevation={2}
            sx={{
              borderRadius: '8px',
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
                  fontSize: theme.typography.body1,
                  fontWeight: 'semi-bold',
                  padding: '15px',
                  '&:hover': {
                    backgroundColor: 'whitesmoke',
                    borderRadius: '8px',
                  },
                },
              }}
            />
          </Paper>
          <Paper
            elevation={2}
            sx={{
              borderRadius: '8px',
              width: '50%',
              height: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              display="flex"
              sx={{
                alignItems: 'flex-end',
                cursor: 'default',
                fontSize: theme.typography.h6,
                fontWeight: 400,
              }}
            >
              {sumOfExpenses}$
            </Box>
            <Box
              sx={{ backgroundColor: theme.palette.secondary.main }}
              className="w-10/12 sm:w-8/12 h-4 bg-slate-300 rounded-md"
            >
              <Box
                className="h-4 rounded-md relative"
                sx={{
                  width: `${percent}%`,
                  backgroundColor: theme.palette.primary.light,
                }}
              >
                {percent > 0 && (
                  <Typography
                    sx={{
                      fontSize: theme.typography.body2,
                      fontWeight: 400,
                      display: { xs: 'none', sm: 'flex' },
                    }}
                    className="absolute -right-12 -top-0.5"
                  >
                    {percent}%
                  </Typography>
                )}
              </Box>
            </Box>
            <Typography
              sx={{ cursor: 'default', fontSize: theme.typography.body1 }}
            >
              Budget: {trip.budget}$
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default NotesAndBudget;
