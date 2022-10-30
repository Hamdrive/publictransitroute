import React from "react";
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const ViewAllRoutes = () => {
    const navigate = useNavigate()
    const handleRedirectRoute = (route) => {
        navigate(route)
    }
  return (
    <>
      <main>
        <section className="search_section">
          <input
            type="search"
            name="search_route"
            id="search_route"
            className="search_bar"
            placeholder="Enter Route Number..."
            aria-label="Search a specific route"
          />
          <button className="action_button">Search</button>
        </section>
        <section className="routes_section">
          <table className="routes_table">
            <thead>
              <tr>
                <th>Route ID</th>
                <th>Route Name</th>
                <th>Direction</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => handleRedirectRoute("/routes/123")}>
                <td>123</td>
                <td>Home</td>
                <td>UP</td>
                <td>ACTIVE</td>
                <td>
                  <FaPen className="edit_icon" />
                </td>
                <td>
                  <FaTrashAlt className="delete_icon" />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export default ViewAllRoutes;
