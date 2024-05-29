import Layout from './components/Layout';
import Explore from './pages/Explore';
import { ExploreContextProvider } from './utilis/ExploreContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Favorites from './pages/Favorites';
import Trips from './pages/Trips';
import SingleTrip from './pages/SingleTrip';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

let theme = createTheme({
  typography: {
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2.5rem',
    },
    h3: {
      fontSize: '2rem',
    },
    h4: {
      fontSize: '1.75rem',
    },
    h5: {
      fontSize: '1.5rem',
    },
    h6: {
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
});

theme = responsiveFontSizes(theme);
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <ExploreContextProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/trips/trip" element={<SingleTrip />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={<Account />} />
              <Route path="/logout" element={<Navigate to="/" />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </ExploreContextProvider>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
