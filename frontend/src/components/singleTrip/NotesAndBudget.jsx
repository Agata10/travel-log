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
import { useRef, useState, useContext, useEffect } from 'react';
import { TripContext } from '../../utilis/TripContext';
import { getTripExpenses, updateTrip } from '../../api/tripsAPI';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';
const NotesAndBudget = () => {
  const [open, setOpen] = useState(true);
  const tripContext = useContext(TripContext);
  const { trip, setTrip } = tripContext;
  const theme = useTheme();
  const notesRef = useRef();
  const budgetRef = useRef();
  const { tripId } = useParams();
  const [sumOfExpenses, setSumOfExpeneses] = useState(0);
  const [percent, setPercent] = useState(0);

  const calcExpensesSum = async () => {
    try {
      const expenses = await getTripExpenses(tripId);
      const sum = expenses.reduce((accumulator, expense) => {
        return accumulator + expense.amount;
      }, 0);
      if (sum) {
        const percentageOfBudget = ((sum / trip.budget) * 100).toFixed(2);
        setSumOfExpeneses(sum);
        setPercent(percentageOfBudget);
      }
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  useEffect(() => {
    calcExpensesSum();
  }, []);

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
            <Box display="flex" sx={{ alignItems: 'flex-end' }}>
              {/* <TextField
                inputRef={budgetRef}
                // onBlur={handleAddressBlur}
                placeholder="Add address"
                variant="standard"
                type="number"
                defaultValue={trip.budget}
                InputProps={{ disableUnderline: true }}
                sx={{
                  width: '20%',
                  '& input': {
                    fontSize: theme.typography.body2,
                  },
                }}
              />
              <EditIcon
                fontSize="medium"
                sx={{ color: theme.palette.primary.main, marginBottom: 0.5 }}
              /> */}
              {sumOfExpenses}$
            </Box>
            <div className="w-8/12 h-4 bg-green-300 rounded-md">
              <div
                className="h-4 bg-green-700 rounded-md relative"
                style={{ width: `${percent}%` }}
              >
                {percent > 0 && (
                  <p className="absolute -right-4 -top-1">{percent}%</p>
                )}
              </div>
            </div>
            <p>Budget: {trip.budget}$</p>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default NotesAndBudget;
