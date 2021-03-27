// react
import React from 'react';

// components
import VolcanoThreatMap from './components/VolcanoThreatMap';

// styles
import './styles/global-styles.css';

function App() {
  return (
    <>
      <header className="map-header">
         <h1>Volcano Threat Map</h1>
      </header>
      <VolcanoThreatMap />
    </>
  );
}

export default App;
