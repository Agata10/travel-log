import {
  useTheme,
  Grid,
  Box,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
} from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Paper } from '@mui/material';
import { TripContext } from '../../../utilis/TripContext';
import { getTripExpenses } from '../../../api/tripsAPI';
import ExpenseCard from './ExpenseCard';

const BudgetDetails = () => {
  const theme = useTheme();
  const [openDiv, setOpenDiv] = useState(true);
  const [expenses, setExpenses] = useState(null);
  const [load, setLoad] = useState(false);
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

  //fetch expenses when page loaded
  const fetchData = async () => {
    const expensesData = await getTripExpenses(trip._id);
    if (expensesData) {
      setExpenses(expensesData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [load]);

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
        <Box className="flex justify-between pb-2 w-full">
          <Typography variant="h5">
            <IconButton onClick={() => setOpenDiv((prev) => !prev)}>
              {openDiv ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
            Budget And Expenses
          </Typography>
          <Box
            display={'flex'}
            sx={{
              alignSelf: 'flex-end',
              gap: '15px',
            }}
          >
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
            <Button
              size="small"
              sx={btnStyle}
              variant="standard"
              onClick={() => setAddBudgetDialog(true)}
            >
              Edit budget
            </Button>
          </Box>
        </Box>
      </Grid>
      {openDiv && (
        <Grid
          item
          xs={12}
          sx={{
            width: '100%',
            border: '1px solid green',
            margin: '0 auto',
          }}
        >
          <Paper
            elevation={1}
            sx={{
              borderRadius: '8px',
              width: '60%',
              height: '80px',
              display: 'flex',
              margin: '0 auto',
              justifyContent: ' space-around',
              alignItems: 'space-around',
              flexDirection: 'column',
            }}
          >
            <Box
              display={'flex'}
              sx={{
                width: '80%',
                margin: '0 auto',
                justifyContent: 'space-around',
              }}
            >
              <Typography
                onClick={() => setAddBudgetDialog(true)}
                sx={{
                  fontSize: theme.typography.h6,
                  cursor: 'default',
                }}
              >
                Sum of expenses: {sumOfExpenses}$
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
          </Paper>

          <List
            sx={{
              borderRadius: '8px',
              width: '70%',
              margin: '20px auto',
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexDirection: 'column',
              elevation: 0,
            }}
          >
            {expenses &&
              expenses.map((e) => (
                <ExpenseCard key={e._id} expense={e} setLoad={setLoad} />
              ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
};

export default BudgetDetails;
