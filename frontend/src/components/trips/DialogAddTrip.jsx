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
import { fetchImages } from '../../services/imagesAPI';

const DialogAddTrip = ({ open, setOpen, setTripAdded }) => {
  const nameRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [error, setError] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const addTrip = async (body) => {
    const tripResponse = await createTrip(body);
    if (tripResponse) {
      setTripAdded((prev) => !prev);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event) => {
          event.preventDefault();
          if (endDateRef.current.value < startDateRef.current.value) {
            setError('End date has to be greater or equal start date');
            return;
          } else {
            setError('');
          }
          let image = '';
          const response = await fetchImages(nameRef.current.value);
          if (response) {
            image = response;
          }
          //NOTE:: hide user id, when auth take its id
          const body = {
            name: nameRef.current.value,
            startDate: startDateRef.current.value,
            endDate: endDateRef.current.value,
            img: image,
          };
          addTrip(body);

          handleClose();
        },
      }}
    >
      <DialogTitle>Add new trip</DialogTitle>
      <DialogContent>
        <DialogContentText>Oh, the places to go!</DialogContentText>
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
