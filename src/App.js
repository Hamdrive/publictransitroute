import { Route, Routes } from 'react-router-dom';
import { AddRoute, Home, ViewAllRoutes, ViewSingleRoute } from './pages';
import {FaHome} from 'react-icons/fa'

function App() {
  return (
    <>
      <header className='navbar'>
        <section className='navbar_home'>
          <FaHome />
        </section>
        <section className="navbar_heading">
          <h2>Traffic se bachte hai</h2>
        </section>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="routes" element={<ViewAllRoutes />} />
        <Route path="routes/:routeId" element={<ViewSingleRoute />} />
        <Route path="addroute" element={<AddRoute />} />
      </Routes>
    </>
  );
}

export default App;
