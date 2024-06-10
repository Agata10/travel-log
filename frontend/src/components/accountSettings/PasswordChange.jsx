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
import Footer from '../Footer';
import { AuthContext } from '../../utilis/context/AuthContext';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { updateUser } from '../../api/userAPI';

const PasswordChange = () => {
  const theme = useTheme();
  const [pass, setPass] = useState('');
  const confpassInput = useRef();
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { authUser } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = async (event) => {
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
    try {
      const body = {
        password: pass,
      };

      console.log(pass);
      await updateUser(authUser?._id, body);
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
    confpassInput.current.value = '';
    setPass('');
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPass(value);
  };

  const handleChangeConfPass = () => {
    if (confpassInput.current.value !== pass) {
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
          sx={{
            fontWeight: 500,
            color: theme.palette.primary.dark,
            paddingTop: '8px',
          }}
        >
          Change Password
        </Typography>
        <ValidatorForm
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          style={{
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '12px',
          }}
        >
          <FormControl
            sx={{ ...inputStyle, width: '100%', paddingBottom: '12px' }}
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
              value={pass}
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
            sx={{ ...inputStyle, width: '100%' }}
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
                fontSize: theme.typography.body1,
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

export default PasswordChange;
