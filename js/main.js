import { renderPopup } from './popup.js';
import { getArrayRandomData, MAX_ARRAY_VALUE } from './data.js';
import { init, activateForms } from './form.js';

//Функция возвращающая массив из полученых рандомных данных

const createArrayDeclarations = (arrayCount) => {
  return new Array(arrayCount).fill(null).map(() => getArrayRandomData());
};

const declarations = createArrayDeclarations(MAX_ARRAY_VALUE);


//renderPopup(declarations[0]);
init();

const LAT = 35.6894;
const LNG = 139.6917;
const map = L.map('map-canvas')
  .on('load', () => {
    activateForms();
  })
  .setView({
    lat: LAT,
    lng: LNG,
  }, 10);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

const getInputAddress = () => {

  const inputAddress = document.querySelector('#address');
  const { lat, lng } = mainMarker.getLatLng();
  inputAddress.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
}

const fillAddressInputMove = () => {
  mainMarker.on('move', getInputAddress);
}

getInputAddress();
fillAddressInputMove();

declarations.forEach((offer) => {
  // eslint-disable-next-line no-undef
  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  // eslint-disable-next-line no-undef
  const marker = L.marker(
    {
      lat: offer.address.x,
      lng: offer.address.y,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(renderPopup(offer));
});





