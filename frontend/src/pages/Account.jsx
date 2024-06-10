import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Footer from '../components/Footer';
import { AuthContext } from '../utilis/context/AuthContext';
import { getUser, updateUser } from '../api/userAPI';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';
import DialogDeleteAccount from '../components/accountSettings/DialogDeleteAccount';

const Account = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [serverError, setServerError] = useState('');
  const authContext = useContext(AuthContext);
  const { setAuthUser, authUser } = authContext;
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const getUserData = async () => {
    const user = await getUser();
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
    }
    return user;
  };

  useEffect(() => {
    getUserData();
  }, [authUser]);

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.light,
      },
    },
    color: theme.palette.primary.light,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
      };

      const user = await updateUser(authUser?._id, body);
      if (user) {
        setAuthUser({
          ...authUser,
          email: user.email,
          firstName: user.firstName,
        });
        setForm({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        });
      }
      setSuccess(true);
      setServerError('Successfully changed data!');
    } catch (err) {
      setServerError('Check data. Failed to updated. Try again.');
      console.error(err.message);
    }
    setTimeout(() => {
      setSuccess(false);
      setServerError('');
    }, 3000);
  };

  const handleDelete = async () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {open && <DialogDeleteAccount setOpen={setOpen} />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100vh',
          alignItems: ' center',
          paddingTop: 4,
          overflow: 'auto',
          marginBottom: '80px',
        }}
      >
        <Avatar
          sx={{
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.light,
          }}
        />
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 500, color: theme.palette.primary.dark }}
        >
          Edit Profile
        </Typography>
        <div className="flex justify-between gap-4 pb-8">
          <Button
            onClick={() =>
              navigate('/profile/password', { password: form.password })
            }
            type="button"
            variant="contained"
            size="small"
            sx={{
              fontSize: theme.typography.body2,
              fontWeight: 500,
              padding: '8px 5px',
              margin: '0px auto',
            }}
          >
            Change password
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            variant="contained"
            size="small"
            sx={{
              fontSize: theme.typography.body2,
              fontWeight: 500,
              padding: '8px 5px',
              margin: '0px auto',
              backgroundColor: '#65000B',
              '&:hover': { backgroundColor: '#D21404' },
            }}
          >
            Delete account
          </Button>
        </div>
        <ValidatorForm
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          style={{
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextValidator
            label="First name"
            variant="outlined"
            type="text"
            fullWidth
            sx={{ ...inputStyle, margin: '20px auto' }}
            validators={['required', 'minStringLength:3']}
            errorMessages={[
              'This field is required.',
              'Minimum of 3 characters.',
            ]}
            required
            name="firstName"
            value={form.firstName || ''}
            onChange={handleChange}
          />
          <TextValidator
            label="Last name"
            variant="outlined"
            type="text"
            sx={{ ...inputStyle, marginBottom: '20px' }}
            validators={['required', 'minStringLength:3']}
            errorMessages={[
              'This field is required.',
              'Minimum of 3 characters.',
            ]}
            required
            fullWidth
            name="lastName"
            value={form.lastName || ''}
            onChange={handleChange}
          />
          <TextValidator
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            sx={{ ...inputStyle, marginBottom: '20px' }}
            validators={['required', 'isEmail']}
            errorMessages={['This field is required.', 'Email is not valid.']}
            required
            name="email"
            value={form.email || ''}
            onChange={handleChange}
          />
          <Box
            className="pt-0 pb-4 text-smfont-semibold text-center"
            sx={{ color: success ? theme.palette.primary.main : 'red' }}
          >
            {serverError}
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              sx={{
                fontSize: theme.typography.body2,
                fontWeight: 500,
                margin: '10px auto',
              }}
              endIcon={<KeyboardArrowRightIcon />}
            >
              Save
            </Button>
          </Box>
        </ValidatorForm>
      </Box>
      <Footer />
    </>
  );
};

export default Account;
