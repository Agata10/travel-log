import { useEffect, useContext, useState } from 'react';
import SingleTripHeader from '../components/singleTrip/SingleTripHeader';
import { Box } from '@mui/material';
import { getSingleTrip } from '../api/tripsAPI';
import { useParams } from 'react-router-dom';
import { TripContext } from '../utilis/TripContext';
import { ExploreContext } from '../utilis/ExploreContext';
import { RotatingLines } from 'react-loader-spinner';
import NotesAndBudget from '../components/singleTrip/NotesAndBudget';
import PlacesToVisit from '../components/singleTrip/PlacesToVisit';
import Footer from '../components/Footer';
import BudgetDetails from '../components/singleTrip/budget_expenses/BudgetDetails';
import DialogAddBudget from '../components/singleTrip/budget_expenses/DialogAddBudget';
import { getTripExpenses } from '../api/tripsAPI';
import DialogAddExpense from '../components/singleTrip/budget_expenses/DialogAddExpense';

const SingleTrip = () => {
  const tripContext = useContext(TripContext);
  const exploreContext = useContext(ExploreContext);
  const [refresh, setRefresh] = useState(false);
  const { trip, setTrip, setSumOfExpeneses } = tripContext;
  const { setIsLoading, isLoading } = exploreContext;
  const { tripId } = useParams();
  const [percent, setPercent] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    const tripResponse = await getSingleTrip(tripId);
    if (tripResponse) {
      setTrip(tripResponse);
    }
  };

  useEffect(() => {
    fetchData();
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    () => {
      clearTimeout(timeout);
    };
  }, [refresh]);

  const calcExpensesSum = async () => {
    try {
      const expenses = await getTripExpenses(tripId);
      const sum = expenses.reduce((accumulator, expense) => {
        return accumulator + expense.amount;
      }, 0);
      if (trip) {
        const percentageOfBudget = ((sum / trip.budget) * 100).toFixed(2);
        setSumOfExpeneses(sum);
        setPercent(percentageOfBudget);
      }
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  //NOTE: calc it when added an expense
  //i need might to move it up to single trip to manage it in the context
  useEffect(() => {
    console.log(trip);
    if (trip) {
      calcExpensesSum();
    }
    console.log(percent);
  }, [trip, refresh]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-5/6">
        <RotatingLines
          visible={true}
          height="80"
          width="80"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }
  return (
    <Box className="w-full">
      {trip && (
        <Box
          className=" w-full flex flex-col items-center gap-10 min-h-screen"
          pt={4}
        >
          <DialogAddBudget setRefresh={setRefresh} />
          <DialogAddExpense setRefresh={setRefresh} />
          <SingleTripHeader setRefresh={setRefresh} />
          <Box className="w-10/12 md:w-8/12 flex flex-col">
            <NotesAndBudget percent={percent} />
            <PlacesToVisit />
            <BudgetDetails percent={percent} />
          </Box>
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default SingleTrip;
