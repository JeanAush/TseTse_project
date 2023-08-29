import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const MapComponent = () => {
  useEffect(() => {
    // Create a map instance and set the view to your desired coordinates and zoom level
    const map = L.map('map').setView([0, 25], 3);

    // Add a tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Clean up by removing the map when the component unmounts
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
