import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  useMap,
  useMapEvent,
} from 'react-leaflet';
import { Browser } from 'leaflet';
import { useEffect, useState, useContext } from 'react';
import 'leaflet/dist/leaflet.css';
import { ExploreContext } from '../../utilis/ExploreContext';
import data from './places.js';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';

const VITE_API_KEY = import.meta.env.VITE_API_KEY;

//getBoundaries - corners
const getBounds = (map, setBounds) => {
  const bounds = map.getBounds();
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  setBounds({
    bl_latitude: sw.lat,
    tr_latitude: ne.lat,
    bl_longitude: sw.lng,
    tr_longitude: ne.lng,
  });
};
// change zoom into a new postion and set a marker there
const LocationMarker = ({ position, setBounds }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([position.lat, position.lng], map.getZoom());
    getBounds(map, setBounds);
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position}>
      <Tooltip>You are here</Tooltip>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const PlaceMarker = ({ places }) => {
  {
    console.log(places);
  }
  const handleTooltipClick = (e, place) => {
    e.target.className.add('active');
  };

  return places === null
    ? null
    : places
        .filter(
          (place) => place.latitude !== null && place.latitude !== undefined
        )
        .map((place) => (
          <Marker
            key={crypto.randomUUID()}
            position={{
              lat: Number(place?.latitude),
              lng: Number(place?.longitude),
            }}
            className="z-0"
          >
            <Tooltip
              direction="top"
              className="z-0 hover:z-10"
              permanent
              eventHandlers={{
                mouseover: (e) => handleTooltipClick(e, place),
              }}
            >
              <img
                src={place.photo.images?.original.url}
                alt={place.name}
                style={{
                  width: '90px',
                  height: '60px',
                  objectFit: 'cover',
                }}
              />
              <p className="">{place.name}</p>
            </Tooltip>
          </Marker>
        ));
};

const Map = () => {
  const exploreContext = useContext(ExploreContext);
  const { position, setBounds, places, bounds } = exploreContext;
  const [url, setUrl] = useState(
    `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${VITE_API_KEY}`
  );

  // use better resolution map if browser is retina
  useEffect(() => {
    const isRetina = Browser.retina;
    if (isRetina) {
      setUrl(
        `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${VITE_API_KEY}`
      );
    }
  }, [position]);
  {
    console.log(bounds);
  }
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
          <LocationMarker position={position} setBounds={setBounds} />
          {bounds && <PlaceMarker places={places} />}
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
