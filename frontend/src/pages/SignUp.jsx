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

const formData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const theme = useTheme();
  const [form, setForm] = useState(formData);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
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
      const token = authAPI.data.token;
      localStorage.setItem('token', token);
      setAuthUser(authAPI);
      // const user = await getUser();
      // if (user) {
      //   setAuthUser(user);
      // }
    } else {
      alert(authAPI.error.response.data);
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
        <Box
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
          <TextField
            label="First name"
            variant="outlined"
            type="text"
            sx={inputStyle}
            error={isError ? true : false}
            helperText={isError ? errorText : ''}
            required
            fullWidth
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last name"
            variant="outlined"
            type="text"
            sx={inputStyle}
            error={isError ? true : false}
            helperText={isError ? errorText : ''}
            required
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            sx={inputStyle}
            error={isError ? true : false}
            helperText={isError ? errorText : ''}
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
          <FormControl
            sx={{ ...inputStyle, m: 1, width: '25ch' }}
            variant="outlined"
            required
          >
            <InputLabel htmlFor="conf-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="conf-password"
              type={showPassword ? 'text' : 'password'}
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
              label="Confirm Password"
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{ fontSize: theme.typography.body1, fontWeight: 500 }}
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default SignUp;
