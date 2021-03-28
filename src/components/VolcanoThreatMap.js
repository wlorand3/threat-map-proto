// react
import React from 'react';

// mapping libs
import { MapContainer, TileLayer } from 'react-leaflet';

// data
import * as volcanoData from '../data/globalVolcanoesGeojson.json';

// styles
import 'leaflet/dist/leaflet.css'; // required lib styles
import 'react-leaflet-markercluster/dist/styles.min.css'; // required lib styles
import '../styles/volcano-threat-map.css'; 

function VolcanoThreatMap() {

    // test access of coord data
    console.log(volcanoData.default.features[187].geometry.coordinates); 
    console.log(`feature count: ${volcanoData.default.features.length}`)

    // prop vars
    const pacificCenter = [21.315603, -157.858093]; // honolulu
    const initialZoom = 2; 
    const darkTileUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
    const darkTileAttr = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

    return (
        <div className="leaflet-container">
            <MapContainer center={pacificCenter} zoom={initialZoom} scrollWheelZoom={false}>
                <TileLayer url={darkTileUrl} attribution={darkTileAttr} />
            </MapContainer>
        </div>
    )
}

export default VolcanoThreatMap;
