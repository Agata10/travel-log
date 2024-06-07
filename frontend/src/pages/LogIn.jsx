import { Box, Container, Typography, useTheme } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { useState, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
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

const formData = {
  email: '',
  password: '',
};

const LogIn = () => {
  const theme = useTheme();
  const [form, setForm] = useState(formData);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const { setAuthUser } = authContext;
  const navigate = useNavigate();

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
    console.log(authAPI);
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
        <Typography variant="h6" gutterBottom>
          Log In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            sx={inputStyle}
            error={isError ? true : false}
            helperText={isError ? errorText : ''}
            required
            value={form.email}
            onChange={handleChange}
          />
          <FormControl
            sx={{ ...inputStyle, mt: 1, width: '25ch' }}
            variant="outlined"
            required
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              endAdornment={
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
              }
              label="Password"
            />
          </FormControl>
          <div className="pt-0 pb-4 text-sm text-red-800 font-semibold">
            {serverError ? serverError : ''}
          </div>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{ fontSize: theme.typography.body1, fontWeight: 500 }}
            endIcon={<KeyboardArrowRightIcon />}
          >
            Log in
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default LogIn;
