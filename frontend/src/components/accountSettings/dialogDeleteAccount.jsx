import { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthContext } from '../../utilis/context/AuthContext';
import { deleteUser } from '../../api/userAPI';

const DialogDeleteAccount = ({ setOpen }) => {
  const { authUser, setAuthUser } = useContext(AuthContext);

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

          await deleteUser(authUser?._id);
          localStorage.removeItem('token');
          setAuthUser(null);
          handleClose();
        },
      }}
    >
      <DialogTitle sx={{ paddingBottom: '5px' }}>
        Are you sure you want to delete your account ?
      </DialogTitle>
      {/* <DialogContent></DialogContent> */}
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#65000B',
            '&:hover': { backgroundColor: '#D21404' },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDeleteAccount;
