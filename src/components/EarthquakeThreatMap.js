// react
import React, { useState } from 'react';

// mapping libs
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { DivIcon } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';

// data
import * as earthquakeData from '../data/global_earthquakes_last45days_20210403.geo.json';

// styles
import 'leaflet/dist/leaflet.css'; // required leaflet styles
import 'react-leaflet-markercluster/dist/styles.min.css'; // required react-leaflet-markercluster styles
import '../styles/earthquake-threat-map.css'; 

function EarthquakeThreatMap() {

    // access coord data
    console.log(`feature count: ${earthquakeData.default.features.length}`)

    // prop vars
    const worldCenter = [22.6767777, -3.9824581]; // Mali
    const initialZoom = 2; 
    const darkTileUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
    const darkTileAttr = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    const earthquakeIcon = new DivIcon({
        className: 'earthquake-div-icon',
        iconSize: [3, 3],
    })

    // local component state
    const [activeEarthquake, setActiveEarthquake] = useState(null); 

    // custom cluster icon (note: api does not support js arrow fxns here)
    const createCustomClusterIcon = function (cluster) {
 		 return new DivIcon({
    		html: `<span>${cluster.getChildCount()}</span>`,
    		className: 'custom-cluster-marker',
    		iconSize: [40, 40],
  			});
		}


    return (
        <div className="leaflet-container">
            <MapContainer center={worldCenter} zoom={initialZoom} minZoom={initialZoom} scrollWheelZoom={false}>
                <TileLayer url={darkTileUrl} attribution={darkTileAttr} />
                    <MarkerClusterGroup
                       showCoverageOnHover={true}
                    //    iconCreateFunction={createCustomClusterIcon} 
                    >
                        {earthquakeData.default.features.map( earthquake => 
                            <Marker 
                                key={earthquake.geometry.id} 
                                position={[
                                    earthquake.geometry.coordinates[1], // lng
                                    earthquake.geometry.coordinates[0] // lat
                                ]}
                                icon={earthquakeIcon}
                                eventHandlers={{
                                    click: () => {
                                        setActiveEarthquake(earthquake);
                                    },
                                }}
                            />
                        )}
                    </MarkerClusterGroup>
                    {activeEarthquake && (
                        <Popup
                            position={[
                                activeEarthquake.geometry.coordinates[1], // lng
                                activeEarthquake.geometry.coordinates[0], // lat
                            ]}
                            onClose={() => {
                                setActiveEarthquake(null);
                            }}
                        >
                            <div>
                                <h4 className="marker-popup">
                                    {activeEarthquake.properties.title}
                                </h4>
                            </div>
                        </Popup>
                    )}
            </MapContainer>
        </div>
    )
}

export default EarthquakeThreatMap;
