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
import { ExploreContext } from '../../utilis/context/ExploreContext';
import icon from '../../assets/images/loc.png';
import L from 'leaflet';
import { Rating } from '@mui/material';

const VITE_API_KEY = import.meta.env.VITE_API_KEY;

//When new postion set, get boundaries - corners for autocomplete API
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

// When new position selected, change zoom into a new postion and set a marker there
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
const PlaceMarker = ({ place }) => {
  const customIcon = L.icon({
    iconUrl: icon,
    iconSize: [38, 38], // size of the icon
    iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -38], // point from which the popup should open relative to the iconAnchor
  });

  return place === null
    ? null
    : place
        .filter(
          (place) => place.latitude !== null && place.latitude !== undefined
        )
        .map((place) => (
          <div key={place.location_id}>
            <Marker
              position={{
                lat: Number(place?.latitude),
                lng: Number(place?.longitude),
              }}
              icon={customIcon}
            >
              {/* if I want it permamently on map change it */}
              <Tooltip
              // offset={[0, -30]}
              // direction="top"
              // permanent={true}
              // sticky={true}
              >
                <img
                  src={place.photo?.images?.original.url}
                  alt={place.name}
                  style={{
                    width: '110px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
                <p className="text-center font-medium">{place.name}</p>
                <Rating
                  name="read-only"
                  defaultValue={2}
                  value={Number(place.rating)}
                  readOnly
                  precision={0.1}
                  size="small"
                  sx={{ margin: '0 auto' }}
                />
              </Tooltip>
            </Marker>
          </div>
        ));
};

const Map = () => {
  const exploreContext = useContext(ExploreContext);
  const { position, setBounds, searchPlaces, bounds } = exploreContext;
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
          {bounds && <PlaceMarker place={searchPlaces} />}
        </MapContainer>
      )}
    </>
  );
};

export default Map;
