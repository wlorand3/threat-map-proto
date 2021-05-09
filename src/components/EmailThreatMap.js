// react
import React, { Fragment, useState } from "react";

// mapping libs
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DivIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

// data
import * as emailThreatData from "../data/email_threat_data.geo.json";

// styles (+ required leaflet, react-leaflet-markercluster styles)
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import "../styles/email-threat-map.css";

const ThreatMapPopup = ({ feature }) => {
  const { properties: p } = feature;

  return (
    <table>
      <thead>
        <tr>
          <th>IP Address</th>
          <th>Hostname</th>
          <th className="text-center">Volume</th>
          <th className="text-center">Email Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <a href="#">{p.ip_address}</a>
          </td>
          <td>
            <a href="#" className="cell-hostname text-long">
              {p.hostname}
            </a>
          </td>
          <td className="text-center">{p.volume}</td>
          <td
            className={`text-center cell-email-type cell-email-type__${p.email_type}`}
          >
            {p.email_type}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

function EmailThreatMap() {
  // access geojson data
  console.log(`features length: ${emailThreatData.default.features.length}`);

  // prop vars
  const worldCenter = [22.6767777, -3.9824581]; // Mali
  const initialZoom = 2;
  const liteTileUrl =
    "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png";

  const darkTileUrl =
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";

  // icons
  const malwareIcon = new DivIcon({
    className: "threat-icon__malware",
    iconSize: [10, 10],
  });

  const spamIcon = new DivIcon({
    className: "threat-icon__spam",
    iconSize: [10, 10],
  });

  // component state
  const [activeThreat, setActiveThreat] = useState(null);

  return (
    <div className="leaflet-container">
      <MapContainer
        center={worldCenter}
        zoom={initialZoom}
        minZoom={initialZoom}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <TileLayer url={darkTileUrl} />
        <MarkerClusterGroup showCoverageOnHover={true}>
          {emailThreatData.default.features.map(emailThreat => (
            <Fragment key={emailThreat.properties.id}>
              <Marker
                position={[
                  emailThreat.geometry.coordinates[1], // lat
                  emailThreat.geometry.coordinates[0], // lng
                ]}
                icon={
                  emailThreat.properties.email_type === "malware"
                    ? malwareIcon
                    : spamIcon
                }
                eventHandlers={{
                  click: () => {
                    setActiveThreat(emailThreat);
                  },
                }}
              />
            </Fragment>
          ))}
        </MarkerClusterGroup>
        {activeThreat && (
          <Popup
            position={[
              activeThreat.geometry.coordinates[1], // lng
              activeThreat.geometry.coordinates[0], // lat
            ]}
            className="threat-popup"
            onClose={() => {
              setActiveThreat(null);
            }}
          >
            <ThreatMapPopup feature={activeThreat} />
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}

export default EmailThreatMap;
