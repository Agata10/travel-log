import Explore from './pages/Explore';
import { ExploreContextProvider } from './utilis/ExploreContext';

function App() {
  return (
    <>
      <ExploreContextProvider>
        <Explore />
      </ExploreContextProvider>
    </>
  );
}

export default App;
