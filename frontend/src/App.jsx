import Layout from './components/Layout';
import Explore from './pages/Explore';
import { ExploreContextProvider } from './utilis/ExploreContext';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Layout>
        <ExploreContextProvider>
          <Routes>
            <Route path="/" element={<Explore />} />
          </Routes>
        </ExploreContextProvider>
      </Layout>
    </>
  );
}

export default App;
