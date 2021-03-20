import { getPopupCard } from './popup.js';
import { activateForms, setInputAddress } from './form.js';


const MapGeo = {
  LAT: 35.68950,
  LNG: 139.69171,
}


const createMap = () => {

  const map = L.map('map-canvas')
    .on('load', () => {
      activateForms();
    })
    .setView({
      lat: MapGeo.LAT,
      lng: MapGeo.LNG,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  return map;
};



const createIcon = (iconUrl) => {
  return L.icon({
    iconUrl,
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
};


const onMainMarkerMove = () => {
  const { lat, lng } = mainMarker.getLatLng();
  setInputAddress(lat, lng);
};


const createMarker = (lat, lng, icon, onMarkerMove) => {
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      draggable: !!onMarkerMove,
      icon,
    },
  );
  if (onMarkerMove) {
    marker.on('move', onMarkerMove);
  }
  return marker;
};


const addMarkers = (items, map) => {
  items.forEach((item) => {
    item.location.x
    item.location.y
    const offerMarker = createMarker(item.location.x, item.location.y, createIcon('./img/pin.svg'));
    offerMarker.bindPopup(getPopupCard(item), { keepInView: true });
    offerMarker.addTo(map);
  });
};

let mainMarker = createMarker(MapGeo.LAT, MapGeo.LNG, createIcon('./img/main-pin.svg'), onMainMarkerMove);

const initMap = (offerMarker) => {
  const map = createMap();
  mainMarker.addTo(map);
  addMarkers(offerMarker, map);
};


export { initMap };
