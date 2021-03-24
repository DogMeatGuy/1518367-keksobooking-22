import { getPopupCard } from './popup.js';
import { activateForms, setInputAddress } from './form.js';
import { MapGeo } from './consts.js'
import { getData } from './api.js';


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




let mainMarker;

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

const resetMainMarker = () => {
  mainMarker.setLatLng([MapGeo.LAT, MapGeo.LNG]);
};

const addMarkers = (data) => {
  data.forEach(({ author, offer, location }) => {
    const marker = createMarker(location.lat, location.lng, createIcon('./img/pin.svg'));
    marker
      .addTo(map)
      .bindPopup(
        getPopupCard({ author, offer, location }),
        {
          keepInView: true,
        },
      );
  });
};


const sendSuccess = () => {
  getData((data) => {
    addMarkers(data);
  })
}


const initMap = () => {
  const map = createMap();
  mainMarker = createMarker(MapGeo.LAT, MapGeo.LNG, createIcon('./img/main-pin.svg'), onMainMarkerMove);
  mainMarker.addTo(map);
  getData(sendSuccess);
};


export { initMap, resetMainMarker };
