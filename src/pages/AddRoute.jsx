import React, { useEffect, useState } from "react";
import { FaGripLines, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRoute } from "../context/route-context";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";

const AddRoute = () => {
  const [newRoute, setNewRoute] = useState({
    id: uuidv4(),
    routeName: null,
    routeDirection: "UP",
    routeStatus: "ACTIVE",
    stops: [],
  });

  const { dispatch } = useRoute();
  const navigate = useNavigate();
  const { state } = useLocation();
  const formRef = useRef("");

  const handleAddStop = () => {
    if (newRoute?.stops?.length === 0) {
      setNewRoute((prevRoute) => ({ ...prevRoute, stops: [{ stopId: "1" }] }));
    } else {
      setNewRoute((prevRoute) => ({
        ...prevRoute,
        stops: [
          ...prevRoute?.stops,
          {
            stopId: `${prevRoute?.stops?.length + 1}`,
            stopName: "",
            stopLat: 0,
            stopLng: 0,
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
      routeDirection: updatedRouteDirection,
    }));
  };

  const handleUpdateRouteStatus = (updatedRouteStatus) => {
    setNewRoute((prevRoute) => ({
      ...prevRoute,
      routeStatus: updatedRouteStatus,
    }));
  };

  const handleUpdateStopName = (currentStopId, updatedStopName) => {
    const updatedStop = newRoute?.stops?.map((stop) =>
      stop?.stopId === currentStopId
        ? { ...stop, stopName: updatedStopName }
        : stop
    );
    setNewRoute((prevRoute) => ({ ...prevRoute, stops: updatedStop }));
  };

  const handleUpdateStopLat = (currentStopId, updatedStopLat) => {
    const updatedStop = newRoute?.stops?.map((stop) =>
      stop?.stopId === currentStopId
        ? { ...stop, stopLat: updatedStopLat }
        : stop
    );
    setNewRoute((prevRoute) => ({ ...prevRoute, stops: updatedStop }));
  };

  const handleUpdateStopLng = (currentStopId, updatedStopLng) => {
    const updatedStop = newRoute?.stops?.map((stop) =>
      stop?.stopId === currentStopId
        ? { ...stop, stopLng: updatedStopLng }
        : stop
    );
    setNewRoute((prevRoute) => ({ ...prevRoute, stops: updatedStop }));
  };

  const handleDeleteStop = (currentStopId) => {
    const getOtherStops = newRoute?.stops.filter(
      (stop) => stop.stopId !== currentStopId
    );
    setNewRoute((prevRoute) => ({ ...prevRoute, stops: getOtherStops }));
  };

  const handleNewRoute = (e, dispatchType) => {
    if (!formRef.current?.reportValidity()) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: dispatchType, payload: newRoute });
    setNewRoute([]);
    navigate("/routes");
  };

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (source?.index === destination?.index) return;

    const { stops, ...otherRouteInfo } = newRoute;
    let currentStop = {},
      currentStopsList = stops,
      newStopsList = [],
      newRouteList = {};

    currentStop = currentStopsList[source?.index];
    currentStopsList.splice(source?.index, 1);
    newStopsList = [
      ...currentStopsList.splice(0, destination?.index),
      currentStop,
      ...currentStopsList.splice(destination?.index),
    ];
    newRouteList = { ...otherRouteInfo, stops: newStopsList };

    setNewRoute(newRouteList);
  };

  useEffect(() => {
    if (state?.updateExistingRoute) setNewRoute(state?.updateExistingRoute);
  }, []);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <main>
        <form ref={formRef}>
          <section className="add_route_details_section">
            <input
              type="text"
              name="route_name"
              id="route_name"
              className="route_name_input"
              placeholder="Enter route name"
              onChange={(e) => handleUpdateRouteName(e?.target?.value)}
              value={newRoute?.routeName || ""}
              required={"required"}
            />
            <section>
              <label htmlFor="route_direction">Choose Direction &nbsp;</label>
              <select
                name="direction"
                id="route_direction"
                onChange={(e) => handleUpdateRouteDirection(e?.target?.value)}
                value={newRoute?.routeDirection}
                required={"required"}
              >
                <option value="UP">
                  UP
                </option>
                <option value="DOWN">DOWN</option>
              </select>
            </section>
            <section>
              <label htmlFor="route_status">Choose Status &nbsp;</label>
              <select
                name="status"
                id="route_status"
                onChange={(e) => handleUpdateRouteStatus(e?.target?.value)}
                value={newRoute?.routeStatus}
                required={"required"}
              >
                <option value="ACTIVE">
                  ACTIVE
                </option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </section>
            <section>
              <button
                type="button"
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
            {newRoute?.stops?.length > 0 ? (
              <Droppable droppableId="StopsList">
                {(provided) => (
                  <section
                    ref={provided?.innerRef}
                    {...provided?.droppableProps}
                  >
                    {newRoute.stops.map((stop, index) => (
                      <Draggable
                        key={stop?.stopId}
                        draggableId={stop?.stopId}
                        index={index}
                      >
                        {(provided) => (
                          <section
                            className="single_stop_details_section"
                            ref={provided.innerRef}
                            {...provided?.draggableProps}
                            {...provided?.dragHandleProps}
                          >
                            <FaGripLines className="stop_grip_lines" />
                            <section>
                              <input
                                type="text"
                                name=""
                                id=""
                                placeholder="Enter stop name"
                                onChange={(e) =>
                                  handleUpdateStopName(
                                    stop?.stopId,
                                    e?.target?.value
                                  )
                                }
                                value={newRoute?.stops?.[index]?.stopName || ""}
                                required={"required"}
                              />
                              <input
                                type="number"
                                name=""
                                id=""
                                placeholder="Enter stop latitude"
                                onChange={(e) =>
                                  handleUpdateStopLat(
                                    stop?.stopId,
                                    e.target.value
                                  )
                                }
                                value={newRoute?.stops?.[index]?.stopLat || ""}
                                required={"required"}
                              />
                              <input
                                type="number"
                                name=""
                                id=""
                                placeholder="Enter stop longitude"
                                onChange={(e) =>
                                  handleUpdateStopLng(
                                    stop?.stopId,
                                    e?.target?.value
                                  )
                                }
                                value={newRoute?.stops?.[index]?.stopLng || ""}
                                required={"required"}
                              />
                            </section>
                            <FaTrashAlt
                              className="delete_icon"
                              onClick={() => handleDeleteStop(stop?.stopId)}
                            />
                          </section>
                        )}
                      </Draggable>
                    ))}
                    {provided?.placeholder}
                  </section>
                )}
              </Droppable>
            ) : (
              <p className="empty_route_message">Add a stop to get started!</p>
            )}
          </section>
          {newRoute?.stops?.length >= 2 && (
            <button
              type="submit"
              name="submit_route"
              id="submit_route"
              className="action_button"
              aria-label="Click to submit route"
              onClick={(e) =>
                state?.updateExistingRoute
                  ? handleNewRoute(e, "UPDATE_ROUTE")
                  : handleNewRoute(e, "ADD_ROUTE")
              }
            >
              {state?.updateExistingRoute ? "Update Route" : "Submit Route"}
            </button>
          )}
        </form>
      </main>
    </DragDropContext>
  );
};

export default AddRoute;
