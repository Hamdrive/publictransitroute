import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useRoute } from '../context/route-context';

const ViewSingleRoute = () => {
  const [singleRoute, setSingleRoute] = useState([])
  const {state: routes} = useRoute()
  const {routeName} = useParams()

  useEffect(() => {
    const getSingleRoute = routes.routes.filter(route => route.routeName === routeName)
    setSingleRoute(getSingleRoute)
  }, [])
  return (
    <>
      <main>
        <section>{/* Insert TomTom Map here */}</section>
        <section className="route_details">
          <p>
            <u>
              <strong>Route Name:</strong>
            </u>
            &nbsp;
            {singleRoute?.[0]?.routeName}
          </p>
          <p>
            <u>
              <strong>Direction:</strong>
            </u>
            &nbsp;
            {singleRoute?.[0]?.routeDirection}
          </p>
          <p>
            <u>
              <strong>Status:</strong>
            </u>
            &nbsp;
            {singleRoute?.[0]?.routeStatus}
          </p>
        </section>
        <section className="routes_section">
          <table className="routes_table">
            <thead>
              <tr>
                <th>Stop Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {singleRoute?.[0]?.stops?.map((stop) => (
                <tr key={stop?.stopId}>
                  <td>{stop.stopName}</td>
                  <td>{stop.stopLat}</td>
                  <td>{stop.stopLon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export default ViewSingleRoute;
