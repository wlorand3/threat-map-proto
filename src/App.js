// react
import React from "react";

// components
// import VolcanoThreatMap from './components/VolcanoThreatMap';
// import EarthquakeThreatMap from "./components/EarthquakeThreatMap";
import EmailThreatMap from "./components/EmailThreatMap";

// styles
import "./styles/global-styles.css";

function App() {
  return (
    <>
      <header className="map-header">
        <h1>Email Spam &amp; Malware Threat Map</h1>
      </header>
      {/* <VolcanoThreatMap /> */}
      {/* <EarthquakeThreatMap /> */}
      <EmailThreatMap />
    </>
  );
}

export default App;
