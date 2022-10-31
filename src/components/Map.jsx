import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useState } from "react";

const Map = ({ allStops }) => {
  const [allLatLngs, setAllLatLngs] = useState([]);
  const map = useMap();

  useEffect(() => {
    if (allStops) {
      const getAllLatLngs = allStops.map(({ stopLat, stopLng }) =>
        L.latLng(Number(stopLat), Number(stopLng))
      );
      setAllLatLngs(getAllLatLngs);
    }
  }, [allStops]);

    L.Routing.control({
      waypoints: allLatLngs,
      lineOptions: {
        styles: [
          {
            color: "darkgreen",
            weight: 5,
            opacity: 1,
          },
        ],
      },
      show: false,
      fitSelectedRoutes: true,
    }).addTo(map);

  return null;
};

export default Map;
