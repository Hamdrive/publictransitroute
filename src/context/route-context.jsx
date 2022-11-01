import { useContext, useReducer, useState, useEffect } from "react";
import { createContext } from "react";
import { routeReducer } from "../reducer/routeReducer";

const initialDataState = { routes: [] };

const RouteContext = createContext(initialDataState);

const useRoute = () => useContext(RouteContext);

const RouteProvider = ({ children }) => {
  const [routes, setRoutes] = useState([]);

  const [state, dispatch] = useReducer(
    routeReducer,
    JSON.parse(localStorage.getItem("routes")) ?? initialDataState
  );

  useEffect(() => {
    localStorage.setItem("routes", JSON.stringify(state));
  }, [state]);

  return (
    <RouteContext.Provider value={{ routes, setRoutes, state, dispatch }}>
      {children}
    </RouteContext.Provider>
  );
};

export { RouteProvider, useRoute };
