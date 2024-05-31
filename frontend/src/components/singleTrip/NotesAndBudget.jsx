import { Box, Paper, Typography, IconButton, TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';

const NotesAndBudget = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box className="flex flex-col ">
      <Box className="flex justify-between">
        <Typography variant="h5">
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
          Notes
        </Typography>
        <Typography variant="h5" sx={{ width: '48%' }}>
          Budget
        </Typography>
      </Box>
      {open && (
        <Box
          elevation={1}
          className="w-full h-20 flex gap-4"
          sx={{ borderRadius: '12px' }}
        >
          <Paper
            sx={{
              backgroundColor: 'whitesmoke',
              borderRadius: '12px',
              width: '50%',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              // inputRef={inputRef}
              // defaultValue={trip.name}
              sx={{ width: '100%' }}
              placeholder="Any thoughts? Better take notes to not forget.."
              variant="standard"
              multiline
              rows={3}
              // onBlur={handleInputBlur}
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: '1rem',
                  fontWeight: 'semi-bold',
                  paddingLeft: '15px',
                  paddingTop: '5px',
                  '&:hover': {
                    backgroundColor: 'whitesmoke',
                    borderRadius: '12px',
                  },
                },
              }}
            />
          </Paper>
          <Paper
            sx={{
              backgroundColor: 'whitesmoke',
              borderRadius: '12px',
              width: '50%',
              height: '100px',
            }}
          ></Paper>
        </Box>
      )}
    </Box>
  );
};

export default NotesAndBudget;
