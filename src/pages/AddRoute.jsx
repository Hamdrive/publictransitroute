import React from "react";
import { useState } from "react";
import { FaGripLines, FaPlusCircle } from "react-icons/fa";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRoute } from "../context/route-context";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

const AddRoute = () => {
  const [newRoute, setNewRoute] = useState([]);

  const { dispatch } = useRoute();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { updateExistingRoute } = state;

  const handleAddStop = () => {
    if (newRoute.route.stops.length === 0) {
      setNewRoute({
        id: uuidv4(),
        routeName: "",
        routeDirection: "",
        routeStatus: "",
        stops: [{ stopId: "1", stopName: "", stopLat: 0, stopLon: 0 }],
      });
    } else {
      setNewRoute((prevRoute) => ({
        ...prevRoute,
        stops: [
          ...prevRoute.stops,
          {
            stopId: `${prevRoute.stops.length + 1}`,
            stopName: "",
            stopLat: 0,
            stopLon: 0,
          },
        ],
      }));
    }
  };

  const handleUpdateRouteName = (updatedRouteName) => {
    setNewRoute((prevRoute) => ({ ...prevRoute, routeName: updatedRouteName }));
  };

  const handleUpdateRouteDirection = (updatedRouteDirection) => {
    setNewRoute((prevRoute) => ({
      ...prevRoute,
      routeName: updatedRouteDirection,
    }));
  };

  const handleUpdateRouteStatus = (updatedRouteStatus) => {
    setNewRoute((prevRoute) => ({
      ...prevRoute,
      routeName: updatedRouteStatus,
    }));
  };

  const handleUpdateStopName = (currentStopId, updatedStopName) => {
    const updatedStop = newRoute.stops.map((stop) =>
      stop.id === currentStopId ? { ...stop, stopName: updatedStopName } : stop
    );
    setNewRoute((prevRoute) => ({ ...prevRoute, stops: updatedStop }));
  };

  const handleUpdateStopLat = (currentStopId, updatedStopLat) => {
    const updatedStop = newRoute.stops.map((stop) =>
      stop.id === currentStopId ? { ...stop, stopLat: updatedStopLat } : stop
    );
    setNewRoute((prevRoute) => ({ ...prevRoute, stops: updatedStop }));
  };

  const handleUpdateStopLon = (currentStopId, updatedStopLon) => {
    const updatedStop = newRoute.stops.map((stop) =>
      stop.id === currentStopId ? { ...stop, stopLon: updatedStopLon } : stop
    );
    setNewRoute((prevRoute) => ({ ...prevRoute, stops: updatedStop }));
  };

  const handleNewRoute = (dispatchType) => {
    dispatch({ type: dispatchType, payload: newRoute });
    setNewRoute([]);
    navigate("/routes");
  };

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (source.index === destination.index) return;

    let currentStop = {},
      currentStopsList = newRoute.stops,
      newStopsList = [];

    currentStop = currentStopsList[source.index];
    currentStopsList.splice(source.index, 1);
    newStopsList = [
      ...currentStopsList.splice(0, destination.index),
      currentStop,
      ...currentStopsList.splice(destination.index),
    ];

    setNewRoute(newStopsList);
  };

  useEffect(() => {
    if (updateExistingRoute) setNewRoute(updateExistingRoute);
  }, []);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <main>
        <section className="add_route_details_section">
          <input
            type="text"
            name="route_name"
            id="route_name"
            className="route_name_input"
            placeholder="Enter route name"
            onChange={(e) => handleUpdateRouteName(e.target.value)}
            value={newRoute.routeName}
          />
          <section>
            <label htmlFor="route_direction">Choose Direction &nbsp;</label>
            <select
              name="direction"
              id="route_direction"
              onChange={(e) => handleUpdateRouteDirection(e.target.value)}
              value={newRoute.routeDirection}
            >
              <option value="up" selected>
                UP
              </option>
              <option value="down">DOWN</option>
            </select>
          </section>
          <section>
            <label htmlFor="route_status">Choose Status &nbsp;</label>
            <select
              name="status"
              id="route_status"
              onChange={(e) => handleUpdateRouteStatus(e.target.value)}
              value={newRoute.routeStatus}
            >
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
              className="action_button"
              aria-label="Click to enter a new stop"
              onClick={handleAddStop}
            >
              <FaPlusCircle className="plus_circle_icon" />
              Add Stop
            </button>
          </section>
        </section>
        <section className="stop_details_section">
          {newRoute.stops.length > 0 ? (
            <Droppable droppableId="StopsList">
              {(provided) => (
                <section ref={provided.innerRef} {...provided.droppableProps}>
                  {newRoute.stops.map((stop, index) => (
                    <Draggable
                      key={stop.id}
                      draggableId={stop.id}
                      index={index}
                    >
                      {(provided) => (
                        <section
                          className="single_stop_details_section"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <FaGripLines className="stop_grip_lines" />
                          {/* <p>{stop.stopName}</p> */}
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Enter stop name"
                            onChange={(e) =>
                              handleUpdateStopName(stop.id, e.target.value)
                            }
                          />
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Enter stop latitude"
                            onChange={(e) =>
                              handleUpdateStopLat(stop.id, e.target.value)
                            }
                          />
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Enter stop longitude"
                            onChange={(e) =>
                              handleUpdateStopLon(stop.id, e.target.value)
                            }
                          />
                        </section>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </section>
              )}
            </Droppable>
          ) : (
            <p className="empty_route_message">Add a stop to get started!</p>
          )}
        </section>
        <section>
          {newRoute.stops.length > 0 && (
            <button
              name="submit_route"
              id="submit_route"
              className="action_button"
              aria-label="Click to submit route"
              onClick={() =>
                updateExistingRoute ? handleNewRoute("UPDATE_ROUTE") : handleNewRoute("ADD_ROUTE")
              }
            >
              {updateExistingRoute ? "Update Route" : "Submit Route"}
            </button>
          )}
        </section>
      </main>
    </DragDropContext>
  );
};

export default AddRoute;
