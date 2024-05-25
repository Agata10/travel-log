import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMap, useMapEvents } from 'react-leaflet/hooks';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [position, setPosition] = useState([51.505, -0.09]); //lat, lng
  const [isLoading, setIsLoading] = useState(true);

  //get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
        console.log('Error, no position avaiable');
      }
    );
  }, []);
  {
    console.log(position);
  }

  if (isLoading) {
    return <p>Loading...</p>; // Render a loading indicator
  }

  return (
    <div className="w-full h-screen">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
