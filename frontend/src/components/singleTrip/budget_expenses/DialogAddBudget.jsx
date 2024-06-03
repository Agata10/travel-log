import { useRef, useContext } from 'react';
import { TripContext } from '../../../utilis/TripContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, TextField } from '@mui/material';
import { useTheme } from '@emotion/react';
import { updateTrip } from '../../../api/tripsAPI';

const DialogAddBudget = ({ setRefresh }) => {
  const tripContext = useContext(TripContext);
  const { addBudgetDialog, setAddBudgetDialog, trip } = tripContext;
  const budgetRef = useRef();
  const theme = useTheme();

  const handleClose = () => {
    setAddBudgetDialog(false);
  };

  const addBudgetToTrip = async () => {
    await updateTrip(trip._id, { budget: budgetRef.current.value });
  };
  //NOTE: delete/hide userId later when auth user
  //disable it for not auth user
  return (
    <Dialog
      open={addBudgetDialog}
      onClose={handleClose}
      sx={{ margin: '0 auto', textAlign: 'center' }}
      PaperProps={{
        component: 'form',
        onSubmit: async (event) => {
          event.preventDefault();
          addBudgetToTrip();
          setRefresh((prev) => !prev);
          handleClose();
        },
      }}
    >
      <DialogTitle sx={{ paddingBottom: '5px' }}>Add trip budget</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <TextField
            inputRef={budgetRef}
            label="Budget"
            variant="outlined"
            type="number"
            defaultValue={trip.budget}
            InputProps={{ startAdornment: '$' }}
            inputProps={{ min: 0 }}
            sx={{
              width: '100%',
              margin: '5px auto',
              '& input': {
                paddingLeft: '10px',
                fontSize: theme.typography.body2,
              },
            }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ margin: '0 auto' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddBudget;
