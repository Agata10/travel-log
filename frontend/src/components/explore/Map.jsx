import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMap, useMapEvents } from 'react-leaflet/hooks';
import { Browser } from 'leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { RotatingLines } from 'react-loader-spinner';

const VITE_API_KEY = import.meta.env.VITE_API_KEY;

const Map = () => {
  const [position, setPosition] = useState([51.505, -0.09]); //lat, lng
  const [url, setUrl] = useState(
    `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${VITE_API_KEY}`
  );
  const [isLoading, setIsLoading] = useState(true);

  //get user location
  useEffect(() => {
    const timeout = setTimeout(() => {
      const isRetina = Browser.retina;
      if (isRetina) {
        setUrl(
          `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${VITE_API_KEY}`
        );
      }
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
    }, 1000);

    () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full h-screen">
      {isLoading ? (
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={url}
            id="osm-bright"
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
