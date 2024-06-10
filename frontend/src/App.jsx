import Layout from './components/Layout';
import Explore from './pages/Explore';
import { ExploreContextProvider } from './utilis/context/ExploreContext';
import { TripContextProvider } from './utilis/context/TripContext';
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

import { AuthContext } from './utilis/context/AuthContext';
import { themeMaterialUI } from './assets/themeMaterialUI';
import { useContext } from 'react';
import PasswordChange from './components/accountSettings/PasswordChange';

let theme = createTheme(themeMaterialUI);
theme = responsiveFontSizes(theme);

function App() {
  const { authUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    // Show a loading spinner or some kind of loading indicator
    return <div>Loading...</div>;
  }
  return (
    <div className="overflow-x-hidden">
      <ThemeProvider theme={theme}>
        <TripContextProvider>
          <ExploreContextProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/explore" element={<Explore />} />
                <Route
                  path="/trips"
                  element={authUser ? <Trips /> : <Navigate to="/login" />}
                />
                <Route
                  path="/trips/trip/:tripId"
                  element={authUser ? <SingleTrip /> : <Navigate to="/login" />}
                />
                <Route
                  path="/favorites"
                  element={authUser ? <Favorites /> : <Navigate to="/login" />}
                />
                <Route
                  path="/profile"
                  element={authUser ? <Account /> : <Navigate to="/login" />}
                />
                <Route
                  path="/profile/password"
                  element={
                    authUser ? <PasswordChange /> : <Navigate to="/login" />
                  }
                />
                <Route path="/logout" element={<Navigate to="/" />} />
                <Route
                  path="/login"
                  element={!authUser ? <LogIn /> : <Navigate to="/" />}
                />
                <Route
                  path="/signup"
                  element={!authUser ? <SignUp /> : <Navigate to="/" />}
                />
              </Routes>
            </Layout>
          </ExploreContextProvider>
        </TripContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
