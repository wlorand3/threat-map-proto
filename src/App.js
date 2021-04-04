// react
import React from 'react';

// components
// import VolcanoThreatMap from './components/VolcanoThreatMap';
import EarthquakeThreatMap from './components/EarthquakeThreatMap';

// styles
import './styles/global-styles.css';

function App() {
  return (
    <>
      <header className="map-header">
         <h1>Earthquake Threat Map</h1>
      </header>
      {/* <VolcanoThreatMap /> */}
      <EarthquakeThreatMap />
    </>
  );
}

export default App;
