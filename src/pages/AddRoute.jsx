import React from "react";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";

const AddRoute = () => {
  const [stops, setStops] = useState([
    { id: 1, stopName: "A", latitude: 18.949127, longitude: 72.83477 },
    { id: 2, stopName: "B", latitude: 19.12498, longitude: 72.916664 },
    { id: 3, stopName: "C", latitude: 19.229732, longitude: 72.85623 },
  ]);
  return (
    <>
      <main>
        <section>
          <input
            type="text"
            name="route_name"
            id="route_name"
            placeholder="Enter route name"
          />
          <section>
            <label for="route_direction">Choose Direction</label>
            <select name="direction" id="route_direction">
              <option value="up" selected>
                UP
              </option>
              <option value="down">DOWN</option>
            </select>
          </section>
          <section>
            <label for="route_status">Choose Status</label>
            <select name="status" id="route_status">
              <option value="active" selected>
                ACTIVE
              </option>
              <option value="inactive">INACTIVE</option>
            </select>
          </section>
          <section>
            <button
              id="add_stop"
              name="add_stop"
              aria-label="Click to enter a new stop"
            >
              Add Stop
            </button>
          </section>
        </section>
        <section>
          <ReactSortable handle={true} list={stops} setList={setStops}>
            {stops.map((stop) => (
              <tr key={stop.id}>
                <td>||||||</td>
                <td>{stop.stopName}</td>
                <td>{stop.latitude}</td>
                <td>{stop.longitude}</td>
              </tr>
            ))}
          </ReactSortable>
        </section>
        <section>
          <button
            name="submit_route"
            id="submit_route"
            aria-label="Click to submit route"
          >
            Submit Route
          </button>
        </section>
      </main>
    </>
  );
};

export default AddRoute;
