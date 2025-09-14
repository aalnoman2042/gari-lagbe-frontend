// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// import 'leaflet/dist/leaflet.css';

// const MapComponent = () => {
//     const [location, setLocation] = useState<{ lat: number | null, lng: number | null }>({ lat: null, lng: null });

//     // Get the current location of the device
//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setLocation({ lat: latitude, lng: longitude });
//                 },
//                 (error) => {
//                     console.error("Error getting location:", error);
//                 }
//             );
//         } else {
//             console.error("Geolocation is not supported by this browser.");
//         }
//     }, []);

//     return (
//         <div style={{ height: '400px', width: '100%' }}>
//             {location.lat && location.lng ? (
//                 <MapContainer center={[location.lat, location.lng]} zoom={20} style={{ height: '90%', width: '90%' }}>
//                     <TileLayer
//                        url="https://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png"
 
//                     />
//                     <Marker position={[location.lat, location.lng]}>
//                         <Popup>
//                             You are here!
//                         </Popup>
//                     </Marker>
//                 </MapContainer>
//             ) : (
//                 <p>Loading current location...</p>
//             )}
//         </div>
//     );
// };

// export default MapComponent;














import React from 'react';
import GoogleMapReact from 'google-map-react';
import config from '@/config/config';

// Define the MarkerProps interface
interface MarkerProps {
  lat: number;   // Latitude of the marker
  lng: number;   // Longitude of the marker
  text: string;  // Text to display inside the marker
}

// Marker component that takes lat, lng, and text as props
const Marker: React.FC<MarkerProps> = ({ text }) => (
  <div style={{ color: 'red', fontWeight: 'bold' }}>
    {text}
  </div>
);

// Props for the MapComponent
interface MapComponentProps {
  lat: number | null; // Latitude of the location
  lng: number | null; // Longitude of the location
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng }) => {

      if (lat === null || lng === null) {
    return <p className='text-xl text-[#175C4F]'>Loading location Map...</p>;
  }
  return (
    <div style={{ height: '400px', width: '100%' }}>
      {/* Only render map if lat and lng are available */}
      {lat && lng ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: config.googleMapApi }} // Your Google Maps API key
          defaultCenter={{ lat, lng }} // Center map to provided lat and lng
          defaultZoom={15} // Set the zoom level
        >
          {/* Display a custom marker at the provided lat and lng */}
          <Marker lat={lat} lng={lng} text="You are here!" />
        </GoogleMapReact>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default MapComponent;

