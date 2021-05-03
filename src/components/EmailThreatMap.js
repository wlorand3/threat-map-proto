// react
import React, { useState } from "react";

// mapping libs
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { DivIcon } from "leaflet";
// import MarkerClusterGroup from "react-leaflet-markercluster";

// data
// import * as earthquakeData from "../data/global_earthquakes_last45days_20210403.geo.json";

// styles
import "leaflet/dist/leaflet.css"; // required leaflet styles
// import "react-leaflet-markercluster/dist/styles.min.css"; // required react-leaflet-markercluster styles
import "../styles/email-threat-map.css";

function EmailThreatMap() {
  // access coord data
  // console.log(`feature count: ${earthquakeData.default.features.length}`);

  // prop vars
  const worldCenter = [22.6767777, -3.9824581]; // Mali
  const initialZoom = 2;
  const liteTileUrl =
    "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png";

  const darkTileUrl =
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";

  const stadiaTileAttr =
    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

  // const earthquakeIcon = new DivIcon({
  //     className: "earthquake-div-icon",
  //     iconSize: [6, 6],
  //   });

  // local component state
  const [activeEmailThreat, setActiveEmailThreat] = useState(null);

  return (
    <div className="leaflet-container">
      <MapContainer
        center={worldCenter}
        zoom={initialZoom}
        minZoom={initialZoom}
        scrollWheelZoom={false}
      >
        <TileLayer url={darkTileUrl} attribution={stadiaTileAttr} />
      </MapContainer>
    </div>
  );
}

export default EmailThreatMap;
