import React from "react";
import { useState } from "react";
import { FaGripLines, FaPlusCircle } from "react-icons/fa";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const AddRoute = () => {
  const [stops, setStops] = useState([
    { id: "1", stopName: "A", latitude: 18.949127, longitude: 72.83477 },
    { id: "2", stopName: "B", latitude: 19.12498, longitude: 72.916664 },
    { id: "3", stopName: "C", latitude: 19.229732, longitude: 72.85623 },
  ]);

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (source.index === destination.index) return;

    let currentStop = {},
      currentStopsList = stops,
      newStopsList = [];

    currentStop = currentStopsList[source.index];
    currentStopsList.splice(source.index, 1);
    newStopsList = [
      ...currentStopsList.splice(0, destination.index),
      currentStop,
      ...currentStopsList.splice(destination.index),
    ];

    setStops(newStopsList);
  };
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
          />
          <section>
            <label htmlFor="route_direction">Choose Direction &nbsp;</label>
            <select name="direction" id="route_direction">
              <option value="up" selected>
                UP
              </option>
              <option value="down">DOWN</option>
            </select>
          </section>
          <section>
            <label htmlFor="route_status">Choose Status &nbsp;</label>
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
              className="action_button"
              aria-label="Click to enter a new stop"
            >
              <FaPlusCircle className="plus_circle_icon" />
              Add Stop
            </button>
          </section>
        </section>
        <section className="stop_details_section">
          <Droppable droppableId="StopsList">
            {(provided) => (
              <section ref={provided.innerRef} {...provided.droppableProps}>
                {stops.map((stop, index) => (
                  <Draggable key={stop.id} draggableId={stop.id} index={index}>
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
                        />
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Enter latitude"
                        />
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Enter longitude"
                        />
                      </section>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </section>
        <section>
          <button
            name="submit_route"
            id="submit_route"
            className="action_button"
            aria-label="Click to submit route"
          >
            Submit Route
          </button>
        </section>
      </main>
    </DragDropContext>
  );
};

export default AddRoute;
