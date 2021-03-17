import { housingPriceResource } from './consts.js';
import { mainMarker } from './map.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const inputAddress = document.querySelector('#address');
const formElements = document.querySelectorAll('.map__filter, .map__features, .ad-form-header, .ad-form__element');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const price = adForm.querySelector('#price');
const housingType = adForm.querySelector('#type');
const { lat, lng } = mainMarker.getLatLng();


const deactivateFormElements = (elements) => {
  elements.forEach((element) => element.disabled = true);
};

const activateFormElements = (elements) => {
  elements.forEach((element) => element.disabled = false);
};

const deactivateForms = () => {
  filterForm.classList.add('map__filters--disabled');
  adForm.classList.add('ad-form--disabled');
  deactivateFormElements(formElements);
};

const typeChangeHandler = () => {
  price.placeholder = housingPriceResource[housingType.value];
  price.min = housingPriceResource[housingType.value];
};

const timeChangeHandler = (evt) => {
  timeOut.value = evt.target.value;
  timeIn.value = evt.target.value;
};

const getInputAddress = () => {
  inputAddress.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
}

const init = () => {
  housingType.addEventListener('change', typeChangeHandler);
  timeIn.addEventListener('change', timeChangeHandler);
  timeOut.addEventListener('change', timeChangeHandler);
}

//deactivateForms();

const activateForms = () => {
  filterForm.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');
  activateFormElements(formElements);
};

export { init, activateForms, getInputAddress };
