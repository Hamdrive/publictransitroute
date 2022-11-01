import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useRoute } from '../context/route-context';
import { MapContainer,TileLayer } from "react-leaflet";
import "leaflet-routing-machine";
import Map from '../components/Map';

const ViewSingleRoute = () => {
  const [singleRoute, setSingleRoute] = useState([])
  const {state: routes} = useRoute()
  const {routeId} = useParams()

  useEffect(() => {
    const getSingleRoute = routes.routes.filter(
      (route) => route.id === routeId
    );
    setSingleRoute(getSingleRoute)
  }, [])

  return (
    <>
      <main>
        <section className="route_map_section">
          <MapContainer
            className="mapDiv"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Map allStops={singleRoute?.[0]?.stops} />
          </MapContainer>
        </section>
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
                  <td>{stop.stopLng}</td>
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
