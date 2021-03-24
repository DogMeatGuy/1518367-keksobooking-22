import { sendData } from './api.js';
import { housingMinPrice, MapGeo } from './consts.js';
import { successModal, errorModal } from './modal.js';
import { MAX_VALUE_DOT } from './util.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const inputAddress = document.querySelector('#address');
const formElements = document.querySelectorAll('.map__filter, .map__features, .ad-form-header, .ad-form__element');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const price = adForm.querySelector('#price');
const description = document.querySelector('#description');
const housingType = adForm.querySelector('#type');
const headline = adForm.querySelector('#title');
const numberRooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const typeDefault = document.querySelector('#type').value;
const timeInDefault = document.querySelector('#timein').value;
const timeOutDefault = document.querySelector('#timeout').value;
const capacityDefault = document.querySelector('#capacity').value;
const featureCheckbox = document.querySelectorAll('.feature__checkbox');
const descriptionDefault = document.querySelector('#description').value;
const btnReset = document.querySelector('.ad-form__reset');

const MIN_HEADLINE_LENGTH = 30;
const MAX_HEADLINE_LENGTH = 100;
const DEFAULT_VALUE_PRICE = 1000;
const PRICE_MAX = 1000000;
const QUANTITY_MIN = 0;
const QUANTITY_MAX = 100;
const ONE_ROOM_VALUE = 1;
const TWO_ROOM_VALUE = 2;



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

const setInputAddress = (lat, lng) => {
  inputAddress.value = `${lat.toFixed(MAX_VALUE_DOT)} ${lng.toFixed(MAX_VALUE_DOT)}`;
}

const setDefaultInputAdress = () => {
  setInputAddress(MapGeo.LAT, MapGeo.LNG);
}

const formValidity = () => {
  price.addEventListener('input', () => {
    if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле. Максимальная цена — ' + (PRICE_MAX));
    } else {
      price.setCustomValidity('');
    }
  });

  housingType.addEventListener('change', () => {
    price.placeholder = housingMinPrice[housingType.value];
    price.min = housingMinPrice[housingType.value];
  });

  timeIn.addEventListener('change', (evt) => {
    timeIn.value = evt.target.value;
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', (evt) => {
    timeOut.value = evt.target.value;
    timeIn.value = evt.target.value;
  });

  capacity.addEventListener('change', () => {
    const roomNumberValue = Number(numberRooms.value);
    const capacityValue = Number(capacity.value);
    let message = '';
    if (roomNumberValue < capacityValue && roomNumberValue == ONE_ROOM_VALUE) {
      message = 'Слишком много гостей для ' + (roomNumberValue) + ' комнаты. Количество комнат может соответствовать количеству гостей но не может быть меньше количества гостей.'
    } else if (roomNumberValue < capacityValue && roomNumberValue == TWO_ROOM_VALUE) {
      message = 'Слишком много гостей для ' + (roomNumberValue) + ' комнат. Количество комнат может соответствовать количеству гостей но не может быть меньше количества гостей.'
    } else if (roomNumberValue == QUANTITY_MAX && capacityValue != QUANTITY_MIN) {
      message = 'Невозможно выбрать этот вариант, так как слишком большое количество комнат. Выберите пожалуйста вариант "Не для гостей"'
    } else if (capacityValue == QUANTITY_MIN && roomNumberValue != QUANTITY_MAX) {
      message = 'Невозможно выбрать этот вариант, так как нельзя использовать вариант "Не для гостей" для выбранного количества комнат. Выберите вариант "100 комнат"'
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


const onFormSuccess = () => {
  headline.value = '';
  setDefaultInputAdress();
  housingType.value = typeDefault;
  setDefaultInputPrice();
  timeIn.value = timeInDefault;
  timeOut.value = timeOutDefault;
  capacity.value = capacityDefault;
  numberRooms.value = capacityDefault;
  featureCheckbox.forEach(element => {
    element.checked = false;
  });
  description.value = descriptionDefault;
  successModal();
};
const resetForm = () => {
  btnReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    headline.value = '';
    setDefaultInputAdress();
    housingType.value = typeDefault;
    setDefaultInputPrice();
    timeIn.value = timeInDefault;
    timeOut.value = timeOutDefault;
    capacity.value = capacityDefault;
    numberRooms.value = capacityDefault;
    featureCheckbox.forEach(element => {
      element.checked = false;
    });
    description.value = descriptionDefault;
  })
}

const onError = () => {
  errorModal();
};

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      onSuccess,
      onError,
      new FormData(evt.target),
    );
  });
};

const initForm = () => {
  resetForm();
  setDefaultInputPrice();
  formValidity();
  roomNumberLoadHandler();
  setUserFormSubmit(onFormSuccess);
}

deactivateForms();

export { initForm, activateForms, setInputAddress };
