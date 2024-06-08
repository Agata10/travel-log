import { useEffect, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getTrips } from '../../api/tripsAPI';
import { ExploreContext } from '../../utilis/context/ExploreContext';
import { createPlace } from '../../api/placesAPI';
import { AuthContext } from '../../utilis/context/AuthContext';
import { uploadImg } from '../../services/cloudinaryAPI';

const DialogAddPlaceToTrip = () => {
  const exploreContext = useContext(ExploreContext);
  const { open, setOpen, selectedPlace } = exploreContext;
  const [selectedTrip, setSelectedTrip] = useState('');
  const [options, setOptions] = useState(null);
  const authContext = useContext(AuthContext);
  const { authUser } = authContext;

  const getTripsData = async () => {
    const data = await getTrips(authUser._id);
    if (data) {
      setOptions(data);
      setSelectedTrip(data[0]._id);
    }
  };
  useEffect(() => {
    if (open) {
      getTripsData();
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (e) => {
    setSelectedTrip(e.target.value);
  };

  const addPlaceToTrip = async (body) => {
    await createPlace(body);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event) => {
          event.preventDefault();

          const cloudImg = await uploadImg(
            selectedPlace.photo.images.original.url
          );

          const body = {
            name: selectedPlace.name,
            img: cloudImg,
            address: selectedPlace.address,
            tripId: selectedTrip,
            userId: authUser._id,
          };
          addPlaceToTrip(body);
          handleClose();
        },
      }}
    >
      <DialogTitle sx={{ paddingBottom: '5px' }}>
        Where do you want to save your place?
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ marginTop: '10px' }}>
          <InputLabel id="trips-label">Trips</InputLabel>
          <Select
            labelId="trips-label"
            id="select-trip"
            value={selectedTrip}
            label="Trips"
            onChange={handleSelect}
          >
            {options &&
              options.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddPlaceToTrip;
