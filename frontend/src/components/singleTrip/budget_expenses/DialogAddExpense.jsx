import { useRef, useContext, useState } from 'react';
import { TripContext } from '../../../utilis/context/TripContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { createExpense } from '../../../api/expenseAPI';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HotelIcon from '@mui/icons-material/Hotel';
import CarRentalIcon from '@mui/icons-material/CarRental';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';

const categories = [
  { name: 'Flights', icon: <FlightTakeoffIcon /> },
  { name: 'Lodging', icon: <HotelIcon /> },
  { name: 'Car rental', icon: <CarRentalIcon /> },
  { name: 'Transit', icon: <DirectionsTransitIcon /> },
  { name: 'Food', icon: <RestaurantIcon /> },
  { name: 'Sightseeing', icon: <AccountBalanceOutlinedIcon /> },
  { name: 'Other', icon: <LocalActivityOutlinedIcon /> },
];

const DialogAddExpense = ({ setRefresh }) => {
  const tripContext = useContext(TripContext);
  const { addExpenseDialog, setAddExpenseDialog, trip, sumOfExpenses } =
    tripContext;
  const [selectedCategory, setSelectedCategory] = useState('Other');
  const expenseRef = useRef();
  const nameRef = useRef();
  const theme = useTheme();

  const handleClose = () => {
    setAddExpenseDialog(false);
  };

  const addExpenseToTrip = async () => {
    const body = {
      tripId: trip._id,
      amount: expenseRef.current.value,
      description: nameRef.current.value,
      category: selectedCategory,
    };
    await createExpense(body);
  };

  const handleSelect = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Dialog
      open={addExpenseDialog}
      onClose={handleClose}
      sx={{ margin: '0 auto', textAlign: 'center' }}
      PaperProps={{
        component: 'form',
        onSubmit: async (event) => {
          event.preventDefault();
          if (trip.budget == 0) {
            alert(
              'Set up budget firstly to add expense, click on budget to do so'
            );
            return;
          }
          if (Number(expenseRef.current.value) + sumOfExpenses > trip.budget) {
            alert('You cannot exceed the budget');
            return;
          }
          addExpenseToTrip();
          setRefresh((prev) => !prev);
          handleClose();
        },
      }}
    >
      <DialogTitle sx={{ paddingBottom: '5px' }}>Add expense</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <TextField
          inputRef={expenseRef}
          variant="outlined"
          label="Amount"
          type="number"
          defaultValue={0}
          InputProps={{
            startAdornment: '$',
          }}
          inputProps={{ min: 1 }}
          sx={{
            marginTop: '5px',
            width: '100%',
            '& input': {
              paddingLeft: '5px',
              fontSize: theme.typography.body2,
            },
          }}
        />
        <TextField
          inputRef={nameRef}
          variant="outlined"
          label="Name"
          type="text"
          defaultValue={selectedCategory}
          inputProps={{ minLength: 3 }}
          sx={{
            width: '100%',
            margin: '5px auto',
            '& input': {
              paddingLeft: '10px',
              fontSize: theme.typography.body2,
            },
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="cat-label">Category</InputLabel>
          <Select
            labelId="cat-label"
            id="select-cat"
            label="Category"
            value={selectedCategory}
            onChange={handleSelect}
            sx={{ width: '100%' }}
          >
            {categories.map((option) => (
              <MenuItem key={crypto.randomUUID()} value={option.name}>
                <IconButton size="small">{option.icon}</IconButton>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ margin: '0 auto' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddExpense;
