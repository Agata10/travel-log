import { createContext, useState } from 'react';
export const TripContext = createContext();
import { useParams } from 'react-router-dom';

//context for trip,trips pages and favorite places page
export const TripContextProvider = ({ children }) => {
  const [trip, setTrip] = useState(null);
  const [places, setPlaces] = useState(null);
  const { tripId } = useParams();
  const [sumOfExpenses, setSumOfExpeneses] = useState(0);
  const [expense, setExpense] = useState(null);
  const [addBudgetDialog, setAddBudgetDialog] = useState(false);
  const [addExpenseDialog, setAddExpenseDialog] = useState(false);

  return (
    <TripContext.Provider
      value={{
        trip,
        setTrip,
        tripId,
        places,
        setPlaces,
        sumOfExpenses,
        setSumOfExpeneses,
        expense,
        setExpense,
        addBudgetDialog,
        setAddBudgetDialog,
        addExpenseDialog,
        setAddExpenseDialog,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
