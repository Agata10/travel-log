import { Box, Container, Typography, useTheme } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Footer from '../components/Footer';

const SignUp = () => {
  const theme = useTheme();
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = () => {};
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '90vh',
          alignItems: ' center',
          border: '1px solid black',
          paddingTop: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
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
          />
          <TextField
            label="Last name"
            variant="outlined"
            type="text"
            sx={inputStyle}
            error={isError ? true : false}
            helperText={isError ? errorText : ''}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            sx={inputStyle}
            error={isError ? true : false}
            helperText={isError ? errorText : ''}
            required
          />
          <FormControl
            sx={{ ...inputStyle, m: 1, width: '25ch' }}
            variant="outlined"
            required
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
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
