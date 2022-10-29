import { Route, Routes } from 'react-router-dom';
import { AddRoute, Home, ViewAllRoutes, ViewSingleRoute } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="routes" element={<ViewAllRoutes />} />
      <Route path="routes/:routeId" element={<ViewSingleRoute />} />
      <Route path="addroute" element={<AddRoute />} />
    </Routes>
  );
}

export default App;
