import React, { useRef, useEffect } from "react";

import { MapContainer, TileLayer } from "react-leaflet";

// needs leaflet styles
import "leaflet/dist/leaflet.css";

function FlyTo() {
  // 1- Setup a Map Instance with useRef
  const mapRef = useRef();

  // 2- now use a useEffect to grab the "current" and watch the mapRef
  useEffect(() => {
    // 2.1- destructure current and give default value of {}
    const { current = {} } = mapRef;

    // 2.2- finally, access the leaflet map instance stored as a leafletElement
    const { leafletElement: map } = current;

    // 2.3- watch the mapRef for changes
  }, [mapRef]);

  return (
    <div className="leaflet-container">
      {/* 3- set the ref on the <MapContainer /> -- got React 17 Error: no refs on functional components */}
      <MapContainer ref={mapRef} center={[39.5, -98.35]} zoom={4}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}
export default FlyTo;
