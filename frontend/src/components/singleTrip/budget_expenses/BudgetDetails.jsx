import {
  useTheme,
  Grid,
  Box,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { useContext, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Paper } from '@mui/material';
import { TripContext } from '../../../utilis/TripContext';

const BudgetDetails = ({ percent }) => {
  const theme = useTheme();
  const [openDiv, setOpenDiv] = useState(true);
  const context = useContext(TripContext);
  const { sumOfExpenses, trip, setAddBudgetDialog, setAddExpenseDialog } =
    context;

  const btnStyle = {
    borderRadius: '8px',
    backgroundColor: theme.palette.primary.light,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.dark,
    },
  };

  return (
    <Grid container pt={3} pb={3} sx={{ width: '100%' }}>
      <Grid
        item
        sx={{
          typography: { ...theme.typography.h4 },
          width: '100%',
        }}
        textAlign={'center'}
      >
        <Box className="flex justify-between pb-2">
          <Typography variant="h5">
            <IconButton onClick={() => setOpenDiv((prev) => !prev)}>
              {openDiv ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
            Budget And Expenses
          </Typography>
          <Button
            size="small"
            sx={btnStyle}
            variant="standard"
            onClick={() => setAddExpenseDialog(true)}
          >
            Add expense
          </Button>
        </Box>
      </Grid>
      {openDiv && (
        <Grid
          item
          xs={12}
          sx={{
            width: '100%',
          }}
        >
          <Paper
            sx={{
              backgroundColor: 'whitesmoke',
              borderRadius: '12px',
              width: '100%',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
              sx={{ width: '80%', margin: '0 auto', alignItems: 'center' }}
            >
              <Box
                display="flex"
                sx={{ alignItems: 'flex-end', cursor: 'default' }}
              >
                {sumOfExpenses}$
              </Box>
              <div className="w-8/12 h-4 bg-slate-300 rounded-md">
                <div
                  className="h-4 bg-green-700 rounded-md relative"
                  style={{ width: `${percent}%` }}
                >
                  {percent > 0 && (
                    <p className="absolute -right-12 -top-1">{percent}%</p>
                  )}
                </div>
              </div>
              <Typography
                onClick={() => setAddBudgetDialog(true)}
                sx={{
                  fontSize: theme.typography.h6,
                  '&:hover': {
                    transform: 'scale(1.2)',
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Budget: {trip.budget}$
              </Typography>
            </Box>
          </Paper>
          <Box>{/* list of expenses */}</Box>
        </Grid>
      )}
    </Grid>
  );
};

export default BudgetDetails;
