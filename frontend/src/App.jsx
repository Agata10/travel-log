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

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
