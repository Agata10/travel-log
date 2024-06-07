import {
  useTheme,
  Grid,
  Box,
  Typography,
  IconButton,
  Button,
  List,
} from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Paper } from '@mui/material';
import { TripContext } from '../../../utilis/context/TripContext';
import { getTripExpenses } from '../../../api/tripsAPI';
import ExpenseCard from './ExpenseCard';

const BudgetDetails = ({ setRefresh, refresh }) => {
  const theme = useTheme();
  const [openDiv, setOpenDiv] = useState(true);
  const [expenses, setExpenses] = useState(null);
  const context = useContext(TripContext);
  const { sumOfExpenses, trip, setAddBudgetDialog, setAddExpenseDialog } =
    context;

  const btnStyle = {
    borderRadius: '8px',
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    padding: { xs: '3px', sm: '6px 16px' },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: 'whitesmoke',
    },
  };

  useEffect(() => {
    //fetch expenses when page loaded
    if (trip) {
      const fetchData = async () => {
        const expensesData = await getTripExpenses(trip._id);
        if (expensesData) {
          setExpenses(expensesData);
        }
      };

      fetchData();
    }
  }, [refresh, trip]);

  return (
    <Grid container pt={openDiv ? 4 : 2} pb={3} sx={{ width: '100%' }}>
      <Grid
        item
        sx={{
          typography: { ...theme.typography.h4 },
          width: '100%',
        }}
        textAlign={'center'}
      >
        <Box className="flex mb-2 space-between w-full">
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              textAlign: 'left',
            }}
          >
            <IconButton
              onClick={() => setOpenDiv((prev) => !prev)}
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              {openDiv ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
            Budget And Expenses
          </Typography>

          <Box
            display={'flex'}
            sx={{
              alignSelf: 'center',
              marginLeft: 'auto',
              gap: '15px',
            }}
          >
            <Typography
              onClick={() => setAddBudgetDialog(true)}
              sx={{
                fontSize: theme.typography.h6,
                display: { xs: 'none', md: 'flex' },
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
          }}
        >
          <Paper
            elevation={1}
            sx={{
              borderRadius: '8px',
              width: { xs: '100%', sm: '80%', md: '60%' },
              height: '80px',
              margin: '0 auto',
              boxShadow: `0px 2px 3px ${theme.palette.primary.light}`,
            }}
          >
            <Box
              display={'flex'}
              sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                padding: '0 5px',
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
                sx={{
                  ...btnStyle,
                  backgroundColor: theme.palette.primary.light,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
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
              width: { xs: '100%', md: '80%' },
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
                <ExpenseCard key={e._id} expense={e} setRefresh={setRefresh} />
              ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
};

export default BudgetDetails;
