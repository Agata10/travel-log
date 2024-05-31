import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { createTrip } from '../../api/tripsAPI';

const DialogAddTrip = ({ open, setOpen, setTripAdded }) => {
  const nameRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [error, setError] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event) => {
          event.preventDefault();
          //   const formData = new FormData(event.currentTarget);
          //   const formJson = Object.fromEntries(formData.entries());
          //   const email = formJson.email;
          console.log(new Date(startDateRef.current.value));
          if (endDateRef.current.value < startDateRef.current.value) {
            setError('End date has to be greater or equal start date');
            return;
          } else {
            setError('');
          }

          const body = {
            userId: '6637f3825bfc1879d0f2273d',
            name: nameRef.current.value,
            startDate: startDateRef.current.value,
            endDate: endDateRef.current.value,
          };
          createTrip(setTripAdded, body);
          handleClose();
        },
      }}
    >
      <DialogTitle>Add new trip</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          inputRef={nameRef}
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DesktopDatePicker
              label="Start Date"
              minDate={dayjs()}
              inputRef={startDateRef}
              slotProps={{
                textField: {
                  required: true,
                },
              }}
            />
            <DesktopDatePicker
              label="End Date"
              minDate={dayjs().add(1, 'day')}
              inputRef={endDateRef}
              onError={(newErr) =>
                setError(
                  newErr ||
                    'End date has to be greater or equal than start date'
                )
              }
              slotProps={{
                textField: {
                  helperText: error,
                  sx: { '& .MuiFormHelperText-root': { color: 'red' } },
                  required: true,
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogAddTrip;
