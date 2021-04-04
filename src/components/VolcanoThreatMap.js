// react
import React, { useState } from 'react';

// mapping libs
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';

// data
import * as volcanoData from '../data/global_volcanoes.geo.json';

// styles
import 'leaflet/dist/leaflet.css'; // required leaflet styles
import 'react-leaflet-markercluster/dist/styles.min.css'; // required react-leaflet-markercluster styles
import '../styles/volcano-threat-map.css'; 

function VolcanoThreatMap() {

    // access coord data
    console.log(`feature count: ${volcanoData.default.features.length}`)

    // prop vars
    const worldCenter = [22.6767777, -3.9824581]; // Mali
    const initialZoom = 2; 
    const darkTileUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
    const darkTileAttr = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    const volcanoIcon = new Icon({
        iconUrl: "/assets/images/red-triangle.png",
        iconSize: [8, 8],
    })

    // local component state
    const [activeVolcano, setActiveVolcano] = useState(null); 

    return (
        <div className="leaflet-container">
            <MapContainer center={worldCenter} zoom={initialZoom} minZoom={initialZoom} scrollWheelZoom={false}>
                <TileLayer url={darkTileUrl} attribution={darkTileAttr} />
                    <MarkerClusterGroup>
                        {volcanoData.default.features.map( volcano => 
                            <Marker 
                                key={volcano.properties.Volcano_Number} 
                                position={[
                                    volcano.geometry.coordinates[1], // lng
                                    volcano.geometry.coordinates[0] // lat
                                ]}
                                icon={volcanoIcon}
                                eventHandlers={{
                                    click: () => {
                                        setActiveVolcano(volcano);
                                    },
                                }}
                            />
                        )}
                    </MarkerClusterGroup>
                    {activeVolcano && (
                        <Popup
                            position={[
                                activeVolcano.geometry.coordinates[1], // lng
                                activeVolcano.geometry.coordinates[0], // lat
                            ]}
                            onClose={() => {
                                setActiveVolcano(null);
                            }}
                        >
                            <div>
                                <h4 className="marker-popup">
                                    {activeVolcano.properties.Volcano_Name}
                                </h4>
                            </div>
                        </Popup>
                    )}
            </MapContainer>
        </div>
    )
}

export default VolcanoThreatMap;
