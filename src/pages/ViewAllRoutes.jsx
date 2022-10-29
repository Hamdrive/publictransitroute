import React from "react";
import { Link } from "react-router-dom";

const ViewAllRoutes = () => {
  return (
    <>
      <main>
        <section>
          <input
            type="search"
            name="search_route"
            id="search_route"
            placeholder="Enter Route Number..."
            aria-label="Search a specific route"
          />
          <button>Search</button>
        </section>
        <section>
          <table>
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
              <tr>
                <Link to="/routes/123">
                  <td>123</td>
                  <td>Home</td>
                  <td>UP</td>
                  <td>ACTIVE</td>
                  <td>✏</td>
                  <td>🗑</td>
                </Link>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export default ViewAllRoutes;
