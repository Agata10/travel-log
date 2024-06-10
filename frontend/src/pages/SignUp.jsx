import {
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Button } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
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

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState(formData);
  const confpassInput = useRef();
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const { setAuthUser } = authContext;
  const isBigScreen = useMediaQuery(theme.breakpoints.up('md'));

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
      if (user) {
        setAuthUser({
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          token: token,
        });
        navigate('/');
      }
    } else {
      setServerError(authAPI.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeConfPass = () => {
    if (confpassInput.current.value !== form.password) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <>
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
          Sign up
        </Typography>
        <ValidatorForm
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          style={{
            width: isBigScreen ? '30%' : '60%',
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
            value={form.firstName}
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
            value={form.lastName}
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
            value={form.email}
            onChange={handleChange}
          />
          <Box
            sx={{
              display: 'flex',
              gap: { xs: '20px', sm: 1 },
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              width: '100%',
            }}
          >
            <FormControl
              sx={{ ...inputStyle, width: { xs: '100%', sm: '50%' } }}
              variant="outlined"
              required
            >
              <TextValidator
                id="password"
                sx={{
                  ...inputStyle,
                  width: '100%',
                  '& .MuiFormHelperText-root': {
                    whiteSpace: 'pre-line',
                    paddingTop: 1,
                    paddingLeft: 1,
                    margin: 0,
                    lineHeight: '14px',
                  },
                }}
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                validators={[
                  'required',
                  'matchRegexp:^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$',
                ]}
                errorMessages={[
                  'This field is required.',
                  'Please provide password with: \n At least 8 characters. \n One symbol. \n One number. \n One upper letter. \n One lower letter.',
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
              sx={{ ...inputStyle, width: { xs: '100%', sm: '50%' } }}
              variant="outlined"
              required
            >
              <TextValidator
                sx={{
                  ...inputStyle,
                  width: '100%',
                }}
                onChange={handleChangeConfPass}
                id="conf-password"
                inputRef={confpassInput}
                type={showPassword ? 'text' : 'password'}
                error={error}
                helperText={error ? "Passwords don't match." : ''}
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
          </Box>
          <div className="pt-0 pb-4 text-sm text-red-800 font-semibold text-center">
            {serverError === 'User already exists' ? serverError : ''}
          </div>
          <Box sx={{ display: 'flex' }}>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              sx={{
                fontSize: theme.typography.body1,
                fontWeight: 500,
                width: { xs: '50%', sm: '25%' },
                margin: '10px auto',
              }}
              endIcon={<KeyboardArrowRightIcon />}
            >
              Submit
            </Button>
          </Box>
        </ValidatorForm>
      </Box>
      <Footer />
    </>
  );
};

export default SignUp;
