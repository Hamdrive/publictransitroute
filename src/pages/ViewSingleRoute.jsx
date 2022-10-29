import React from "react";

const ViewSingleRoute = () => {
  return (
    <>
      <main>
        <section></section>
        <section>
          <p>Route Name: 123</p>
          <p>Direction: UP</p>
          <p>Status: ACTIVE</p>
          <p></p>
          <p></p>
        </section>
        <section>
          <table>
            <thead>
              <tr>
                <td>Stop Name</td>
                <td>Latitude</td>
                <td>Longitude</td>
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
