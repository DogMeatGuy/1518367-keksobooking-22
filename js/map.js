import { renderPopup } from './popup.js';
import { activateForms, getInputAddress } from './form.js';


const mapGeo = {
  LAT: 35.68950,
  LNG: 139.69171,
}

const mainLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
)

const map = L.map('map-canvas')
  .on('load', () => {
    //activateForms();
  })
  .setView({
    lat: mapGeo.LAT,
    lng: mapGeo.LNG,
  }, 10);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  { lat: mapGeo.LAT, lng: mapGeo.LNG },
  { draggable: true, icon: mainPinIcon },
);

const fillAddressInputMove = () => {
  mainMarker.on('move', getInputAddress);
};

//const addOtherMarker = (renderPopup) => {















const initMap = () => {
  mainMarker.addTo(map);
  mainLayer.addTo(map);
  fillAddressInputMove();
  addOtherMarker
};



export { initMap, mainMarker };
