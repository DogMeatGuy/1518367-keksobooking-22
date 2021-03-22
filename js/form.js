import { housingMinPrice, MapGeo } from './consts.js';
import { MAX_VALUE_DOT } from './util.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const inputAddress = document.querySelector('#address');
const formElements = document.querySelectorAll('.map__filter, .map__features, .ad-form-header, .ad-form__element');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const price = adForm.querySelector('#price');
const housingType = adForm.querySelector('#type');
const headline = adForm.querySelector('#title');
const numberRooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

const MIN_HEADLINE_LENGTH = 30;
const MAX_HEADLINE_LENGTH = 100;
const DEFAULT_VALUE_PRICE = 1000;
const PRICE_MAX = 1000000;
const QUANTITY_MIN = 0;
const QUANTITY_MAX = 100;


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

const activateForms = () => {
  filterForm.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');
  setDefaultInputAdress();
  activateFormElements(formElements);
};

let setDefaultInputPrice = () => {
  price.min = DEFAULT_VALUE_PRICE;
};

const roomNumberLoadHandler = () => {
  capacity.value = numberRooms.value;
};

const typeChangeHandler = () => {
  price.placeholder = housingMinPrice[housingType.value];
  price.min = housingMinPrice[housingType.value];
};

const timeChangeHandler = (evt) => {
  timeOut.value = evt.target.value;
  timeIn.value = evt.target.value;
};


const setInputAddress = (lat, lng) => {
  inputAddress.value = `${lat.toFixed(MAX_VALUE_DOT)} ${lng.toFixed(MAX_VALUE_DOT)}`;
}

const setDefaultInputAdress = () => {
  setInputAddress(MapGeo.LAT, MapGeo.LNG);
}

const formValidity = () => {
  price.addEventListener('input', () => {
    if (price.validity.valueMissing) {
      price.setCustomValidity(`Обязательное поле. Максимальная цена — ${PRICE_MAX}`);
    } else {
      price.setCustomValidity('');
    }
  });

  capacity.addEventListener('input', () => {
    const roomNumberValue = Number(numberRooms.value);
    const capacityValue = Number(capacity.value);
    let message = '';
    if (roomNumberValue < QUANTITY_MAX && capacityValue < 1 || capacityValue > roomNumberValue) {
      message = `Укажите количество гостей. Минимальное количество - 1. Максимальное количество гостей - ${numberRooms.value}`
    } else if (roomNumberValue >= QUANTITY_MAX && capacityValue > QUANTITY_MIN) {
      message = 'Слишком много комнат. Выберите пункт "не для гостей"'
    }
    capacity.setCustomValidity(message);
    capacity.reportValidity();
  });

  headline.addEventListener('input', () => {
    const valueLength = headline.value.length;
    let message = '';
    if (valueLength < MIN_HEADLINE_LENGTH) {
      message = 'Минимальная длина 30 симв. Необходимо еще ' + (MIN_HEADLINE_LENGTH - valueLength) + ' симв.'
    } else if (valueLength > MAX_HEADLINE_LENGTH) {
      message = 'Максимальная длина 100 симв. Удалите лишние ' + (valueLength - MAX_HEADLINE_LENGTH) + ' симв.'
    }
    headline.setCustomValidity(message);
    headline.reportValidity();
  });

  inputAddress.addEventListener('invalid', () => {
    if (inputAddress.validity.valueMissing) {
      inputAddress.setCustomValidity('Обязательное поле');
    } else {
      inputAddress.setCustomValidity('');
    }
    inputAddress.reportValidity();
  });
};

const init = () => {
  setDefaultInputPrice();
  housingType.addEventListener('change', typeChangeHandler);
  timeIn.addEventListener('change', timeChangeHandler);
  timeOut.addEventListener('change', timeChangeHandler);
  formValidity();
  roomNumberLoadHandler();
}

deactivateForms();

export { init, activateForms, setInputAddress };
