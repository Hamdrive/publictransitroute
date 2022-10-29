import { Route, Routes } from 'react-router-dom';
import { Home, ViewAllRoutes, ViewSingleRoute } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="routes" element={<ViewAllRoutes />} />
      <Route path="routes/:routeId" element={<ViewSingleRoute />} />
    </Routes>
  );
}

export default App;
