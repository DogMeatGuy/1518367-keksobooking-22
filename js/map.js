import { getPopupCard } from './popup.js';
import { activateForms, setInputAddress } from './form.js';
import { IconAnchor, IconSize, MapGeo } from './consts.js'
import { filterDeclarations } from './filter.js';


const DEFAULT_SCALE = 10;

let map;

let mainMarker;

let markerLayer;

let markers = [];

const createMap = () => {
  const map = window.L.map('map-canvas')
    .on('load', () => {
      activateForms();
    })
    .setView({
      lat: MapGeo.LAT,
      lng: MapGeo.LNG,
    }, DEFAULT_SCALE);

  window.L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  return map;
};

const createIcon = (iconUrl) => {
  return window.L.icon({
    iconUrl,
    iconSize: [IconSize.WIDTH, IconSize.HEIGHT],
    iconAnchor: [IconAnchor.WIDTH, IconAnchor.HEIGHT],
  });
};

const onMainMarkerMove = () => {
  const { lat, lng } = mainMarker.getLatLng();
  setInputAddress(lat, lng);
};


const createMarker = (lat, lng, icon, onMarkerMove) => {
  const marker = window.L.marker(
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


const resetMap = () => {
  map.setView({
    lat: MapGeo.LAT,
    lng: MapGeo.LNG,
  }, DEFAULT_SCALE);
  mainMarker.setLatLng([MapGeo.LAT, MapGeo.LNG]);
  updateMarkers();
};

const addMarkers = (data, container) => {
  data.forEach(({ author, offer, location }) => {
    const marker = createMarker(location.lat, location.lng, createIcon('./img/pin.svg'));
    marker
      .addTo(container)
      .bindPopup(
        getPopupCard({ author, offer, location }),
        {
          keepInView: true,
        },
      );
  });
};

const updateMarkers = () => {
  markerLayer.clearLayers();
  const filteredData = filterDeclarations(markers);
  addMarkers(filteredData, markerLayer);
};

const initMap = (data) => {
  markers = data;
  map = createMap();
  mainMarker = createMarker(MapGeo.LAT, MapGeo.LNG, createIcon('./img/main-pin.svg'), onMainMarkerMove);
  mainMarker.addTo(map);
  markerLayer = window.L.layerGroup().addTo(map);
  updateMarkers();
};


export { initMap, resetMap, updateMarkers };
