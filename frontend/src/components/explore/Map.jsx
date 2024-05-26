import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Browser } from 'leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

function LocationMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const Map = ({ position }) => {
  const [url, setUrl] = useState(
    `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${VITE_API_KEY}`
  );

  useEffect(() => {
    const isRetina = Browser.retina;
    if (isRetina) {
      setUrl(
        `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${VITE_API_KEY}`
      );
    }
    // map.setView(position);
  }, [position]);
  // //find places around
  // useEffect(() => {
  //   const findPlacesAround = async () => {
  //     try {
  //       const places = await axios.get(
  //         `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${position.lng},${position.lat},5000&limit=20&apiKey=${VITE_API_KEY}`
  //       );
  //       console.log(places);
  //       return places;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   findPlacesAround();
  // }, [position]);

  return (
    <div className="w-full h-screen">
      {position && (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" rel="nofollow" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">© OpenStreetMap</a> contributors'
            url={url}
            id="osm-bright"
          />
          <LocationMarker position={position} setIsLoading={setIsLoading} />
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
