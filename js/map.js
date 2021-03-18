import { renderPopup } from './popup.js';
import { activateForms, getInputAddress } from './form.js';

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

};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const createIcon = (iconUrl) => {
  return L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
};

let mainMarker = L.marker(
  { lat: MapGeo.LAT, lng: MapGeo.LNG },
  { draggable: true, mainPinIcon},
);

const onMainMarkerMove = () => {
  const { lat, lng } = mainMarker.getLatLng();
  getInputAddress(lat, lng);
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
    mainMarker.on('move', onMarkerMove);
  }
  return marker;
};





const initMap = () => {
  const map = createMap();
  mainMarker = createMarker(MapGeo.LAT, MapGeo.LNG, createIcon('./img/main-pin.svg'), onMainMarkerMove);
  mainMarker.addTo(map);
}



export { initMap, mainMarker };
