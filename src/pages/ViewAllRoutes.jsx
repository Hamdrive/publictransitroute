import React, { useState } from "react";
import { useEffect } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRoute } from "../context/route-context";

const ViewAllRoutes = () => {
  const [searchRouteName, setSearchRouteName] = useState("");
  const [allRoutes, setAllRoutes] = useState({});
  const { state: routes, dispatch } = useRoute();
  const navigate = useNavigate();

  const getSpecificRoutes = () => {

    const specifcRoutes = allRoutes.filter((route) =>
      route.routeName.includes(searchRouteName)
    );
    setAllRoutes(specifcRoutes);
  };

  useEffect(() => {
    setAllRoutes(routes.routes);
  }, [routes]);

  useEffect(() => {
    if(searchRouteName)getSpecificRoutes();
    else setAllRoutes(routes.routes);
  }, [searchRouteName]);

  return (
    <>
      <main>
        <section className="search_section">
          <input
            type="text"
            name="search_route"
            id="search_route"
            className="search_bar"
            placeholder="Enter Route Name..."
            aria-label="Search a specific route"
            onChange={(e) => setSearchRouteName(e.target.value)}
            value={searchRouteName}
          />
        </section>
        <section className="routes_section">
          {allRoutes?.length > 0 && (
            <table className="routes_table">
              <thead>
                <tr>
                  <th>Route Name</th>
                  <th>Direction</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allRoutes?.map((route) => (
                  <tr key={route?.id}>
                    <td onClick={() => navigate(`/routes/${route?.routeName}`)}>
                      {route?.routeName}
                    </td>
                    <td onClick={() => navigate(`/routes/${route?.routeName}`)}>
                      {route?.routeDirection}
                    </td>
                    <td onClick={() => navigate(`/routes/${route?.routeName}`)}>
                      {route?.routeStatus}
                    </td>
                    <td>
                      <FaPen
                        className="edit_icon"
                        onClick={() =>
                          navigate("/addroute", {
                            state: { updateExistingRoute: route },
                          })
                        }
                      />
                    </td>
                    <td>
                      <FaTrashAlt
                        className="delete_icon"
                        onClick={() => {
                          dispatch({ type: "DELETE_ROUTE", payload: route });
                          navigate("/routes");
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {allRoutes.length === 0 && (
            <section className="empty_routes_section">
              <p className="empty_route_message">
                Oops! No Routes Found. Why not add a new one?
              </p>
              <button
                className="action_button"
                onClick={() => navigate("/addroute")}
              >
                Add Route
              </button>
            </section>
          )}
        </section>
      </main>
    </>
  );
};

export default ViewAllRoutes;
