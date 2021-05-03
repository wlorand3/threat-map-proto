import React, { useEffect } from "react";
import { tileLayer } from "leaflet";
import { MapContainer, useMap } from "react-leaflet";

// needs leaflet styles
import "leaflet/dist/leaflet.css";

// const magicKingomLatLng = [28.3852, -81.5639];

// test for Themed Tile Switcher
const isDark = true;

const liteTileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const darkTileUrl =
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";

// Lesson: make a MapThemeSwitcher component that uses useMap
const MyMapAccessComponent = () => {
  const map = useMap();
  console.log("map center:", map.getCenter());

  // try to add tilelayer to map
  const openTiles = tileLayer();

  openTiles.setUrl(liteTileUrl);
  openTiles.addTo(map); // could combine these with method chaining

  // access to local isDark var
  console.log("isDark access?", isDark);

  // test switch of tile layer from inside this function
  // SCORE!!!
  setTimeout(() => {
    if (isDark) openTiles.setUrl(darkTileUrl);
  }, 3000);

  return null;
};

function FlyToTheMoon() {
  // do i have access to the map out here ??
  // NOPE console.log("map center:", map.getCenter());
  // try a use Effect

  return (
    <div className="leaflet-container">
      <MapContainer center={[50.5, 30.5]} zoom={13}>
        {/* <MapConsumer>
          {map => { 
            with access to map instance use any map layer you want!
            console.log("map center:", map.getCenter());

            access to isDark in here

            try to add tiles to the map here
            const openTiles = L.tileLayer(liteTileUrl).addTo(map);

            

            try to switch tilelayers
            setTimeout(() => {
              console.log("open tiles:", openTiles);
              openTiles.setUrl(darkTileUrl);
            }, 5000);

            setTimeout(() => {
              map.flyTo(magicKingomLatLng, 14, { duration: 3 });
            }, 1000);

            return null;
          }}
        </MapConsumer> */}
        <MyMapAccessComponent />
      </MapContainer>
    </div>
  );
}
export default FlyToTheMoon;
