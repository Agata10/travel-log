import {
  Avatar,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Button, TextField } from '@mui/material';
import { useState, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Footer from '../components/Footer';
import { login } from '../api/authAPI';
import { AuthContext } from '../utilis/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/userAPI';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const formData = {
  email: '',
  password: '',
};

const LogIn = () => {
  const theme = useTheme();
  const [form, setForm] = useState(formData);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const { setAuthUser } = authContext;
  const navigate = useNavigate();
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
    const authAPI = await login(form);
    if (form.email.length === 0 || form.password.length === 0) {
      setServerError('Please fill out all fields.');
      return;
    }
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
      setServerError(null);
      navigate('/trips');
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
          Log in
        </Typography>
        <ValidatorForm
          component="form"
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
          style={{
            width: isBigScreen ? '30%' : '60%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            sx={{ ...inputStyle, margin: '20px auto' }}
            error={isError ? true : false}
            helperText={isError ? errorText : ''}
            required
            fullWidth
            value={form.email}
            onChange={handleChange}
          />
          <FormControl
            sx={{ ...inputStyle, width: '100%' }}
            variant="outlined"
            required
          >
            <TextValidator
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              sx={{
                ...inputStyle,
                width: '100%',
              }}
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
              label="Password"
            />
          </FormControl>
          <div className="pt-1 pb-4 text-sm text-red-800 font-semibold text-center">
            {serverError ? serverError : ''}
          </div>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{
              fontSize: theme.typography.body1,
              fontWeight: 500,
              margin: '5px auto',
            }}
            endIcon={<KeyboardArrowRightIcon />}
          >
            Log in
          </Button>
        </ValidatorForm>
      </Container>
      <Footer />
    </>
  );
};

export default LogIn;
