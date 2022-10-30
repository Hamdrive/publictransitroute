import React from "react";

const ViewSingleRoute = () => {
  return (
    <>
      <main>
        <section>
            {/* Insert TomTom Map here */}
        </section>
        <section className="route_details">
          <p>
            <u>
              <strong>Route Name:</strong>
            </u>&nbsp;
            123
          </p>
          <p>
            <u>
              <strong>Direction:</strong>
            </u>&nbsp;
            UP
          </p>
          <p>
            <u>
              <strong>Status:</strong>
            </u>&nbsp;
            ACTIVE
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
              <tr>
                <td>A</td>
                <td>18.949127</td>
                <td>72.834770</td>
              </tr>
              <tr>
                <td>B</td>
                <td>19.124980</td>
                <td>72.916664</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export default ViewSingleRoute;
