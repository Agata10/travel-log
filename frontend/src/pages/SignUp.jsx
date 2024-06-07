import { Box, Container, Typography, useTheme } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Footer from '../components/Footer';
import { signup } from '../api/authAPI';
import { AuthContext } from '../utilis/context/AuthContext';
import { getUser } from '../api/userAPI';
import { useNavigate } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const formData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const errors = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState(formData);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState(errors);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const { setAuthUser } = authContext;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    const authAPI = await signup(form);

    if (authAPI && !authAPI.error) {
      const token = authAPI.token;
      localStorage.setItem('token', token);
      const user = await getUser();
      setAuthUser({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        token: token,
      });
      navigate('/');
    } else {
      setServerError(authAPI.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '90vh',
          alignItems: ' center',
          paddingTop: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Sign up
        </Typography>
        <ValidatorForm
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <TextValidator
            label="First name"
            variant="outlined"
            type="text"
            sx={inputStyle}
            validators={['required', 'minStringLength:3']}
            errorMessages={[
              'This field is required',
              'Minimum of 3 characters',
            ]}
            required
            fullWidth
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          <TextValidator
            label="Last name"
            variant="outlined"
            type="text"
            sx={inputStyle}
            validators={['required', 'minStringLength:3']}
            errorMessages={[
              'This field is required',
              'Minimum of 3 characters',
            ]}
            required
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
          <TextValidator
            label="Email"
            variant="outlined"
            type="email"
            sx={inputStyle}
            validators={['required', 'isEmail']}
            errorMessages={['This field is required', 'Email is not valid']}
            required
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <FormControl
            sx={{ ...inputStyle, m: 1, width: '25ch' }}
            variant="outlined"
            required
          >
            <TextValidator
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              validators={[
                'required',
                'matchRegexp:^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$',
              ]}
              errorMessages={[
                'This field is required',
                'At least 8 characters' +
                  '\n' +
                  'One symbol \n One number \n One upper letter \n One lower letter',
              ]}
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl
            sx={{ ...inputStyle, m: 1, width: '25ch' }}
            variant="outlined"
            required
          >
            <TextValidator
              id="conf-password"
              type={showPassword ? 'text' : 'password'}
              validators={['required', 'isEmail']}
              errorMessages={['This field is required', 'Email is not valid']}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Confirm Password"
            />
          </FormControl>
          <div className="pt-0 pb-4 text-sm text-red-800 font-semibold">
            {serverError === 'User already exists' ? serverError : ''}
          </div>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{ fontSize: theme.typography.body1, fontWeight: 500 }}
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        </ValidatorForm>
      </Container>
      <Footer />
    </>
  );
};

export default SignUp;
