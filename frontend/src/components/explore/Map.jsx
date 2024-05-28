import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  useMap,
} from 'react-leaflet';
import { Browser } from 'leaflet';
import { useEffect, useState, useContext } from 'react';
import 'leaflet/dist/leaflet.css';
import { ExploreContext } from '../../utilis/ExploreContext';
import icon from '../../assets/loc.png';
import L from 'leaflet';

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

//marker for places
const PlaceMarker = ({ places }) => {
  const customIcon = L.icon({
    iconUrl: icon,
    iconSize: [38, 38], // size of the icon
    iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -38], // point from which the popup should open relative to the iconAnchor
  });

  return places === null
    ? null
    : places
        .filter(
          (place) => place.latitude !== null && place.latitude !== undefined
        )
        .map((place) => (
          <div key={crypto.randomUUID()}>
            <Marker
              position={{
                lat: Number(place?.latitude),
                lng: Number(place?.longitude),
              }}
              icon={customIcon}
            >
              <Tooltip
                offset={[0, -30]}
                direction="top"
                permanent={true}
                sticky={true}
              >
                <img
                  src={place.photo.images?.original.url}
                  alt={place.name}
                  style={{
                    width: '110px',
                    objectFit: 'cover',
                  }}
                />
                <p>{place.name}</p>
              </Tooltip>
            </Marker>
          </div>
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
  return (
    <>
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
    </>
  );
};

export default Map;
