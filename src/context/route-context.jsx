import { useContext, useReducer, useState, useEffect } from "react";
import { createContext } from "react";
import { routeReducer } from "../reducer/routeReducer";

const initialDataState = { routes: [] };

const RouteContext = createContext(initialDataState);

const useRoute = () => useContext(RouteContext);

const RouteProvider = ({ children }) => {
  const [routes, setRoutes] = useState([]);

  const [state, dispatch] = useReducer(routeReducer, initialDataState);

  useEffect(() => {
    const getRoutes = JSON.parse(localStorage.getItem("routes")) || [];
    dispatch({ type: "STORE_ROUTES", payload: getRoutes });
  }, []);

  useEffect(() => {
    if (state?.routes.length > 0) {
      localStorage.setItem("routes", JSON.stringify(state));
    }
  }, [state]);

  return (
    <RouteContext.Provider value={{ routes, setRoutes, state, dispatch }}>
      {children}
    </RouteContext.Provider>
  );
};

export { RouteProvider, useRoute };
