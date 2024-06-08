import { useEffect, useContext, useState, useRef } from 'react';
import SingleTripHeader from '../components/singleTrip/SingleTripHeader';
import { Box } from '@mui/material';
import { getSingleTrip } from '../api/tripsAPI';
import { useParams } from 'react-router-dom';
import { TripContext } from '../utilis/context/TripContext';
import NotesAndBudget from '../components/singleTrip/NotesAndBudget';
import PlacesToVisit from '../components/singleTrip/PlacesToVisit';
import Footer from '../components/Footer';
import BudgetDetails from '../components/singleTrip/budget_expenses/BudgetDetails';
import DialogAddBudget from '../components/singleTrip/budget_expenses/DialogAddBudget';
import { getTripExpenses } from '../api/tripsAPI';
import DialogAddExpense from '../components/singleTrip/budget_expenses/DialogAddExpense';
import Itinerary from '../components/singleTrip/iternary/Itinerary';

const SingleTrip = () => {
  const tripContext = useContext(TripContext);
  const [refresh, setRefresh] = useState(false);
  const { trip, setTrip, setSumOfExpeneses } = tripContext;
  const { tripId } = useParams();
  const [percent, setPercent] = useState(0);
  const boxRef = useRef(null);
  const [openDiv, setOpenDiv] = useState(false);

  const scrollToBox = () => {
    boxRef.current.scrollIntoView({ behavior: 'smooth' });
    setOpenDiv(true);
  };

  const fetchData = async () => {
    const tripResponse = await getSingleTrip(tripId);
    if (tripResponse) {
      setTrip(tripResponse);
    }
  };

  useEffect(() => {
    fetchData();
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
    if (trip) {
      calcExpensesSum();
    }
  }, [trip, refresh]);

  return (
    <Box className="w-full">
      {trip && (
        <Box
          className=" w-full flex flex-col items-center gap-10 min-h-screen mb-10"
          pt={4}
        >
          <DialogAddBudget setRefresh={setRefresh} />
          <DialogAddExpense setRefresh={setRefresh} />
          <SingleTripHeader setRefresh={setRefresh} />
          <Box className="w-10/12 md:w-8/12 flex flex-col">
            <NotesAndBudget
              percent={percent}
              scrollToBox={scrollToBox}
              setOpenDiv={setOpenDiv}
            />
            <PlacesToVisit />
            <Itinerary />
            <BudgetDetails
              refresh={refresh}
              setRefresh={setRefresh}
              boxRef={boxRef}
              openDiv={openDiv}
              setOpenDiv={setOpenDiv}
            />
          </Box>
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default SingleTrip;
